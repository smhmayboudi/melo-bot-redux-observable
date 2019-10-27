import { Action } from "redux";

import { IState } from "../../types/iState";
import * as actions from "../actions";

import { logger } from "./logger";

describe("logger middleware", (): void => {
  const initialStateh: IState = {
    addStickerToSet: actions.addStickerToSet.initialState,
    answerCallbackQuery: actions.answerCallbackQuery.initialState,
    answerInlineQuery: actions.answerInlineQuery.initialState,
    answerPreCheckoutQuery: actions.answerPreCheckoutQuery.initialState,
    answerShippingQuery: actions.answerShippingQuery.initialState,
    chosenInlineResult: actions.chosenInlineResult.initialState,
    createNewStickerSet: actions.createNewStickerSet.initialState,
    deleteStickerFromSet: actions.deleteStickerFromSet.initialState,
    deleteWebhook: actions.deleteWebhook.initialState,
    getChatMember: actions.getChatMember.initialState,
    getGameHighScores: actions.getGameHighScores.initialState,
    getStickerSet: actions.getStickerSet.initialState,
    getUpdates: actions.getUpdates.initialState,
    getWebhookInfo: actions.getWebhookInfo.initialState,
    inlineQuery: actions.inlineQuery.initialState,
    message: actions.message.initialState,
    sendAudio: actions.sendAudio.initialState,
    sendGame: actions.sendGame.initialState,
    sendInvoice: actions.sendInvoice.initialState,
    sendMessage: actions.sendMessage.initialState,
    sendSticker: actions.sendSticker.initialState,
    sendVideo: actions.sendVideo.initialState,
    setGameScore: actions.setGameScore.initialState,
    setPassportDataErrors: actions.setPassportDataErrors.initialState,
    setStickerPositionInSet: actions.setStickerPositionInSet.initialState,
    setWebhook: actions.setWebhook.initialState,
    uploadStickerFile: actions.uploadStickerFile.initialState,
    youtubeDownload: actions.youtubeDownload.initialState,
    youtubeSearchList: actions.youtubeSearchList.initialState,
    youtubeVideoList: actions.youtubeVideoList.initialState
  };

  const create: () => {
    next: jest.Mock;
    store: {
      dispatch: jest.Mock;
      getState: jest.Mock;
    };
    invoke(action: Action<string>): Action<string>;
  } = (): {
    next: jest.Mock;
    store: {
      dispatch: jest.Mock;
      getState: jest.Mock;
    };
    invoke(action: Action<string>): Action<string>;
  } => {
    const store: {
      dispatch: jest.Mock;
      getState: jest.Mock;
    } = {
      dispatch: jest.fn(),
      getState: jest.fn(() => initialStateh)
    };
    const next: jest.Mock = jest.fn();
    const invoke: (action: Action<string>) => Action<string> = (
      action: Action<string>
    ): Action<string> => logger(store)(next)(action);

    return { invoke, next, store };
  };

  test("should handle", (): void => {
    const { invoke, next } = create();
    const action: Action<string> = { type: "" };
    invoke(action);
    expect(next).toHaveBeenCalledWith(action);
  });
});
