import { IInlineQueryResult } from "./iInlineQueryResult";
import { IInputMessageContent } from "./iInputMessageContent";

export interface IInlineQueryResultCachedVoice extends IInlineQueryResult {
  caption?: string;
  input_message_content?: IInputMessageContent;
  parse_mode?: string;
  title: string;
  voice_file_id: string;
}
