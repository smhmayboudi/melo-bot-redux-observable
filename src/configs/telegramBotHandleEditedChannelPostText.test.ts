import { IMessage } from "../../types/telegramBot/types/iMessage";
import { handleEditedChannelPostText } from "./telegramBotHandleEditedChannelPostText";

describe("telegramBotHandleEditedChannelPostText configs", (): void => {
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

  test("should handle", (): void => {
    handleEditedChannelPostText(store, message);
    expect(store.dispatch).toHaveBeenCalled();
  });
});
