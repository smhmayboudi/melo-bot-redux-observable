import { IInlineKeyboardMarkup } from "../types/iInlineKeyboardMarkup";

export interface IInlineQueryResult {
  id: string;
  reply_markup?: IInlineKeyboardMarkup;
  type: string;
}
