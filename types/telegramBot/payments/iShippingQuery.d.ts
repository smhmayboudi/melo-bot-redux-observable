import { IShippingAddress } from "./iShippingAddress";
import { IUser } from "../types/iUser";

export interface IShippingQuery {
  from: IUser;
  id: string;
  invoice_payload: string;
  shipping_address: IShippingAddress;
}
