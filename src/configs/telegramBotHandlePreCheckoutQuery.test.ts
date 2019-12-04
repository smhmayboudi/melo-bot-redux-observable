import { IPreCheckoutQuery } from "../../types/telegramBot/payments/iPreCheckoutQuery";

import { handlePreCheckoutQuery } from "./telegramBotHandlePreCheckoutQuery";

describe("telegramBotHandlePreCheckoutQuery configs", (): void => {
  const store: any = {
    dispatch: jest.fn(() => ({})),
    getState: jest.fn(() => ({})),
    replaceReducer: jest.fn(() => ({})),
    subscribe: jest.fn(() => jest.fn(() => ({})))
  };

  test("should handle", (): void => {
    const shippingQuery: IPreCheckoutQuery = {
      currency: "",
      from: {
        first_name: "",
        id: 0,
        is_bot: false
      },
      id: "",
      invoice_payload: "",
      total_amount: 0
    };
    handlePreCheckoutQuery(store, shippingQuery);
    expect(store.dispatch).toHaveBeenCalled();
  });
});
