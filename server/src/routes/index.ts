import { EHTTPMethod } from "../store/enum/httpMethod.enum";
import { TRoute } from "../store/types/route.type";
import { Request, Response } from "express";
import { TextMessage } from "../controllers/textMessage.controller";
import { Contact } from "../controllers/contact.controller";

export const routes: TRoute[] = [
	{
		method: EHTTPMethod.GET,
		path: "/",
		controller: (req: Request, res: Response) => {
			res.json({
				message: "It's alive!",
			});
		},
	},
	{
		method: EHTTPMethod.POST,
		path: "/text/send",
		controller: TextMessage.send,
	},
	{
		method: EHTTPMethod.GET,
		path: "/contacts",
		controller: Contact.getAll,
	},
	{
		method: EHTTPMethod.POST,
		path: "/contacts/create",
		controller: Contact.create,
	},
	{
		method: EHTTPMethod.GET,
		path: "/messages",
		controller: TextMessage.getAll,
	},
];
