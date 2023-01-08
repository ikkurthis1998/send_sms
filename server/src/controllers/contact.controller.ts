import { DB } from "../database";
import { FunctionError } from "../error";
import { EHTTPStatusCode } from "../store/enum/httpStatusCode.enum";
import { EStatus } from "../store/enum/status.enum";
import { TFunctionResponse } from "../store/types/functionResponse.type";
import { Controller } from "../utils/decorators/controller.decorator";
import { Request } from "express";

export class Contact {
	@Controller()
	static async getAll(): Promise<TFunctionResponse> {
		try {
			const contacts = await DB.Models.Contact.find();

			return {
				status: EStatus.SUCCESS,
				statusCode: EHTTPStatusCode.OK,
				message: "Contacts retrieved",
				data: contacts,
			};
		} catch (error) {
			if (error instanceof FunctionError) {
				throw new FunctionError({
					status: EStatus.ERROR,
					statusCode: error.statusCode,
					message: error.message,
					data: error.data,
				});
			}
			throw new FunctionError({
				status: EStatus.ERROR,
				statusCode: EHTTPStatusCode.INTERNAL_SERVER_ERROR,
				message: "Error sending text message",
				data: error,
			});
		}
	}

	@Controller()
	static async create(req: Request): Promise<TFunctionResponse> {
		try {
			const { firstName, lastName, phone } = req.body;

			const contactId = (await DB.Models.Contact.countDocuments()) + 1;
			const contact = await DB.Models.Contact.create({
				firstName,
				lastName,
				phone,
				id: contactId,
			});

			return {
				status: EStatus.SUCCESS,
				statusCode: EHTTPStatusCode.OK,
				message: "Contact created",
				data: contact,
			};
		} catch (error) {
			if (error instanceof FunctionError) {
				throw new FunctionError({
					status: EStatus.ERROR,
					statusCode: error.statusCode,
					message: error.message,
					data: error.data,
				});
			}
			throw new FunctionError({
				status: EStatus.ERROR,
				statusCode: EHTTPStatusCode.INTERNAL_SERVER_ERROR,
				message: "Error sending text message",
				data: error,
			});
		}
	}
}
