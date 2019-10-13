import { IInlineQueryResult } from "./iInlineQueryResult";
import { IInputMessageContent } from "./iInputMessageContent";

export interface IInlineQueryResultAudio extends IInlineQueryResult {
  audio_duration?: number;
  audio_url: string;
  caption?: string;
  input_message_content?: IInputMessageContent;
  parse_mode?: string;
  performer?: string;
  title: string;
}