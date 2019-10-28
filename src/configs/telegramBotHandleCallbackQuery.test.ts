import { ICallbackQuery } from "../../types/telegramBot/types/iCallbackQuery";

import { handleCallbackQuery } from "./telegramBotHandleCallbackQuery";

describe("telegramBotHandleCallbackQuery configs", (): void => {
  const store: any = {
    dispatch: jest.fn(() => {}),
    getState: jest.fn(() => {}),
    replaceReducer: jest.fn(() => {}),
    subscribe: jest.fn(() => jest.fn(() => {}))
  };

  test("should handle", (): void => {
    const callbackQuery: ICallbackQuery = {
      chat_instance: "",
      from: {
        first_name: "",
        id: 0,
        is_bot: false
      },
      id: ""
    };
    expect(handleCallbackQuery(store, callbackQuery)).toHaveBeenCalled();
  });
});
