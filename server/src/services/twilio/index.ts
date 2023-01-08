import twilio, { Twilio } from "twilio";
import { FunctionError } from "../../error";
import { EHTTPStatusCode } from "../../store/enum/httpStatusCode.enum";
import { EStatus } from "../../store/enum/status.enum";
import { TFunctionResponse } from "../../store/types/functionResponse.type";
import dotenv from "dotenv";

// Load environment variables from the .env file
dotenv.config();

// This class provides a service for sending text messages using the Twilio API
export class TwilioService {
	// These properties store the Twilio account SID, auth token, client instance, and from number
	private accountSid: string;
	private authToken: string;
	private client: Twilio;
	private fromNumber: string;

	constructor() {
		// Initialize the properties with the values from the environment variables, or empty strings if the variables are not set
		this.accountSid = process.env.TWILIO_ACCOUNT_SID || "";
		this.authToken = process.env.TWILIO_AUTH_TOKEN || "";
		this.client = twilio(this.accountSid, this.authToken);
		this.fromNumber = process.env.TWILIO_FROM_NUMBER || "";
	}

	// This method sends a text message to the specified phone number using the Twilio client
	public async sendTextMessage({
		phone,
		message,
	}: {
		phone: string;
		message: string;
	}): Promise<TFunctionResponse> {
		try {
			// Send the text message using the Twilio client and store the response
			const response = await this.client.messages.create({
				body: message,
				from: this.fromNumber,
				to: phone,
			});
			// Return a success response with the Twilio response as the data
			return {
				status: EStatus.SUCCESS,
				statusCode: EHTTPStatusCode.OK,
				message: "Text message sent successfully",
				data: response,
			};
		} catch (error) {
			// If the error is an instance of FunctionError, throw a new FunctionError with the same status code and data, but with a different message
			if (error instanceof FunctionError) {
				throw new FunctionError({
					status: EStatus.ERROR,
					statusCode: error.statusCode,
					message: "Error sending text message",
					data: error.data,
				});
			}
			// If the error is not an instance of FunctionError, throw a new FunctionError with a status code of INTERNAL_SERVER_ERROR and the original error as the data
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
