import { ILocale } from "../../types/iLocale";
import { IMessage } from "../../types/telegramBot/types/iMessage";
import { locale } from "../utils/string";
import { handleEditedMessageCaption } from "./telegramBotHandleEditedMessageCaption";

describe("telegramBotHandleEditedMessageCaption configs", (): void => {
  const store: any = {
    dispatch: jest.fn(() => ({})),
    getState: jest.fn(() => ({})),
    replaceReducer: jest.fn(() => ({})),
    subscribe: jest.fn(() => jest.fn(() => ({})))
  };

  const message: IMessage = {
    chat: {
      id: 0,
      type: ""
    },
    date: 0,
    message_id: 0
  };

  let locales: ILocale;

  beforeAll(
    async (): Promise<void> => {
      locales = await locale("en");
    }
  );

  test("should handle", (): void => {
    handleEditedMessageCaption(locales, store, message);
    expect(store.dispatch).toHaveBeenCalled();
  });
});
