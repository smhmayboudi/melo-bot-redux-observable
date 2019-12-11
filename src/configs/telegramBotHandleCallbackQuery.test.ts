import { ILocale } from "../../types/iLocale";
import { ICallbackQuery } from "../../types/telegramBot/types/iCallbackQuery";
import { locale } from "../utils/string";
import { handleCallbackQuery } from "./telegramBotHandleCallbackQuery";

describe("telegramBotHandleCallbackQuery configs", (): void => {
  const locales: ILocale = locale("en");
  const store: any = {
    dispatch: jest.fn(() => ({})),
    getState: jest.fn(() => ({})),
    replaceReducer: jest.fn(() => ({})),
    subscribe: jest.fn(() => jest.fn(() => ({})))
  };

  const callbackQuery: ICallbackQuery = {
    chat_instance: "",
    data: "",
    from: {
      first_name: "",
      id: 0,
      is_bot: false,
      language_code: "en"
    },
    id: "",
    inline_message_id: "",
    message: {
      chat: {
        id: 0,
        type: ""
      },
      date: 0,
      message_id: 0
    }
  };

  test("should handle data, inline_message_id undefined", (): void => {
    handleCallbackQuery(locales, store, {
      ...callbackQuery,
      data: undefined,
      inline_message_id: undefined
    });
    expect(store.dispatch).toHaveBeenCalled();
  });

  test("should handle inline_message_id undefined", (): void => {
    handleCallbackQuery(locales, store, {
      ...callbackQuery,
      inline_message_id: undefined
    });
    expect(store.dispatch).toHaveBeenCalled();
  });

  test("should handle message undefined", (): void => {
    handleCallbackQuery(locales, store, {
      ...callbackQuery,
      message: undefined
    });
    expect(store.dispatch).toHaveBeenCalled();
  });
});
