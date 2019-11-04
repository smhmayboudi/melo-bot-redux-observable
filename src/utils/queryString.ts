import * as querystring from "querystring";
import { IStateCallbackDataFindQuery } from "../../types/iStateCallbackDataFindQuery";

const parse: (str: string) => IStateCallbackDataFindQuery = (
  str: string
): IStateCallbackDataFindQuery =>
  querystring.parse<IStateCallbackDataFindQuery>(str, "&", "=");

const stringify: (obj: IStateCallbackDataFindQuery) => string = (
  obj: IStateCallbackDataFindQuery
): string => querystring.stringify<IStateCallbackDataFindQuery>(obj, "&", "=");

export { parse, stringify };
