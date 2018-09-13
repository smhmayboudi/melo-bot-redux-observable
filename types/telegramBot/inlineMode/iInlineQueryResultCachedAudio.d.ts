import { IInlineQueryResult } from "../inlineMode/iInlineQueryResult";
import { IInputMessageContent } from "../inlineMode/iInputMessageContent";

export interface IInlineQueryResultCachedAudio extends IInlineQueryResult {
  audio_file_id: string;
  caption?: string;
  input_message_content?: IInputMessageContent;
  parse_mode?: string;
}