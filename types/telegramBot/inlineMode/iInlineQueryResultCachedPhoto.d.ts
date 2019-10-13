import { IInlineQueryResult } from "./iInlineQueryResult";
import { IInputMessageContent } from "./iInputMessageContent";

export interface IInlineQueryResult extends IInlineQueryResult {
  caption?: string;
  description?: string;
  input_message_content?: IInputMessageContent;
  parse_mode?: string;
  photo_file_id: string;
  title?: string;
}