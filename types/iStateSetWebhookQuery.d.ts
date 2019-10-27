import { IInputFile } from "./telegramBot/types/iInputFile";

export interface IStateSetWebhookQuery {
  allowed_updates?: string[];
  certificate?: IInputFile;
  max_connections?: number;
  url: string;
}
