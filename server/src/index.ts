import express from "express";
import { routes } from "./routes";
import { TRoute } from "./store/types/route.type";
import cors from "cors";
import dotenv from "dotenv";
import { DB } from "./database";

// Load environment variables from the .env file
dotenv.config();

// This class represents the Express app
class App {
	// The app instance will be stored in this property
	public app: express.Application;

	// In the constructor, we initialize the app and set up middleware and routes
	constructor() {
		this.app = express();
		this.app.use(express.json());
		this.app.use(cors());
		this.routes();
		this.init();
	}

	// This function sets up the routes for the app
	routes() {
		// Iterate through the routes array and set up the routes for the app
		routes.map((route: TRoute) => {
			this.app[route.method](route.path, ...(route.middleware || []), route.controller);
		});
	}

	// This function initializes the app by connecting to the database and starting the server
	async init() {
		try {
			// Connect to the database
			await new DB({ DB_URI: process.env.DB_URI || "mongodb://localhost:27017" }).connect();
			// Start the server
			this.listen();
		} catch (error) {
			console.log(error);
		}
	}

	// This function starts the server
	listen() {
		this.app.listen(process.env.PORT || 3000, () => {
			console.log("Listening on port 3000");
		});
	}
}

// Export the app instance
export default new App().app;
