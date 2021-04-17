import { IStateGetChatQuery } from "./iStateGetChatQuery";
import { IChat } from "./telegramBot/types/iChat";

export interface IStateGetChat {
  error?: any;
  query?: IStateGetChatQuery;
  result?: IChat;
}
