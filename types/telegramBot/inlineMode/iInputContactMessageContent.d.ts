import { IInputMessageContent } from "./iInputMessageContent";

export interface IInputContactMessageContent extends IInputMessageContent {
  first_name: string;
  last_name?: string;
  phone_number: string;
  vcard?: string;
}
