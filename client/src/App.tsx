import { Outlet } from "react-router-dom";
import "./App.css";
import { ContactsProvider } from "./contexts/ContactsProvider";

function App() {
	return (
		<div className="app_outline">
			<div className="app">
				<ContactsProvider>
					<Outlet />
				</ContactsProvider>
			</div>
		</div>
	);
}

export default App;
