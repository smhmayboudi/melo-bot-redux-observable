import { IInlineQueryResult } from "./iInlineQueryResult";
import { IInputMessageContent } from "./iInputMessageContent";

export interface IInlineQueryResultPhoto extends IInlineQueryResult {
  caption?: string;
  description?: string;
  input_message_content?: IInputMessageContent;
  parse_mode?: string;
  photo_height?: number;
  photo_url: string;
  photo_width?: number;
  thumb_url: string;
  title: string;
}
