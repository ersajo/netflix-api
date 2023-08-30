import { IHttpRequest } from "../helpers/callback";

export interface IControllerResponse {
  success: boolean;
  statusCode: number;
  body: {
    [result: string]: any;
    error?: string;
  };
}

export type Controller = (
  request: Partial<IHttpRequest>
) => Promise<IControllerResponse>;