import { IInlineQuery } from "../types/telegramBot/inlineMode/iInlineQuery";
import { ICallbackQuery } from "../types/telegramBot/types/iCallbackQuery";
import { IMessage } from "../types/telegramBot/types/iMessage";

import { IChosenInlineResult } from "./telegramBot/inlineMode/iChosenInlineResult";
import { IPreCheckoutQuery } from "./telegramBot/payments/iPreCheckoutQuery";
import { IShippingQuery } from "./telegramBot/payments/iShippingQuery";

export interface IStateMessageQuery {
  callback_query?: ICallbackQuery;
  channel_post?: IMessage;
  chosen_inline_result?: IChosenInlineResult;
  edited_channel_post?: IMessage;
  edited_channel_post_caption?: IMessage;
  edited_channel_post_text?: IMessage;
  edited_message?: IMessage;
  edited_message_caption?: IMessage;
  edited_message_text?: IMessage;
  error?: Error;
  inline_query?: IInlineQuery;
  message?: IMessage;
  polling_error?: Error;
  pre_checkout_query?: IPreCheckoutQuery;
  shipping_query?: IShippingQuery;
  update_id: number;
  webhook_error?: Error;
}
