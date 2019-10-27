import { IStateSendPollQuery } from "./iStateSendPollQuery";

export interface IStateSendPoll {
  error?: any;
  query?: IStateSendPollQuery;
  // TODO: check it
  result?: boolean;
}
