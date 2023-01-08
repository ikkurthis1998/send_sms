import { Link } from "react-router-dom";

export const HomeHeader = () => {
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "flex-start",
				width: "100%",
			}}
		>
			<Link to={`/`}>
				<button className="send_message_button">Home</button>
			</Link>
		</div>
	);
};
