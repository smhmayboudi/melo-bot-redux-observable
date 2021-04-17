import { IInlineQueryResult } from "./iInlineQueryResult";
import { IInputMessageContent } from "./iInputMessageContent";

export interface IInlineQueryResultLocation extends IInlineQueryResult {
  input_message_content?: IInputMessageContent;
  latitude: number;
  live_period?: number;
  longitude: number;
  thumb_height?: number;
  thumb_url?: string;
  thumb_width?: number;
  title: string;
}
