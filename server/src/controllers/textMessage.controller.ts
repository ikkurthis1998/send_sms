import { Request } from "express";
import { FunctionError } from "../error";
import { twilioService } from "../services/twilio";
import { EHTTPStatusCode } from "../store/enum/httpStatusCode.enum";
import { EStatus } from "../store/enum/status.enum";
import { TFunctionResponse } from "../store/types/functionResponse.type";
import { Controller } from "../utils/decorators/controller.decorator";
import { DB } from "../database";
import { EMessageStatus } from "../store/enum/messageStatus.enum";

export class TextMessage {
	@Controller()
	static async send(req: Request): Promise<TFunctionResponse> {
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

			const contact = await DB.Models.Contact.findOne({
				phone,
			}).lean();

			let messageDoc;
			if (contact) {
				messageDoc = await DB.Models.Message.create({
					contact: contact._id,
					message,
					otp,
				});
			}

			await twilioService.sendTextMessage({ phone, message });

			if (messageDoc) {
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
			return {
				status: EStatus.SUCCESS,
				statusCode: EHTTPStatusCode.OK,
				message: "Text message sent",
				data: {},
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
	static async getAll(req: Request): Promise<TFunctionResponse> {
		try {
			const messages = await DB.Models.Message.find().populate("contact").lean();

			return {
				status: EStatus.SUCCESS,
				statusCode: EHTTPStatusCode.OK,
				message: "Text messages fetched",
				data: messages,
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
