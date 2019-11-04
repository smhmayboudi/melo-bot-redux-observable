import { IStateCallbackDataInsertQuery } from "./iStateCallbackDataInsertQuery";

export interface IStateCallbackDataInsert {
  error?: any;
  query?: IStateCallbackDataInsertQuery;
  result?: string;
}
