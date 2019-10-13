import { IInputMessageContent } from "./iInputMessageContent";

export interface IInputVenueMessageContent extends IInputMessageContent {
  address: string;
  foursquare_id?: string;
  foursquare_type?: string;
  latitude: number;
  longitude: number;
  title: string;
}