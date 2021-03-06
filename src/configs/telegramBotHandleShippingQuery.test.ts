import { IShippingQuery } from "../../types/telegramBot/payments/iShippingQuery";
import { handleShippingQuery } from "./telegramBotHandleShippingQuery";

describe("telegramBotHandleShippingQuery configs", (): void => {
  const store: any = {
    dispatch: jest.fn(() => ({})),
    getState: jest.fn(() => ({})),
    replaceReducer: jest.fn(() => ({})),
    subscribe: jest.fn(() => jest.fn(() => ({})))
  };

  const shippingQuery: IShippingQuery = {
    from: {
      first_name: "",
      id: 0,
      is_bot: false,
      language_code: "en"
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

  test("should handle", (): void => {
    handleShippingQuery(store, shippingQuery);
    expect(store.dispatch).toHaveBeenCalled();
  });
});
