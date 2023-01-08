import { Request } from "express";
import { FunctionError } from "../error";
import { twilioService } from "../services/twilio";
import { EHTTPStatusCode } from "../store/enum/httpStatusCode.enum";
import { EStatus } from "../store/enum/status.enum";
import { TFunctionResponse } from "../store/types/functionResponse.type";
import { Controller } from "../utils/decorators/controller.decorator";
import { DB } from "../database";
import { EMessageStatus } from "../store/enum/messageStatus.enum";

// This class contains the controllers for the text message routes
export class TextMessage {
	static async send(req: Request): Promise<TFunctionResponse> {
		// Validate that phone number and message are present in the request body
		try {
			const { phone, message, otp } = req.body;

			if (!phone) {
				throw new FunctionError({
					status: EStatus.ERROR,
					statusCode: EHTTPStatusCode.BAD_REQUEST,
					message: "Phone number is required",
					data: {},
				});
			}

			if (!message) {
				throw new FunctionError({
					status: EStatus.ERROR,
					statusCode: EHTTPStatusCode.BAD_REQUEST,
					message: "Message is required",
					data: {},
				});
			}

			// Check if the phone number exists in the contacts collection
			const contact = await DB.Models.Contact.findOne({
				phone,
			}).lean();

			let messageDoc;
			if (contact) {
				// If the phone number exists, create a new message document and store it in the messages collection
				messageDoc = await DB.Models.Message.create({
					contact: contact._id,
					message,
					otp,
				});
			}

			// Send the text message using the Twilio service
			await twilioService.sendTextMessage({ phone, message });

			if (messageDoc) {
				// If the message document was created, update its status to 'sent'
				await DB.Models.Message.updateOne(
					{
						_id: messageDoc._id,
					},
					{
						$set: {
							status: EMessageStatus.SENT,
						},
					}
				);
			}
			// Return success response
			return {
				status: EStatus.SUCCESS,
				statusCode: EHTTPStatusCode.OK,
				message: "Text message sent",
				data: {},
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

	@Controller()
	static async getAll(req: Request): Promise<TFunctionResponse> {
		try {
			// Fetch all messages from the database
			const messages = await DB.Models.Message.find().populate("contact").lean();

			// Return success response with the messages
			return {
				status: EStatus.SUCCESS,
				statusCode: EHTTPStatusCode.OK,
				message: "Text messages fetched",
				data: messages,
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
