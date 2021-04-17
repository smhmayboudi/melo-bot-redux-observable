import { IMessage } from "../../types/telegramBot/types/iMessage";
import { handleEditedChannelPostCaption } from "./telegramBotHandleEditedChannelPostCaption";

describe("telegramBotHandleEditedChannelPostCaption configs", (): void => {
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
    handleEditedChannelPostCaption(store, message);
    expect(store.dispatch).toHaveBeenCalled();
  });
});
