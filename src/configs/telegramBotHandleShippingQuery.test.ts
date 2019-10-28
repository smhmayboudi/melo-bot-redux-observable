import { IShippingQuery } from "../../types/telegramBot/payments/iShippingQuery";

import { handleShippingQuery } from "./telegramBotHandleShippingQuery";

describe("telegramBotHandleShippingQuery configs", (): void => {
  const store: any = {
    dispatch: jest.fn(() => {}),
    getState: jest.fn(() => {}),
    replaceReducer: jest.fn(() => {}),
    subscribe: jest.fn(() => jest.fn(() => {}))
  };

  test("should handle", (): void => {
    const shippingQuery: IShippingQuery = {
      from: {
        first_name: "",
        id: 0,
        is_bot: false
      },
      id: "",
      invoice_payload: "",
      shipping_address: {
        city: "",
        country_code: "",
        post_code: "",
        state: "",
        street_line1: "",
        street_line2: ""
      }
    };
    expect(handleShippingQuery(store, shippingQuery)).toHaveBeenCalled();
  });
});
