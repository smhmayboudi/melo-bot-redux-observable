import { IStateGetFileQuery } from "./iStateGetFileQuery";

export interface IStateGetFile {
  error?: any;
  query?: IStateGetFileQuery;
  // TODO: check it
  result?: boolean;
}
