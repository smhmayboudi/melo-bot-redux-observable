import { IInlineQuery } from "../inlineMode/iInlineQuery";

export interface IInlineQueryResultLocation extends IInlineQuery {
  latitude: number;
  live_period?: number;
  longitude: number;
  thumb_height?: number;
  thumb_url?: string;
  thumb_width?: number;
}
