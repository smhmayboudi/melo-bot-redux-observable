import { IOrderInfo } from "./iOrderInfo";

export interface ISuccessfulPayment {
  currency: string;
  invoice_payload: string;
  order_info?: IOrderInfo;
  provider_payment_charge_id: string;
  shipping_option_id?: string;
  telegram_payment_charge_id: string;
  total_amount: number;
}
