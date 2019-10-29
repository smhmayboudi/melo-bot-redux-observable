import { IInlineQueryResult } from "./iInlineQueryResult";
import { IInputMessageContent } from "./iInputMessageContent";

export interface IInlineQueryResultCachedAudio extends IInlineQueryResult {
  audio_file_id: string;
  caption?: string;
  input_message_content?: IInputMessageContent;
  parse_mode?: string;
}
