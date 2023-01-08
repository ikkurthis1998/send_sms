import { createContext, useEffect, useState } from "react";

export const ContactsContext = createContext<{
	contacts?: {
		id: number;
		firstName: string;
		lastName: string;
		phone: string;
	}[];
}>({});

export const ContactsProvider = ({ children }: { children: React.ReactNode }) => {
	const [contacts, setContacts] = useState<
		{
			id: number;
			firstName: string;
			lastName: string;
			phone: string;
		}[]
	>();

	useEffect(() => {
		if (!contacts) {
			const fetchContacts = async () => {
				const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/contacts`);
				const data = await response.json();
				if (data.status === "SUCCESS") {
					setContacts(data.data);
				}
			};

			fetchContacts();
		}
	}, [contacts]);

	return <ContactsContext.Provider value={{ contacts }}>{children}</ContactsContext.Provider>;
};
