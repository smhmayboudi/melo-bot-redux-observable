import { ILocale } from "../../types/iLocale";
import { IInlineQuery } from "../../types/telegramBot/inlineMode/iInlineQuery";
import { locale } from "../utils/string";
import { handleInlineQuery } from "./telegramBotHandleInlineQuery";

describe("telegramBotHandleInlineQuery configs", (): void => {
  const locales: ILocale = locale("en");
  const store: any = {
    dispatch: jest.fn(() => ({})),
    getState: jest.fn(() => ({})),
    replaceReducer: jest.fn(() => ({})),
    subscribe: jest.fn(() => jest.fn(() => ({})))
  };

  test("should handle", (): void => {
    const inlineQuery: IInlineQuery = {
      from: {
        first_name: "",
        id: 0,
        is_bot: false,
        language_code: "en"
      },
      id: "",
      offset: "",
      query: ""
    };
    handleInlineQuery(locales, store, inlineQuery);
    expect(store.dispatch).toHaveBeenCalled();
  });
});
