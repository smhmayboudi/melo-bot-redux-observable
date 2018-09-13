import { IInlineQueryResult } from "../inlineMode/iInlineQueryResult";
import { IInputMessageContent } from "../inlineMode/iInputMessageContent";

export interface IInlineQueryResult extends IInlineQueryResult {
  first_name: string;
  input_message_content?: IInputMessageContent;
  last_name?: string;
  phone_number: string;
  thumb_height?: number;
  thumb_url?: string;
  thumb_width?: number;
  vcard?: string;
}