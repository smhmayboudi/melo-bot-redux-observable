import { IStateSendContactQuery } from "./iStateSendContactQuery";

export interface IStateSendContact {
  error?: any;
  query?: IStateSendContactQuery;
  // TODO: check it
  result?: boolean;
}
