import { IStateCallbackDataFindQuery } from "./iStateCallbackDataFindQuery";
import { IStateCallbackDataInsertQuery } from "./iStateCallbackDataInsertQuery";

export interface IStateCallbackDataFind {
  error?: any;
  query?: IStateCallbackDataFindQuery;
  result?: IStateCallbackDataInsertQuery;
}
