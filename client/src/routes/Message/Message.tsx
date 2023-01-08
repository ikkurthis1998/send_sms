import React, { useState, useEffect } from "react";
import {
	Form,
	ActionFunctionArgs,
	useParams,
	Navigate,
	redirect,
	useSearchParams,
} from "react-router-dom";
import "./Message.css";
import contacts from "../../contacts.json";
import { HomeHeader } from "../../components/HomeHeader";
import { Toast } from "../../components/Toast";

export const sendMessage = async ({ request, params }: ActionFunctionArgs) => {
	try {
		const formData = await request.formData();

		const entries = Object.fromEntries(formData);

		const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/text/send`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				phone: entries.phone,
				message: entries.message,
				otp: entries.otp,
			}),
		});

		const data = await response.json();

		if (data.status !== "SUCCESS") {
			return redirect(`/contactInfo/${params.id}/sendMessage?error=${data.message}`);
		}

		return redirect(`/contactInfo/${params.id}/sendMessage?success=Message sent successfully`);
	} catch (error) {
		return redirect(`/contactInfo/${params.id}/sendMessage?error=Error sending message`);
	}
};

export const Message = () => {
	const [otp, setOtp] = useState(Math.floor(100000 + Math.random() * 900000));
	const [message, setMessage] = useState(`Hi. Your OTP is: ${otp}`);

	const { id } = useParams<{ id: string }>();

	const [searchParams, setSearchParams] = useSearchParams();

	const { error, success } = Object.fromEntries(searchParams);

	useEffect(() => {
		if (error || success) {
			const toastWait = setTimeout(() => {
				searchParams.delete("error");
				searchParams.delete("success");
				setSearchParams(searchParams);
			}, 3000);

			return () => {
				clearTimeout(toastWait);
			};
		}
	}, [searchParams, setSearchParams]);

	if (!id) {
		return <Navigate to="/" />;
	}

	const contact = contacts.find((contact) => contact.id === parseInt(id));

	if (!contact) {
		return <Navigate to="/" />;
	}

	return (
		<div className="message">
			<HomeHeader />
			{error && (
				<Toast
					type="error"
					message={error}
				/>
			)}
			{success && (
				<Toast
					type="success"
					message={success}
				/>
			)}
			<Form
				method="post"
				className="message_form"
			>
				<input
					type="hidden"
					name="phone"
					value={contact.phone}
				/>
				<input
					type="hidden"
					name="otp"
					value={otp}
				/>
				<textarea
					className="message_textarea"
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					name="message"
				/>
				<button
					type="submit"
					className="message_send_button"
				>
					Send
				</button>
			</Form>
		</div>
	);
};
