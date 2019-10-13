import { IInlineQueryResult } from "./iInlineQueryResult";
import { IInlineKeyboardMarkup } from "../types/iInlineKeyboardMarkup";

export interface IInlineQueryResultGame extends IInlineQueryResult {
  game_short_name: string;
}