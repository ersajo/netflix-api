import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Controller, IControllerResponse } from "../controllers";

import { logger } from "./logger";

export interface IHttpRequest {
  body: Request["body"];
  params: Request["params"];
  query: Request["query"];
}

export const adaptRoute = (controller: Controller) => {
	return async (req: Request, res: Response) => {
		try {
			const httpRequest = {
				body: req.body,
				query: req.query,
				params: req.params,
			};
			const httpResponse: IControllerResponse = await controller(httpRequest);

			res.json(httpResponse.body);
		} catch (error: any) {
			logger.log(error);

			res.json({
				success: false,
				statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
				body: {
					error: error.message,
				},
			});
		}
	};
};