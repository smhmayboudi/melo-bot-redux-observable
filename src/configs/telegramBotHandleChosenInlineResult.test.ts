import { ILocale } from "../../types/iLocale";
import { IChosenInlineResult } from "../../types/telegramBot/inlineMode/iChosenInlineResult";
import { locale } from "../utils/string";
import { handleChosenInlineResult } from "./telegramBotHandleChosenInlineResult";

describe("telegramBotHandleChosenInlineResult configs", (): void => {
  const store: any = {
    dispatch: jest.fn(() => ({})),
    getState: jest.fn(() => ({})),
    replaceReducer: jest.fn(() => ({})),
    subscribe: jest.fn(() => jest.fn(() => ({})))
  };

  const chosenInlineResult: IChosenInlineResult = {
    from: {
      first_name: "",
      id: 0,
      is_bot: false,
      language_code: "en"
    },
    query: "",
    result_id: ""
  };

  let locales: ILocale;

  beforeAll(
    async (): Promise<void> => {
      locales = await locale("en");
    }
  );

  test("should handle", (): void => {
    handleChosenInlineResult(locales, store, chosenInlineResult);
    expect(store.dispatch).toHaveBeenCalled();
  });
});
