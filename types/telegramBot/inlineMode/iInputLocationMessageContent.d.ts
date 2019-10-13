import { IInputMessageContent } from "./iInputMessageContent";

export interface IInputLocationMessageContent extends IInputMessageContent {
  latitude: number;
  live_period?: number;
  longitude: number;
}