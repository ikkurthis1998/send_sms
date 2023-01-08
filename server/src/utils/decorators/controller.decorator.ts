import { Request, Response } from "express";
import { FunctionError } from "../../error";
import { EHTTPStatusCode } from "../../store/enum/httpStatusCode.enum";
import { TFunctionResponse } from "../../store/types/functionResponse.type";

// This function returns a decorator that can be used to modify the behavior of a class method
export const Controller = () => {
	return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
		// Get the name of the decorated function in the form "ClassName.methodName"
		const functionName = `${target.name}.${propertyKey}`;
		// Save a reference to the original function
		const originalFunction = descriptor.value;
		// Get the start time of the function
		const start = performance.now();
		// Overwrite the original function with a new function that logs the start, end, and error of the decorated function
		descriptor.value = async function (req: Request, res: Response) {
			try {
				// Log the start of the function
				console.log(`${functionName} - Start`);
				// Call the original function and store the result
				const result: TFunctionResponse = await originalFunction.apply(this, [req, res]);
				// Log the end of the function and the time it took to run
				console.log(`${functionName} - End - ${performance.now() - start}ms`);
				// Return the result as a JSON response with the status code specified in the result
				return res.status(result.statusCode).json(result);
			} catch (error) {
				// Log the error and the time it took to run
				console.log(`${functionName} - Error - ${performance.now() - start}ms`);
				// If the error is an instance of FunctionError, return a JSON response with the error's status code and data
				if (error instanceof FunctionError) {
					return res.status(error.statusCode).json({
						status: error.status,
						statusCode: error.statusCode,
						message: error.message,
						data: error.data,
					});
				}
				// If the error is not an instance of FunctionError, return a JSON response with a status code of INTERNAL_SERVER_ERROR and the error data
				return res.status(EHTTPStatusCode.INTERNAL_SERVER_ERROR).json(error);
			}
		};
		// Return the modified descriptor
		return descriptor;
	};
};
