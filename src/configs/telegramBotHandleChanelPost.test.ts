import { IMessage } from "../../types/telegramBot/types/iMessage";

import { handleChanelPost } from "./telegramBotHandleChanelPost";

describe("telegramBotHandleChanelPost configs", (): void => {
  const store: any = {
    dispatch: jest.fn(() => {}),
    getState: jest.fn(() => {}),
    replaceReducer: jest.fn(() => {}),
    subscribe: jest.fn(() => () => {})
  };

  test("should handle", (): void => {
    const message: IMessage = {
      chat: {
        id: 0,
        type: "private"
      },
      date: 0,
      message_id: 0
    };
    expect(handleChanelPost(store, message)).toHaveBeenCalled();
  });
});
