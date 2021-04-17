import { IInlineQueryResult } from "./iInlineQueryResult";
import { IInputMessageContent } from "./iInputMessageContent";

export interface IInlineQueryResultArticle extends IInlineQueryResult {
  description?: string;
  hide_url?: boolean;
  input_message_content: IInputMessageContent;
  thumb_height?: number;
  thumb_url?: string;
  thumb_width?: number;
  title: string;
  url?: string;
}
