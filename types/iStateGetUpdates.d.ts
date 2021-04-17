import { IStateGetUpdatesQuery } from "./iStateGetUpdatesQuery";
import { IUpdate } from "./telegramBot/updates/iUpdate";

export interface IStateGetUpdates {
  error?: any;
  query?: IStateGetUpdatesQuery;
  result?: IUpdate[];
}
