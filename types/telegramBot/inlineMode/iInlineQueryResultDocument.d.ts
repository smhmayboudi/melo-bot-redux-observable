import { IInlineQueryResult } from "../inlineMode/iInlineQueryResult";
import { IInputMessageContent } from "../inlineMode/iInputMessageContent";

export interface IInlineQueryResultDocument extends IInlineQueryResult {
  caption?: string;
  description?: string;
  document_url: string;
  input_message_content?: IInputMessageContent;
  mime_type: string;
  parse_mode?: string;
  thumb_height?: number;
  thumb_url?: string;
  thumb_width?: number;
  title: string;
}