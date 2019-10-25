import { IMessage } from "../../types/telegramBot/types/iMessage";

import { handleEditedChannelPostText } from "./telegramBotHandleEditedChannelPostText";

describe("telegramBotHandleEditedChannelPostText configs", (): void => {
  const store: any = {
    dispatch: jest.fn(() => {}),
    getState: jest.fn(() => {}),
    subscribe: jest.fn(() => () => {}),
    replaceReducer: jest.fn(() => {})
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
    expect(handleEditedChannelPostText(store, message)).toHaveBeenCalled();
  });
});