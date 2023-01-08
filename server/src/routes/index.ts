import { EHTTPMethod } from "../store/enum/httpMethod.enum";
import { TRoute } from "../store/types/route.type";
import { Request, Response } from "express";
import { TextMessage } from "../controllers/textMessage.controller";
import { Contact } from "../controllers/contact.controller";

// This array defines the routes for the express server, including the HTTP method, path, and controller function for each route
export const routes: TRoute[] = [
	// A GET request to the root path will return a JSON response with the message "It's alive!"
	{
		method: EHTTPMethod.GET,
		path: "/",
		controller: (req: Request, res: Response) => {
			res.json({
				message: "It's alive!",
			});
		},
	},
	// A POST request to the "/text/send" path will trigger the send function in the TextMessage controller
	{
		method: EHTTPMethod.POST,
		path: "/text/send",
		controller: TextMessage.send,
	},
	// A GET request to the "/contacts" path will trigger the getAll function in the Contact controller
	{
		method: EHTTPMethod.GET,
		path: "/contacts",
		controller: Contact.getAll,
	},
	// A POST request to the "/contacts/create" path will trigger the create function in the Contact controller
	{
		method: EHTTPMethod.POST,
		path: "/contacts/create",
		controller: Contact.create,
	},
	// A GET request to the "/messages" path will trigger the getAll function in the TextMessage controller
	{
		method: EHTTPMethod.GET,
		path: "/messages",
		controller: TextMessage.getAll,
	},
];
