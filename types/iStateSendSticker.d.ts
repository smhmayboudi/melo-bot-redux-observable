import { IStateSendStickerQuery } from "./iStateSendStickerQuery";
import { IMessage } from "./telegramBot/types/iMessage";

export interface IStateSendSticker {
  error?: any;
  query?: IStateSendStickerQuery;
  result?: IMessage;
}
