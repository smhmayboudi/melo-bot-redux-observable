import { IUpdate } from "./iUpdate";

export interface getUpdates {
  (
    allowed_updates?: string[],
    limit?: number,
    offset?: number,
    timeout?: number,
  ): IUpdate[]
}