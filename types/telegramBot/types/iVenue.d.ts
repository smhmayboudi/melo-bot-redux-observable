import { ILocation } from "./iLocation";

export interface IVenue {
  address: string;
  foursquare_id?: string;
  foursquare_type?: string;
  location: ILocation;
  title: string;
}