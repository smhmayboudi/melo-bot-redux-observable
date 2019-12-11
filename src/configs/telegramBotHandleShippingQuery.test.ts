import { ILocale } from "../../types/iLocale";
import { IShippingQuery } from "../../types/telegramBot/payments/iShippingQuery";
import { locale } from "../utils/string";
import { handleShippingQuery } from "./telegramBotHandleShippingQuery";

describe("telegramBotHandleShippingQuery configs", (): void => {
  const locales: ILocale = locale("en");
  const store: any = {
    dispatch: jest.fn(() => ({})),
    getState: jest.fn(() => ({})),
    replaceReducer: jest.fn(() => ({})),
    subscribe: jest.fn(() => jest.fn(() => ({})))
  };

  test("should handle", (): void => {
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
    handleShippingQuery(locales, store, shippingQuery);
    expect(store.dispatch).toHaveBeenCalled();
  });
});
