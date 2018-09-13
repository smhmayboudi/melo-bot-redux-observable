import { IInputMessageContent } from "../inlineMode/iInputMessageContent";

export interface IInputLocationMessageContent extends IInputMessageContent {
  latitude: number;
  live_period?: number;
  longitude: number;
}