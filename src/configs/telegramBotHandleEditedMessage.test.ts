import { IMessage } from "../../types/telegramBot/types/iMessage";

import { handleEditedMessage } from "./telegramBotHandleEditedMessage";

describe("telegramBotHandleEditedMessage configs", (): void => {
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
    handleEditedMessage(store, message);
    expect(store.dispatch).toHaveBeenCalled();
  });
});
