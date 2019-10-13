import { IChosenInlineResult } from "../inlineMode/iChosenInlineResult";
import { IInlineQuery } from "../inlineMode/iInlineQuery";
import { IPreCheckoutQuery } from "../payments/iPreCheckoutQuery";
import { IShippingQuery } from "../payments/iShippingQuery";
import { ICallbackQuery } from "../types/iCallbackQuery";
import { IMessage } from "../types/iMessage";
import { IPoll } from "../types/iPoll";

export interface IUpdate {
  callback_query?: ICallbackQuery;
  channel_post?: IMessage;
  chosen_inline_result?: IChosenInlineResult;
  edited_channel_post?: IMessage;
  edited_message?: IMessage;
  inline_query?: IInlineQuery;
  message?: IMessage;
  pre_checkout_query?: IPreCheckoutQuery;
  poll?: IPoll;
  shipping_query?: IShippingQuery;
  update_id: number;
}