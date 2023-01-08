import React, { useEffect, useState } from "react";
import "./Messages.css";

type TMessage = {
	_id: string;
	contact: {
		firstName: string;
		lastName: string;
	};
	otp: number;
	createdAt: Date;
	status: string;
};

export const Messages = () => {
	const [messages, setMessages] = useState<TMessage[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchMessages = async () => {
			const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/messages`);
			const data = await response.json();
			if (data.status === "SUCCESS") {
				const messages = data.data;
				messages.sort(
					(a: TMessage, b: TMessage) =>
						new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
				);
				setMessages(messages);
			}
			setLoading(false);
		};

		fetchMessages();
	}, []);

	return (
		<div className="messages">
			<div className="message_row">
				<div className="message_name">To</div>
				<div className="message_otp">OTP</div>
				<div className="message_date">Sent At</div>
				<div className="message_status">Status</div>
			</div>
			{loading && (
				<div
					style={{
						width: "100%",
						textAlign: "center",
						marginTop: "20px",
					}}
				>
					Loading...
				</div>
			)}
			{messages &&
				messages.map((message) => {
					return (
						<div
							key={message._id}
							className="message_row"
						>
							<div className="message_name">{`${message.contact.firstName} ${message.contact.lastName}`}</div>
							<div className="message_otp">{message.otp}</div>
							<div className="message_date">
								{new Date(message.createdAt).toLocaleString("en-US", {
									year: "numeric",
									month: "short",
									day: "numeric",
									hour: "numeric",
									minute: "numeric",
								})}
							</div>
							<div
								className="message_status"
								style={{
									color: message.status === "SENT" ? "green" : "red",
								}}
							>
								{message.status}
							</div>
						</div>
					);
				})}
		</div>
	);
};
