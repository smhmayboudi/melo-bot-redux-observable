import { IMessage } from "../types/iMessage";
import { IUser } from "../types/iUser";

export interface ICallbackQuery {
  chat_instance: string;
  data?: string;
  from: IUser;
  game_short_name?: string;
  id: string;
  inline_message_id?: string;
  message?: IMessage;
}