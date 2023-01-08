import twilio, { Twilio } from "twilio";
import { FunctionError } from "../../error";
import { EHTTPStatusCode } from "../../store/enum/httpStatusCode.enum";
import { EStatus } from "../../store/enum/status.enum";
import { TFunctionResponse } from "../../store/types/functionResponse.type";
import dotenv from "dotenv";
dotenv.config();

export class TwilioService {
	private accountSid: string;
	private authToken: string;
	private client: Twilio;
	private fromNumber: string;

	constructor() {
		this.accountSid = process.env.TWILIO_ACCOUNT_SID || "";
		this.authToken = process.env.TWILIO_AUTH_TOKEN || "";
		this.client = twilio(this.accountSid, this.authToken);
		this.fromNumber = process.env.TWILIO_FROM_NUMBER || "";
	}

	public async sendTextMessage({
		phone,
		message,
	}: {
		phone: string;
		message: string;
	}): Promise<TFunctionResponse> {
		try {
			const response = await this.client.messages.create({
				body: message,
				from: this.fromNumber,
				to: phone,
			});

			return {
				status: EStatus.SUCCESS,
				statusCode: EHTTPStatusCode.OK,
				message: "Text message sent successfully",
				data: response,
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

export const twilioService = new TwilioService();
