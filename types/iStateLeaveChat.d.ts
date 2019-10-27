import { IStateLeaveChatQuery } from "./iStateLeaveChatQuery";

export interface IStateLeaveChat {
  error?: any;
  query?: IStateLeaveChatQuery;
  // TODO: check it
  result?: boolean;
}
