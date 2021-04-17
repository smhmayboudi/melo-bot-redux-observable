import { IShippingOption } from "./telegramBot/payments/iShippingOption";

export interface IStateAnswerShippingQueryQuery {
  error_message: string;
  ok: boolean;
  shipping_options: IShippingOption[];
  shipping_query_id: string;
}
