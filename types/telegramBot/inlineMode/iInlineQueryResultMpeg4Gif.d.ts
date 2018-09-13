import { IInlineQueryResult } from "../inlineMode/iInlineQueryResult";
import { IInputMessageContent } from "../inlineMode/iInputMessageContent";

export interface IInlineQueryResultMpeg4Gif extends IInlineQueryResult {
  caption?: string;
  input_message_content?: IInputMessageContent;
  mpeg4_duration?: number;
  mpeg4_height?: number;
  mpeg4_url: string;
  mpeg4_width?: number;
  parse_mode?: string;
  thumb_url: string;
  title: string;
}