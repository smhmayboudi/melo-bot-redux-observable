import { Store } from "redux";

import { IState } from "../../types/iState";
import { IStateMessage } from "../../types/iStateMessage";
import * as actions from "../actions";

import { configureStore } from "./store";

describe("store configs", (): void => {
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
  let message: IStateMessage = {
    query: {
      message: {
        chat: {
          first_name: "Hossein",
          id: 52953379,
          last_name: "Mayboudi",
          type: "private",
          username: "smhmayboudi"
        },
        date: 1537627954,
        entities: [
          {
            length: 9,
            offset: 0,
            type: "bot_command"
          }
        ],
        from: {
          first_name: "Hossein",
          id: 52953379,
          is_bot: false,
          language_code: "fa",
          last_name: "Mayboudi",
          username: "smhmayboudi"
        },
        message_id: 1164,
        text: ""
      },
      update_id: 0
    }
  };

  test("should handle start message", (): void => {
    if (message.query !== undefined && message.query.message !== undefined) {
      message = {
        query: {
          ...message.query,
          message: { ...message.query.message, text: "/start" }
        }
      };
    }
    const store: Store<IState> & { dispatch: {} } = configureStore();
    store.dispatch(actions.message.query(message));
    expect(store.getState()).toEqual({
      ...initialStateh,
      message
    });
  });
});
