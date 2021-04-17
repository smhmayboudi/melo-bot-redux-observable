import { IShippingAddress } from "./iShippingAddress";

export interface IOrderInfo {
  email?: string;
  name?: string;
  phone_number?: string;
  shipping_address?: IShippingAddress;
}
