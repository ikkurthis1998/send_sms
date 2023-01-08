import { Request, Response } from "express";
import { FunctionError } from "../../error";
import { EHTTPStatusCode } from "../../store/enum/httpStatusCode.enum";
import { TFunctionResponse } from "../../store/types/functionResponse.type";

export const Controller = () => {
	return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
		const functionName = `${target.name}.${propertyKey}`;
		const originalFunction = descriptor.value;
		const start = performance.now();
		descriptor.value = async function (req: Request, res: Response) {
			try {
				console.log(`${functionName} - Start`);
				const result: TFunctionResponse = await originalFunction.apply(this, [req, res]);
				console.log(`${functionName} - End - ${performance.now() - start}ms`);
				return res.status(result.statusCode).json(result);
			} catch (error) {
				console.log(`${functionName} - Error - ${performance.now() - start}ms`);
				if (error instanceof FunctionError) {
					return res.status(error.statusCode).json({
						status: error.status,
						statusCode: error.statusCode,
						message: error.message,
						data: error.data,
					});
				}
				return res.status(EHTTPStatusCode.INTERNAL_SERVER_ERROR).json(error);
			}
		};
		return descriptor;
	};
};
