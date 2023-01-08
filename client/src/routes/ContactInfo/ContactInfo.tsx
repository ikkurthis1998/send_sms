import { useParams } from "react-router-dom";
import "./ContactInfo.css";
import { Link, Navigate } from "react-router-dom";
import { HomeHeader } from "../../components/HomeHeader";
import { ContactsContext } from "../../contexts/ContactsProvider";
import { useContext } from "react";

export const ContactInfo = () => {
	const { id } = useParams<{ id: string }>();

	const { contacts } = useContext(ContactsContext);

	if (!id) {
		return <Navigate to="/" />;
	}

	const contact = contacts?.find((contact) => contact.id === parseInt(id));

	if (!contact) {
		return <Navigate to="/" />;
	}

	return (
		<div className="contact_info">
			<HomeHeader />
			<div className="contact_info_name">
				{contact?.firstName} {contact?.lastName}
			</div>
			<div className="contact_info_phone">Phone: {contact?.phone}</div>
			<Link to={`/contactInfo/${id}/sendMessage`}>
				<button className="send_message_button">Send Message</button>
			</Link>
		</div>
	);
};
