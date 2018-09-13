import { IInlineQueryResult } from "../inlineMode/iInlineQueryResult";
import { IInlineKeyboardMarkup } from "../types/iInlineKeyboardMarkup";

export interface IInlineQueryResultGame extends IInlineQueryResult {
  game_short_name: string;
  id: string;
  reply_markup?: IInlineKeyboardMarkup;
  type: string;
}