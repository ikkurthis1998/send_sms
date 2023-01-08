import { EHTTPStatusCode } from "../enum/httpStatusCode.enum";
import { EStatus } from "../enum/status.enum";

export type TFunctionResponse = {
	status: EStatus;
	statusCode: EHTTPStatusCode;
	message: string;
	data: any;
};
