import { IShippingOption } from "./iShippingOption";

export interface AnswerShippingQuery {
  (
    error_message: string,
    ok: boolean,
    shipping_options: IShippingOption[],
    shipping_query_id: string
  ): boolean;
}
