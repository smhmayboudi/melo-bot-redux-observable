import { IInlineKeyboardMarkup } from "../types/iInlineKeyboardMarkup";
import { IInlineQueryResult } from "./iInlineQueryResult";
import { IInputMessageContent } from "./iInputMessageContent";

export interface IInlineQueryResultGif extends IInlineQueryResult {
  caption?: string;
  gif_duration?: number;
  gif_height?: number;
  gif_url: string;
  gif_width?: number;
  input_message_content?: IInputMessageContent;
  parse_mode?: string;
  reply_markup?: IInlineKeyboardMarkup;
  thumb_url: string;
}
