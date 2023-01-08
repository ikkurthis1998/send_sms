export const Toast = ({ type, message }: { type: string; message: string }) => {
	if (!message) {
		return null;
	}

	return (
		<div
			style={{
				color: type === "error" ? "red" : "green",
				backgroundColor: type === "error" ? "pink" : "lightgreen",
				padding: "10px",
				borderRadius: "5px",
				margin: "10px",
				textAlign: "center",
			}}
		>
			{message}
		</div>
	);
};
