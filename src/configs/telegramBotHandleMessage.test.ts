import { IMessage } from "../../types/telegramBot/types/iMessage";
import * as command from "../utils/command";
import { handleMessage } from "./telegramBotHandleMessage";

describe("telegramBotHandleMessage configs", (): void => {
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

  test("should handle messageText help", (): void => {
    handleMessage(store, {
      ...message,
      text: command.help()
    });
    expect(store.dispatch).toHaveBeenCalled();
  });

  test("should handle messageText setInlineGeo", (): void => {
    handleMessage(store, {
      ...message,
      text: command.setInlineGeo()
    });
    expect(store.dispatch).toHaveBeenCalled();
  });

  test("should handle messageText settings", (): void => {
    handleMessage(store, {
      ...message,
      text: command.settings()
    });
    expect(store.dispatch).toHaveBeenCalled();
  });

  test("should handle messageText shortenList", (): void => {
    handleMessage(store, {
      ...message,
      text: command.shortenList()
    });
    expect(store.dispatch).toHaveBeenCalled();
  });

  test("should handle messageText shortenReset", (): void => {
    handleMessage(store, {
      ...message,
      text: command.shortenReset()
    });
    expect(store.dispatch).toHaveBeenCalled();
  });

  test("should handle messageText start", (): void => {
    handleMessage(store, {
      ...message,
      text: command.start()
    });
    expect(store.dispatch).toHaveBeenCalled();
  });

  test("should handle messageText startGroup", (): void => {
    handleMessage(store, {
      ...message,
      text: command.startGroup()
    });
    expect(store.dispatch).toHaveBeenCalled();
  });

  test("should handle youtubeDownload", (): void => {
    handleMessage(store, {
      ...message,
      text: command.youtubeDownload()
    });
    expect(store.dispatch).toHaveBeenCalled();
  });

  test("should handle youtubeSearchListByQ", (): void => {
    handleMessage(store, {
      ...message,
      text: command.youtubeSearchListByQ()
    });
    expect(store.dispatch).toHaveBeenCalled();
  });

  test("should handle messageText youtubeSearchListByRelatedToVideoId", (): void => {
    handleMessage(store, {
      ...message,
      text: command.youtubeSearchListByRelatedToVideoId()
    });
    expect(store.dispatch).toHaveBeenCalled();
  });

  test("should handle youtubeVideoList", (): void => {
    handleMessage(store, {
      ...message,
      text: command.youtubeVideoList()
    });
    expect(store.dispatch).toHaveBeenCalled();
  });

  test("should handle messageText not undefined", (): void => {
    handleMessage(store, {
      ...message,
      text: ""
    });
    expect(store.dispatch).toHaveBeenCalled();
  });

  test("should handle messageText undefined", (): void => {
    handleMessage(store, {
      ...message,
      text: undefined
    });
    expect(store.dispatch).toHaveBeenCalled();
  });
});
