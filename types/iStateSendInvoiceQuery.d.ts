import { ILabeledPrice } from "./telegramBot/payments/iLabeledPrice";
import { IInlineKeyboardMarkup } from "./telegramBot/types/iInlineKeyboardMarkup";

export interface IStateSendInvoiceQuery {
  chat_id: number;
  currency: string;
  description: string;
  disable_notification?: boolean;
  is_flexible?: boolean;
  need_email?: boolean;
  need_name?: boolean;
  need_phone_number?: boolean;
  need_shipping_address?: boolean;
  payload: string;
  photo_height?: number;
  photo_size?: number;
  photo_url?: string;
  photo_width?: number;
  prices: ILabeledPrice[];
  provider_data?: string;
  provider_token: string;
  reply_markup?: IInlineKeyboardMarkup;
  reply_to_message_id?: number;
  send_email_to_provider?: boolean;
  send_phone_number_to_provider?: boolean;
  start_parameter: string;
  title: string;
}
