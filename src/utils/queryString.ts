import * as querystring from "querystring";
import { IStateCallbackQueryDataFindQuery } from "../../types/iStateCallbackQueryDataFindQuery";

const parse: (str: string) => IStateCallbackQueryDataFindQuery = (
  str: string
): IStateCallbackQueryDataFindQuery =>
  querystring.parse<IStateCallbackQueryDataFindQuery>(str, "&", "=");

const stringify: (obj: IStateCallbackQueryDataFindQuery) => string = (
  obj: IStateCallbackQueryDataFindQuery
): string =>
  querystring.stringify<IStateCallbackQueryDataFindQuery>(obj, "&", "=");

export { parse, stringify };
