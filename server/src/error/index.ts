import { EHTTPStatusCode } from "../store/enum/httpStatusCode.enum";
import { EStatus } from "../store/enum/status.enum";

// This class extends the built-in Error class to add additional properties for HTTP status code, status, message, and data
export class FunctionError extends Error {
	// The HTTP status code for the error
	public statusCode: EHTTPStatusCode;
	// The status of the error (e.g. "error" or "success")
	public status: EStatus;
	// A message describing the error
	public message: string;
	// Any additional data related to the error
	public data: any;

	// The constructor function is called when a new instance of the class is created, and sets the properties based on the arguments passed in
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
		// Call the parent class (Error) constructor with the message argument
		super(message);
		// Set the additional properties for the FunctionError instance
		this.statusCode = statusCode;
		this.status = status;
		this.message = message;
		this.data = data;
	}
}
