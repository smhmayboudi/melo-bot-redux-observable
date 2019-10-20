import { IResponseParameters } from "./telegramBot/types/iResponseParameters";

export interface IResponse {
  description?: string;
  error_code?: number;
  ok: boolean;
  parameters?: IResponseParameters;
  result?: any;
}
