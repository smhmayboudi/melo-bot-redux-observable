import { IInlineQueryResult } from "../inlineMode/iInlineQueryResult";
import { IInputMessageContent } from "../inlineMode/iInputMessageContent";

export interface IInlineQueryResultVenue extends IInlineQueryResult {
  address: string;
  foursquare_id?: string;
  foursquare_type?: string;
  input_message_content?: IInputMessageContent;
  latitude: number;
  longitude: number;
  thumb_height?: number;
  thumb_url?: string;
  thumb_width?: number;
  title: string;
}