import { useState, useEffect, useCallback } from "react";

export const useContacts = () => {
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
	}, []);

	return { contacts };
};
