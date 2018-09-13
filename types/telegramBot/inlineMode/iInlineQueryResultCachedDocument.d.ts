import { IInlineQueryResult } from "../inlineMode/iInlineQueryResult";
import { IInputMessageContent } from "../inlineMode/iInputMessageContent";

export interface IInlineQueryResultCachedDocument extends IInlineQueryResult {
  caption?: string;
  description?: string;
  document_file_id: string;
  input_message_content?: IInputMessageContent;
  parse_mode?: string;
  title: string;
}