import { ILocale } from "../../types/iLocale";
import { IMessage } from "../../types/telegramBot/types/iMessage";
import * as command from "../utils/command";
import { locale } from "../utils/string";
import { handleMessage } from "./telegramBotHandleMessage";

describe("telegramBotHandleMessage configs", (): void => {
  const locales: ILocale = locale("en");
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

  test("should handle addStickerToSet", (): void => {
    handleMessage(locales, store, {
      ...message,
      text: command.addStickerToSet()
    });
    expect(store.dispatch).toHaveBeenCalled();
  });

  test("should handle createNewStickerSet", (): void => {
    handleMessage(locales, store, {
      ...message,
      text: command.createNewStickerSet()
    });
    expect(store.dispatch).toHaveBeenCalled();
  });

  test("should handle getChatMember", (): void => {
    handleMessage(locales, store, {
      ...message,
      text: command.getChatMember()
    });
    expect(store.dispatch).toHaveBeenCalled();
  });

  test("should handle sendAnimation", (): void => {
    handleMessage(locales, store, {
      ...message,
      text: command.sendAnimation()
    });
    expect(store.dispatch).toHaveBeenCalled();
  });

  test("should handle sendAudio", (): void => {
    handleMessage(locales, store, {
      ...message,
      text: command.sendAudio()
    });
    expect(store.dispatch).toHaveBeenCalled();
  });

  test("should handle sendDocument", (): void => {
    handleMessage(locales, store, {
      ...message,
      text: command.sendDocument()
    });
    expect(store.dispatch).toHaveBeenCalled();
  });

  test("should handle sendMediaGroup", (): void => {
    handleMessage(locales, store, {
      ...message,
      text: command.sendMediaGroup()
    });
    expect(store.dispatch).toHaveBeenCalled();
  });

  test("should handle sendMessage", (): void => {
    handleMessage(locales, store, {
      ...message,
      text: command.sendMessage()
    });
    expect(store.dispatch).toHaveBeenCalled();
  });

  test("should handle sendPhoto", (): void => {
    handleMessage(locales, store, {
      ...message,
      text: command.sendPhoto()
    });
    expect(store.dispatch).toHaveBeenCalled();
  });

  test("should handle sendSticker", (): void => {
    handleMessage(locales, store, {
      ...message,
      text: command.sendSticker()
    });
    expect(store.dispatch).toHaveBeenCalled();
  });

  test("should handle sendVideo", (): void => {
    handleMessage(locales, store, {
      ...message,
      text: command.sendVideo()
    });
    expect(store.dispatch).toHaveBeenCalled();
  });

  test("should handle sendVideoNote", (): void => {
    handleMessage(locales, store, {
      ...message,
      text: command.sendVideoNote()
    });
    expect(store.dispatch).toHaveBeenCalled();
  });

  test("should handle sendVoice", (): void => {
    handleMessage(locales, store, {
      ...message,
      text: command.sendVoice()
    });
    expect(store.dispatch).toHaveBeenCalled();
  });

  test("should handle youtubeDownload", (): void => {
    handleMessage(locales, store, {
      ...message,
      text: command.youtubeDownload()
    });
    expect(store.dispatch).toHaveBeenCalled();
  });

  test("should handle youtubeSearchList", (): void => {
    handleMessage(locales, store, {
      ...message,
      text: command.youtubeSearchList()
    });
    expect(store.dispatch).toHaveBeenCalled();
  });

  test("should handle youtubeVideoList", (): void => {
    handleMessage(locales, store, {
      ...message,
      text: command.youtubeVideoList()
    });
    expect(store.dispatch).toHaveBeenCalled();
  });

  test("should handle messageText download", (): void => {
    handleMessage(locales, store, {
      ...message,
      text: command.download()
    });
    expect(store.dispatch).toHaveBeenCalled();
  });

  test("should handle messageText help", (): void => {
    handleMessage(locales, store, {
      ...message,
      text: command.help()
    });
    expect(store.dispatch).toHaveBeenCalled();
  });

  test("should handle messageText mp", (): void => {
    handleMessage(locales, store, {
      ...message,
      text: command.mostPopular()
    });
    expect(store.dispatch).toHaveBeenCalled();
  });

  test("should handle messageText rl_", (): void => {
    handleMessage(locales, store, {
      ...message,
      text: command.relatedToVideoId()
    });
    expect(store.dispatch).toHaveBeenCalled();
  });

  test("should handle messageText setInlineGeo", (): void => {
    handleMessage(locales, store, {
      ...message,
      text: command.setInlineGeo()
    });
    expect(store.dispatch).toHaveBeenCalled();
  });

  test("should handle messageText settings", (): void => {
    handleMessage(locales, store, {
      ...message,
      text: command.settings()
    });
    expect(store.dispatch).toHaveBeenCalled();
  });

  test("should handle messageText shortenList", (): void => {
    handleMessage(locales, store, {
      ...message,
      text: command.shortenList()
    });
    expect(store.dispatch).toHaveBeenCalled();
  });

  test("should handle messageText shortenReset", (): void => {
    handleMessage(locales, store, {
      ...message,
      text: command.shortenReset()
    });
    expect(store.dispatch).toHaveBeenCalled();
  });

  test("should handle messageText start", (): void => {
    handleMessage(locales, store, {
      ...message,
      text: command.start()
    });
    expect(store.dispatch).toHaveBeenCalled();
  });

  test("should handle messageText not undefined", (): void => {
    handleMessage(locales, store, {
      ...message,
      text: ""
    });
    expect(store.dispatch).toHaveBeenCalled();
  });

  test("should handle messageText undefined", (): void => {
    handleMessage(locales, store, {
      ...message,
      text: undefined
    });
    expect(store.dispatch).toHaveBeenCalled();
  });
});
