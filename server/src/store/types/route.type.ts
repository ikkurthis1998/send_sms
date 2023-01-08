import { EHTTPMethod } from "../enum/httpMethod.enum";
import { Request, Response } from "express";

export type TRoute = {
	method: EHTTPMethod;
	path: string;
	middleware?: any[];
	controller: (req: Request, res: Response) => void;
};
