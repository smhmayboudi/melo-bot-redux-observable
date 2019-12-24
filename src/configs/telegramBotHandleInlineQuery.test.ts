import { ILocale } from "../../types/iLocale";
import { IInlineQuery } from "../../types/telegramBot/inlineMode/iInlineQuery";
import { locale } from "../utils/string";
import { handleInlineQuery } from "./telegramBotHandleInlineQuery";

describe("telegramBotHandleInlineQuery configs", (): void => {
  const store: any = {
    dispatch: jest.fn(() => ({})),
    getState: jest.fn(() => ({})),
    replaceReducer: jest.fn(() => ({})),
    subscribe: jest.fn(() => jest.fn(() => ({})))
  };

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

  let locales: ILocale;

  beforeAll(
    async (): Promise<void> => {
      locales = await locale("en");
    }
  );
  test("should handle", (): void => {
    handleInlineQuery(locales, store, inlineQuery);
    expect(store.dispatch).toHaveBeenCalled();
  });
});
