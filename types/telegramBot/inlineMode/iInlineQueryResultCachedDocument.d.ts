import { IInlineQueryResult } from "./iInlineQueryResult";
import { IInputMessageContent } from "./iInputMessageContent";

export interface IInlineQueryResultCachedDocument extends IInlineQueryResult {
  caption?: string;
  description?: string;
  document_file_id: string;
  input_message_content?: IInputMessageContent;
  parse_mode?: string;
  title: string;
}
