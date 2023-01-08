import mongoose from "mongoose";
import { Contact } from "./models/contact.model";
import { Message } from "./models/message.model";

// This class represents the database connection and includes methods for interacting with the database
export class DB {
	// The URI for the database connection
	private DB_URI: string;

	// This static property is an object containing references to the Mongoose models for the Contact and Message collections
	static Models: {
		Contact: typeof Contact;
		Message: typeof Message;
	};

	// The constructor function sets the DB_URI property based on the argument passed in and sets the Models property
	constructor({ DB_URI }: { DB_URI: string }) {
		this.DB_URI = DB_URI;
		DB.Models = {
			Contact,
			Message,
		};
	}

	// This method connects to the database using the Mongoose library and the DB_URI property
	public async connect() {
		try {
			console.log("Connecting to DB");
			// Use the Mongoose connect method to establish a connection to the database
			await mongoose.connect(this.DB_URI, {
				dbName: "kisan",
			});

			console.log("Connected to DB");
		} catch (error) {
			console.log(error);
		}
	}
}
