import { IUpdate } from "./iUpdate";

export interface GetUpdates {
  (
    allowed_updates?: string[],
    limit?: number,
    offset?: number,
    timeout?: number
  ): IUpdate[];
}
