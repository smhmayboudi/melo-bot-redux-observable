import { IStateSendVideoNoteQuery } from "./iStateSendVideoNoteQuery";
import { IMessage } from "./telegramBot/types/iMessage";

export interface IStateSendVideoNote {
  error?: any;
  query?: IStateSendVideoNoteQuery;
  result?: IMessage;
}
