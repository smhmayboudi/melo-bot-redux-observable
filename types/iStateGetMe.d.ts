import { IStateGetMeQuery } from "./iStateGetMeQuery";

export interface IStateGetMe {
  error?: any;
  query?: IStateGetMeQuery;
  // TODO: check it
  result?: boolean;
}
