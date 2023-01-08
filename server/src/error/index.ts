import { EHTTPStatusCode } from "../store/enum/httpStatusCode.enum";
import { EStatus } from "../store/enum/status.enum";

export class FunctionError extends Error {
	public statusCode: EHTTPStatusCode;
	public status: EStatus;
	public message: string;
	public data: any;

	constructor({
		statusCode,
		status,
		message,
		data,
	}: {
		statusCode: EHTTPStatusCode;
		status: EStatus;
		message: string;
		data: any;
	}) {
		super(message);
		this.statusCode = statusCode;
		this.status = status;
		this.message = message;
		this.data = data;
	}
}
