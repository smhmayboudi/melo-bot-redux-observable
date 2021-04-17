import { IOrderInfo } from "./iOrderInfo";
import { IUser } from "../types/iUser";

export interface IPreCheckoutQuery {
  currency: string;
  from: IUser;
  id: string;
  invoice_payload: string;
  order_info?: IOrderInfo;
  shipping_option_id?: string;
  total_amount: number;
}
