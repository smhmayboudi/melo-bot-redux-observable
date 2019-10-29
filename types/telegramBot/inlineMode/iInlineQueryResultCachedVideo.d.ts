import { IInlineQueryResult } from "./iInlineQueryResult";
import { IInputMessageContent } from "./iInputMessageContent";

export interface IInlineQueryResultCachedVideo extends IInlineQueryResult {
  caption?: string;
  description?: string;
  input_message_content?: IInputMessageContent;
  parse_mode?: string;
  title: string;
  video_file_id: string;
}
