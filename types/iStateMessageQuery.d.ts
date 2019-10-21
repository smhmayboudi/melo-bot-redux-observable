import { IInlineQuery } from "../types/telegramBot/inlineMode/iInlineQuery";
import { ICallbackQuery } from "../types/telegramBot/types/iCallbackQuery";
import { IMessage } from "../types/telegramBot/types/iMessage";

import { IChosenInlineResult } from "./telegramBot/inlineMode/iChosenInlineResult";
import { IPreCheckoutQuery } from "./telegramBot/payments/iPreCheckoutQuery";
import { IShippingQuery } from "./telegramBot/payments/iShippingQuery";

export interface IStateMessageQuery {
  callback_query?: ICallbackQuery;
  chosen_inline_result?: IChosenInlineResult;
  error?: Error;
  inline_query?: IInlineQuery;
  message?: IMessage;
  pre_checkout_query?: IPreCheckoutQuery;
  shipping_query?: IShippingQuery;
  update_id: number;
}
