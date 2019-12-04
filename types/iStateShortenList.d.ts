import { IStateShortenListQuery } from "./iStateShortenListQuery";
import { IStateShortenListResult } from "./iStateShortenListResult";

export interface IStateShortenList {
  error?: any;
  query?: IStateShortenListQuery;
  result?: IStateShortenListResult[];
}
