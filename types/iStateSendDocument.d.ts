import { IStateSendDocumentQuery } from "./iStateSendDocumentQuery";
import { IMessage } from "./telegramBot/types/iMessage";

export interface IStateSendDocument {
  error?: any;
  query?: IStateSendDocumentQuery;
  result?: IMessage;
}
