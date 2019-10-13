import { IInlineQueryResult } from "./iInlineQueryResult";
import { IInputMessageContent } from "./iInputMessageContent";

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