import { IStateForwardMessageQuery } from "./iStateForwardMessageQuery";

export interface IStateForwardMessage {
  error?: any;
  query?: IStateForwardMessageQuery;
  // TODO: check it
  result?: boolean;
}
