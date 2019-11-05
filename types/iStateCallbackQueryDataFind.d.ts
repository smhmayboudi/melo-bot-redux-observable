import { IStateCallbackQueryDataFindQuery } from "./iStateCallbackQueryDataFindQuery";
import { IStateCallbackQueryDataInsertQuery } from "./iStateCallbackQueryDataInsertQuery";

export interface IStateCallbackQueryDataFind {
  error?: any;
  query?: IStateCallbackQueryDataFindQuery;
  result?: IStateCallbackQueryDataInsertQuery;
}
