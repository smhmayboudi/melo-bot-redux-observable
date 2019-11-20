import { IInputFile } from "../types/iInputFile";

export interface SetWebhook {
  (
    url: string,
    allowed_updates?: string[],
    certificate?: IInputFile,
    max_connections?: number
  ): boolean;
}
