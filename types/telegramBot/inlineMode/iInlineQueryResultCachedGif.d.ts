import { IInlineQueryResult } from "../inlineMode/iInlineQueryResult";
import { IInputMessageContent } from "../inlineMode/iInputMessageContent";

export interface IInlineQueryResultCachedGif extends IInlineQueryResult {
  caption?: string;
  gif_file_id: string;
  input_message_content?: IInputMessageContent;
  parse_mode?: string;
  title?: string;
}