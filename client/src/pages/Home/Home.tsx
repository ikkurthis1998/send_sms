import { Contacts } from "./Components/Contacts/Contacts";
import { useState } from "react";
import "./Home.css";
import { Messages } from "./Components/Messages/Messages";

enum EState {
	CONTACTS = "CONTACTS",
	MESSAGES = "MESSAGES",
}

export const Home = () => {
	const [state, setState] = useState<EState>(EState.CONTACTS);

	return (
		<div className="home">
			<div className="menu">
				<div
					onClick={() => setState(EState.CONTACTS)}
					className={`menu_item ${state === EState.CONTACTS && "active"}`}
				>
					Contacts
				</div>
				<div
					onClick={() => setState(EState.MESSAGES)}
					className={`menu_item ${state === EState.MESSAGES && "active"}`}
				>
					Messages
				</div>
			</div>
			<div className="view">
				{state === EState.CONTACTS && <Contacts />}
				{state === EState.MESSAGES && <Messages />}
			</div>
		</div>
	);
};
