import { IInlineQueryResult } from "../inlineMode/iInlineQueryResult";
import { IInputMessageContent } from "../inlineMode/iInputMessageContent";

export interface IInlineQueryResult extends IInlineQueryResult {
  caption?: string;
  input_message_content?: IInputMessageContent;
  parse_mode?: string;
  title: string;
  voice_duration?: number;
  voice_url: string;
}