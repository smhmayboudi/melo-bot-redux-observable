import { ILocation } from "../types/iLocation";
import { IUser } from "../types/iUser";

export interface IInlineQuery {
  from: IUser;
  id: string;
  location?: ILocation;
  offset: string;
  query: string;
}
