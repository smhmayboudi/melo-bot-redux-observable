import { IInlineQueryResult } from "../inlineMode/iInlineQueryResult";
import { IInputMessageContent } from "../inlineMode/iInputMessageContent";

export interface IInlineQueryResultCachedVoice extends IInlineQueryResult {
  caption?: string;
  input_message_content?: IInputMessageContent;
  parse_mode?: string;
  title: string;
  voice_file_id: string;
}