import "./Contacts.css";
import { Link } from "react-router-dom";
import { ContactsContext } from "../../../../contexts/ContactsProvider";
import { useContext } from "react";

export const Contacts = () => {
	const { contacts } = useContext(ContactsContext);

	return (
		<div className="contacts_outline">
			{contacts &&
				contacts.map((contact) => (
					<Link
						to={`/contactInfo/${contact.id}`}
						key={contact.id}
					>
						<div className="contact_name">
							{contact.id}. {contact.firstName} {contact.lastName}
						</div>
					</Link>
				))}
		</div>
	);
};
