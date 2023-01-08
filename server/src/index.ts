import express from "express";
import { routes } from "./routes";
import { TRoute } from "./store/types/route.type";
import cors from "cors";
import dotenv from "dotenv";
import { DB } from "./database";
dotenv.config();

class App {
	public app: express.Application;

	constructor() {
		this.app = express();
		this.app.use(express.json());
		this.app.use(cors());
		this.routes();
		this.init();
	}

	routes() {
		routes.map((route: TRoute) => {
			this.app[route.method](route.path, ...(route.middleware || []), route.controller);
		});
	}

	async init() {
		try {
			await new DB({ DB_URI: process.env.DB_URI || "mongodb://localhost:27017" }).connect();
			this.listen();
		} catch (error) {
			console.log(error);
		}
	}

	listen() {
		this.app.listen(process.env.PORT || 3000, () => {
			console.log("Listening on port 3000");
		});
	}
}

export default new App().app;
