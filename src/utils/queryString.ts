import * as querystring from "querystring";
import { IQueryString } from "../../types/iQueryString";

const parse: (str: string) => IQueryString = (str: string): IQueryString =>
  querystring.parse<IQueryString>(str, "&", "=");

const stringify: (obj: IQueryString) => string = (obj: IQueryString): string =>
  querystring.stringify<IQueryString>(obj, "&", "=");

export { parse, stringify };
