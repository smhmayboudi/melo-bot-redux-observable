import { IInlineQueryResult } from "./iInlineQueryResult";
import { IInputMessageContent } from "./iInputMessageContent";

export interface IInlineQueryResultVideo extends IInlineQueryResult {
  caption?: string;
  description?: string;
  input_message_content?: IInputMessageContent;
  mime_type: string;
  parse_mode?: string;
  thumb_url: string;
  video_duration?: number;
  video_height?: number;
  video_url: string;
  video_width?: number;
  title: string;
}
