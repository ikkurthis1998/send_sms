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
		// Try to retrieve all contacts from the database
		try {
			const contacts = await DB.Models.Contact.find();

			// Return success response with contacts data
			return {
				status: EStatus.SUCCESS,
				statusCode: EHTTPStatusCode.OK,
				message: "Contacts retrieved",
				data: contacts,
			};
		} catch (error) {
			// Catch any errors that occur
			// If the error is a FunctionError, throw it again with the correct HTTP status code
			if (error instanceof FunctionError) {
				throw new FunctionError({
					status: EStatus.ERROR,
					statusCode: error.statusCode,
					message: error.message,
					data: error.data,
				});
			}
			// If the error is not a FunctionError, throw a new FunctionError with the correct HTTP status code
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
			// Extract firstName, lastName, and phone from the request body
			const { firstName, lastName, phone } = req.body;

			// Calculate the next ID for the contact by counting the number of documents in the collection and adding 1
			const contactId = (await DB.Models.Contact.countDocuments()) + 1;

			// Create a new contact document with the provided firstName, lastName, phone, and ID
			const contact = await DB.Models.Contact.create({
				firstName,
				lastName,
				phone,
				id: contactId,
			});

			// Return success response with the created contact document
			return {
				status: EStatus.SUCCESS,
				statusCode: EHTTPStatusCode.OK,
				message: "Contact created",
				data: contact,
			};
		} catch (error) {
			// If an error occurred, throw a FunctionError with the error details
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
