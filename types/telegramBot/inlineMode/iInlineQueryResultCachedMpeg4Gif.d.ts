import { IInlineQueryResult } from "./iInlineQueryResult";
import { IInputMessageContent } from "./iInputMessageContent";

export interface IInlineQueryResultCachedMpeg4Gif extends IInlineQueryResult {
  caption?: string;
  input_message_content?: IInputMessageContent;
  mpeg4_file_id: string;
  parse_mode?: string;
  title?: string;
}