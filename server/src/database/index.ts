import mongoose from "mongoose";
import { Contact } from "./models/contact.model";
import { Message } from "./models/message.model";

export class DB {
	private DB_URI: string;

	static Models: {
		Contact: typeof Contact;
		Message: typeof Message;
	};

	constructor({ DB_URI }: { DB_URI: string }) {
		this.DB_URI = DB_URI;
		DB.Models = {
			Contact,
			Message,
		};
	}

	public async connect() {
		try {
			console.log("Connecting to DB");
			await mongoose.connect(this.DB_URI, {
				dbName: "kisan",
			});

			console.log("Connected to DB");
		} catch (error) {
			console.log(error);
		}
	}
}
