import { IInputFile } from "../types/iInputFile";

export interface setWebhook {
  (
    url: string,
    allowed_updates?: string[],
    certificate?: IInputFile,
    max_connections?: number,
  ): boolean
}