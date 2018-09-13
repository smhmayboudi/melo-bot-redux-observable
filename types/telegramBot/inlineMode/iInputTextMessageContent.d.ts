import { IInputMessageContent } from "../inlineMode/iInputMessageContent";

export interface IInputTextMessageContent extends IInputMessageContent {
  disable_web_page_preview?: boolean;
  message_text: string;
  parse_mode?: string;
}