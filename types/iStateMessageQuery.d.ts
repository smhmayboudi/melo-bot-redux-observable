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
  // Edited_channel_post_text?: IMessage;
  // Edited_channel_post_caption?: IMessage;
  edited_message?: IMessage;
  // Edited_message_text?: IMessage;
  // Edited_message_caption?: IMessage;
  error?: Error;
  inline_query?: IInlineQuery;
  message?: IMessage;
  // Polling_error?: Error;
  pre_checkout_query?: IPreCheckoutQuery;
  shipping_query?: IShippingQuery;
  update_id: number;
  // Webhook_error?: Error;
}
