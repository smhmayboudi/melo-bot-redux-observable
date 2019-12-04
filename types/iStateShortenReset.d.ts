import { UpsertResult } from "mariadb";

import { IStateShortenResetQuery } from "./iStateShortenResetQuery";

export interface IStateShortenReset {
  error?: any;
  query?: IStateShortenResetQuery;
  result?: UpsertResult;
}
