import { IMessage } from "../../types/telegramBot/types/iMessage";

import { handleEditedMessage } from "./telegramBotHandleEditedMessage";
import { ILocale } from "../../types/iLocale";
import { locale } from "../utils/string";

describe("telegramBotHandleEditedMessage configs", (): void => {
  const locales: ILocale = locale("en");
  const store: any = {
    dispatch: jest.fn(() => ({})),
    getState: jest.fn(() => ({})),
    replaceReducer: jest.fn(() => ({})),
    subscribe: jest.fn(() => jest.fn(() => ({})))
  };

  test("should handle", (): void => {
    const message: IMessage = {
      chat: {
        id: 0,
        type: ""
      },
      date: 0,
      message_id: 0
    };
    handleEditedMessage(locales, store, message);
    expect(store.dispatch).toHaveBeenCalled();
  });
});
