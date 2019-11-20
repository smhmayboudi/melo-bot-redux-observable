import { IChat } from "../types/iChat";

export interface GetChat {
  (chat_id: number | string): IChat;
}
