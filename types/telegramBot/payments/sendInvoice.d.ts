import { ILabeledPrice } from "./iLabeledPrice";
import { IInlineKeyboardMarkup } from "../types/iInlineKeyboardMarkup";
import { IMessage } from "../types/iMessage";

export interface sendInvoice {
  (
    chat_id: number,
    currency: string,
    description: string,
    payload: string,
    prices: ILabeledPrice[],
    provider_token: string,
    start_parameter: string,
    title: string,
    disable_notification?: boolean,
    is_flexible?: boolean,
    need_email?: boolean,
    need_name?: boolean,
    need_phone_number?: boolean,
    need_shipping_address?: boolean,
    photo_height?: number,
    photo_size?: number,
    photo_url?: string,
    photo_width?: number,
    provider_data?: string,
    reply_markup?: IInlineKeyboardMarkup,
    reply_to_message_id?: number,
    send_email_to_provider?: boolean,
    send_phone_number_to_provider?: boolean,
  ): IMessage
}