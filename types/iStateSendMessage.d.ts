import { IMessage } from "../types/telegramBot/types/iMessage";

import { IStateSendMessageQuery } from "./iStateSendMessageQuery";

export interface IStateSendMessage {
  error?: Error;
  query?: IStateSendMessageQuery;
  result?: IMessage;
}
