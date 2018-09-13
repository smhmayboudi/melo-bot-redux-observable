import { IInlineQuery } from "../types/telegramBot/inlineMode/iInlineQuery";
import { ICallbackQuery } from "../types/telegramBot/types/iCallbackQuery";
import { IMessage } from "../types/telegramBot/types/iMessage";

export interface IStateMessageQuery {
  callback_query?: ICallbackQuery;
  inline_query?: IInlineQuery;
  message?: IMessage;
  update_id: number;
}