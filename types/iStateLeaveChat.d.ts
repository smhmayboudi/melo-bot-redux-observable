import { IStateLeaveChatQuery } from "./iStateLeaveChatQuery";

export interface IStateLeaveChat {
  error?: any;
  query?: IStateLeaveChatQuery;
  result?: boolean;
}
