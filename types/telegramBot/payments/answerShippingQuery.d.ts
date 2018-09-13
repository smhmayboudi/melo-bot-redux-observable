import { IShippingOption } from "../payments/iShippingOption"

export interface answerShippingQuery {
  (
    error_message: string,
    ok: boolean,
    shipping_options: IShippingOption[],
    shipping_query_id: string
  ): boolean
}