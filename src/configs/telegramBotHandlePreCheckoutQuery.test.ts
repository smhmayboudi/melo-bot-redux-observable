import { ILocale } from "../../types/iLocale";
import { IPreCheckoutQuery } from "../../types/telegramBot/payments/iPreCheckoutQuery";
import { locale } from "../utils/string";
import { handlePreCheckoutQuery } from "./telegramBotHandlePreCheckoutQuery";

describe("telegramBotHandlePreCheckoutQuery configs", (): void => {
  const store: any = {
    dispatch: jest.fn(() => ({})),
    getState: jest.fn(() => ({})),
    replaceReducer: jest.fn(() => ({})),
    subscribe: jest.fn(() => jest.fn(() => ({})))
  };

  const shippingQuery: IPreCheckoutQuery = {
    currency: "",
    from: {
      first_name: "",
      id: 0,
      is_bot: false,
      language_code: "en"
    },
    id: "",
    invoice_payload: "",
    total_amount: 0
  };

  let locales: ILocale;

  beforeAll(
    async (): Promise<void> => {
      locales = await locale("en");
    }
  );

  test("should handle", (): void => {
    handlePreCheckoutQuery(locales, store, shippingQuery);
    expect(store.dispatch).toHaveBeenCalled();
  });
});
