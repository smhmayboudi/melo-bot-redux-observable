import { IChat } from "../types/iChat";

export interface getChat {
  (chat_id: number | string): IChat;
}
