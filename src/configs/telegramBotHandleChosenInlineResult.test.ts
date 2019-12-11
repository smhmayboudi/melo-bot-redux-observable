import { ILocale } from "../../types/iLocale";
import { IChosenInlineResult } from "../../types/telegramBot/inlineMode/iChosenInlineResult";
import { locale } from "../utils/string";
import { handleChosenInlineResult } from "./telegramBotHandleChosenInlineResult";

describe("telegramBotHandleChosenInlineResult configs", (): void => {
  const locales: ILocale = locale("en");
  const store: any = {
    dispatch: jest.fn(() => ({})),
    getState: jest.fn(() => ({})),
    replaceReducer: jest.fn(() => ({})),
    subscribe: jest.fn(() => jest.fn(() => ({})))
  };

  test("should handle", (): void => {
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
    handleChosenInlineResult(locales, store, chosenInlineResult);
    expect(store.dispatch).toHaveBeenCalled();
  });
});
