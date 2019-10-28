import { IStateSendPhotoQuery } from "./iStateSendPhotoQuery";
import { IMessage } from "./telegramBot/types/iMessage";

export interface IStateSendPhoto {
  error?: any;
  query?: IStateSendPhotoQuery;
  result?: IMessage;
}
