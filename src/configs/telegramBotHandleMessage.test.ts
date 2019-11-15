import * as texts from "./texts";

import { IMessage } from "../../types/telegramBot/types/iMessage";
import { handleMessage } from "./telegramBotHandleMessage";

describe("telegramBotHandleMessage configs", (): void => {
  const store: any = {
    dispatch: jest.fn(() => {}),
    getState: jest.fn(() => {}),
    replaceReducer: jest.fn(() => {}),
    subscribe: jest.fn(() => jest.fn(() => {}))
  };

  const message: IMessage = {
    chat: {
      id: 0,
      type: ""
    },
    date: 0,
    message_id: 0
  };

  test("should handle addStickerToSet", (): void => {
    handleMessage(store, {
      ...message,
      text: "/addStickerToSet"
    });
    expect(store.dispatch).toHaveBeenCalled();
  });

  test("should handle createNewStickerSet", (): void => {
    handleMessage(store, {
      ...message,
      text: "/createNewStickerSet"
    });
    expect(store.dispatch).toHaveBeenCalled();
  });

  test("should handle getChatMember", (): void => {
    handleMessage(store, {
      ...message,
      text: "/getChatMember"
    });
    expect(store.dispatch).toHaveBeenCalled();
  });

  test("should handle sendAnimation", (): void => {
    handleMessage(store, {
      ...message,
      text: "/sendAnimation"
    });
    expect(store.dispatch).toHaveBeenCalled();
  });

  test("should handle sendAudio", (): void => {
    handleMessage(store, {
      ...message,
      text: "/sendAudio"
    });
    expect(store.dispatch).toHaveBeenCalled();
  });

  test("should handle sendDocument", (): void => {
    handleMessage(store, {
      ...message,
      text: "/sendDocument"
    });
    expect(store.dispatch).toHaveBeenCalled();
  });

  test("should handle sendMediaGroup", (): void => {
    handleMessage(store, {
      ...message,
      text: "/sendMediaGroup"
    });
    expect(store.dispatch).toHaveBeenCalled();
  });

  test("should handle sendMessage", (): void => {
    handleMessage(store, {
      ...message,
      text: "/sendMessage"
    });
    expect(store.dispatch).toHaveBeenCalled();
  });

  test("should handle sendPhoto", (): void => {
    handleMessage(store, {
      ...message,
      text: "/sendPhoto"
    });
    expect(store.dispatch).toHaveBeenCalled();
  });

  test("should handle sendSticker", (): void => {
    handleMessage(store, {
      ...message,
      text: "/sendSticker"
    });
    expect(store.dispatch).toHaveBeenCalled();
  });

  test("should handle sendVideo", (): void => {
    handleMessage(store, {
      ...message,
      text: "/sendVideo"
    });
    expect(store.dispatch).toHaveBeenCalled();
  });

  test("should handle sendVideoNote", (): void => {
    handleMessage(store, {
      ...message,
      text: "/sendVideoNote"
    });
    expect(store.dispatch).toHaveBeenCalled();
  });

  test("should handle sendVoice", (): void => {
    handleMessage(store, {
      ...message,
      text: "/sendVoice"
    });
    expect(store.dispatch).toHaveBeenCalled();
  });

  test("should handle youtubeDownload", (): void => {
    handleMessage(store, {
      ...message,
      text: "/youtubeDownload"
    });
    expect(store.dispatch).toHaveBeenCalled();
  });

  test("should handle youtubeSearchList", (): void => {
    handleMessage(store, {
      ...message,
      text: "/youtubeSearchList"
    });
    expect(store.dispatch).toHaveBeenCalled();
  });

  test("should handle youtubeVideoList", (): void => {
    handleMessage(store, {
      ...message,
      text: "/youtubeVideoList"
    });
    expect(store.dispatch).toHaveBeenCalled();
  });

  test("should handle messageText /start", (): void => {
    handleMessage(store, {
      ...message,
      text: `/${texts.commandStart}`
    });
    expect(store.dispatch).toHaveBeenCalled();
  });

  test("should handle messageText /help", (): void => {
    handleMessage(store, {
      ...message,
      text: `/${texts.commandHelp}`
    });
    expect(store.dispatch).toHaveBeenCalled();
  });

  test("should handle messageText /settings", (): void => {
    handleMessage(store, {
      ...message,
      text: `/${texts.commandSettings}`
    });
    expect(store.dispatch).toHaveBeenCalled();
  });

  test("should handle messageText /setInlineGeo", (): void => {
    handleMessage(store, {
      ...message,
      text: `/${texts.commandSetInlineGeo}`
    });
    expect(store.dispatch).toHaveBeenCalled();
  });

  test("should handle messageText /mp", (): void => {
    handleMessage(store, {
      ...message,
      text: `/${texts.commandMostPopular}`
    });
    expect(store.dispatch).toHaveBeenCalled();
  });

  test("should handle messageText /dl_", (): void => {
    handleMessage(store, {
      ...message,
      text: `/${texts.commandDownload}${texts.commandSeparator}`
    });
    expect(store.dispatch).toHaveBeenCalled();
  });

  test("should handle messageText /rl_", (): void => {
    handleMessage(store, {
      ...message,
      text: `/${texts.commandRelatedToVideoId}${texts.commandSeparator}`
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
