import * as querystring from "querystring";
import { IQueryString } from "../../types/iQueryString";

const parse: (x: string) => IQueryString = (str: string): IQueryString =>
  querystring.parse<IQueryString>(str, "-", "_");

const stringify: (obj: IQueryString) => string = (obj: IQueryString): string =>
  querystring.stringify<IQueryString>(obj, "-", "_");

export { parse, stringify };
