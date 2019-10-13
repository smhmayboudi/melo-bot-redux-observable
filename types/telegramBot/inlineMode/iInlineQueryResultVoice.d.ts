import { IInlineQueryResult } from "./iInlineQueryResult";
import { IInputMessageContent } from "./iInputMessageContent";

export interface IInlineQueryResult extends IInlineQueryResult {
  caption?: string;
  input_message_content?: IInputMessageContent;
  parse_mode?: string;
  title: string;
  voice_duration?: number;
  voice_url: string;
}