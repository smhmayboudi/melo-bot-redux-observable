import { ILocation } from "../types/iLocation";
import { IUser } from "../types/iUser";

export interface IChosenInlineResult {
  from: IUser;
  inline_message_id?: string;
  location?: ILocation;
  query: string;
  result_id: string;
}