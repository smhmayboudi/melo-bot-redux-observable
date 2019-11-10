import { Action } from "redux";

import { IState } from "../../types/iState";
import { IStateMessageQuery } from "../../types/iStateMessageQuery";
import * as actions from "../actions";

import { crashReporter } from "./crashReporter";

describe("crashReporter middleware", (): void => {
  const initialState: IState = {
    youtubeDownloadResultInsert:
      actions.youtubeDownloadResultInsert.initialState,
    youtubeDownloadResultFind: actions.youtubeDownloadResultFind.initialState,
    addStickerToSet: actions.addStickerToSet.initialState,
    answerCallbackQuery: actions.answerCallbackQuery.initialState,
    answerInlineQuery: actions.answerInlineQuery.initialState,
    answerPreCheckoutQuery: actions.answerPreCheckoutQuery.initialState,
    answerShippingQuery: actions.answerShippingQuery.initialState,
    callbackQueryDataFind: actions.callbackQueryDataFind.initialState,
    callbackQueryDataInsert: actions.callbackQueryDataInsert.initialState,
    chosenInlineResult: actions.chosenInlineResult.initialState,
    createNewStickerSet: actions.createNewStickerSet.initialState,
    deleteChatPhoto: actions.deleteChatPhoto.initialState,
    deleteChatStickerSet: actions.deleteChatStickerSet.initialState,
    deleteMessage: actions.deleteMessage.initialState,
    deleteStickerFromSet: actions.deleteStickerFromSet.initialState,
    deleteWebhook: actions.deleteWebhook.initialState,
    editMessageCaption: actions.editMessageCaption.initialState,
    editMessageLiveLocation: actions.editMessageLiveLocation.initialState,
    editMessageMedia: actions.editMessageMedia.initialState,
    editMessageReplyMarkup: actions.editMessageReplyMarkup.initialState,
    editMessageText: actions.editMessageText.initialState,
    exportChatInviteLink: actions.exportChatInviteLink.initialState,
    forwardMessage: actions.forwardMessage.initialState,
    getChat: actions.getChat.initialState,
    getChatAdministrators: actions.getChatAdministrators.initialState,
    getChatMember: actions.getChatMember.initialState,
    getChatMembersCount: actions.getChatMembersCount.initialState,
    getFile: actions.getFile.initialState,
    getGameHighScores: actions.getGameHighScores.initialState,
    getMe: actions.getMe.initialState,
    getStickerSet: actions.getStickerSet.initialState,
    getUpdates: actions.getUpdates.initialState,
    getUserProfilePhotos: actions.getUserProfilePhotos.initialState,
    getWebhookInfo: actions.getWebhookInfo.initialState,
    inlineQuery: actions.inlineQuery.initialState,
    kickChatMember: actions.kickChatMember.initialState,
    leaveChat: actions.leaveChat.initialState,
    message: actions.message.initialState,
    pinChatMessage: actions.pinChatMessage.initialState,
    promoteChatMember: actions.promoteChatMember.initialState,
    restrictChatMember: actions.restrictChatMember.initialState,
    sendAnimation: actions.sendAnimation.initialState,
    sendAudio: actions.sendAudio.initialState,
    sendChatAction: actions.sendChatAction.initialState,
    sendContact: actions.sendContact.initialState,
    sendDocument: actions.sendDocument.initialState,
    sendGame: actions.sendGame.initialState,
    sendInvoice: actions.sendInvoice.initialState,
    sendLocation: actions.sendLocation.initialState,
    sendMediaGroup: actions.sendMediaGroup.initialState,
    sendMessage: actions.sendMessage.initialState,
    sendPhoto: actions.sendPhoto.initialState,
    sendPoll: actions.sendPoll.initialState,
    sendSticker: actions.sendSticker.initialState,
    sendVenue: actions.sendVenue.initialState,
    sendVideo: actions.sendVideo.initialState,
    sendVideoNote: actions.sendVideoNote.initialState,
    sendVoice: actions.sendVoice.initialState,
    setChatDescription: actions.setChatDescription.initialState,
    setChatPhoto: actions.setChatPhoto.initialState,
    setChatStickerSet: actions.setChatStickerSet.initialState,
    setChatTitle: actions.setChatTitle.initialState,
    setGameScore: actions.setGameScore.initialState,
    setPassportDataErrors: actions.setPassportDataErrors.initialState,
    setStickerPositionInSet: actions.setStickerPositionInSet.initialState,
    setWebhook: actions.setWebhook.initialState,
    stopMessageLiveLocation: actions.stopMessageLiveLocation.initialState,
    stopPoll: actions.stopPoll.initialState,
    unbanChatMember: actions.unbanChatMember.initialState,
    unpinChatMessage: actions.unpinChatMessage.initialState,
    uploadStickerFile: actions.uploadStickerFile.initialState,
    youtubeDownload: actions.youtubeDownload.initialState,
    youtubeSearchList: actions.youtubeSearchList.initialState,
    youtubeVideoList: actions.youtubeVideoList.initialState
  };
  const query: IStateMessageQuery = {
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
  };
  const queryFrom: IStateMessageQuery = {
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
      from: undefined,
      message_id: 1164,
      text: ""
    },
    update_id: 0
  };

  const create: (
    getState: jest.Mock,
    error?: () => void
  ) => {
    next: jest.Mock;
    store: {
      dispatch: jest.Mock;
      getState: jest.Mock;
    };
    invoke(action: Action<string>): Action<string>;
  } = (
    getState: jest.Mock,
    error?: () => void
  ): {
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
      getState
    };
    const next: jest.Mock = jest.fn(error);
    const invoke: (action: Action<string>) => Action<string> = (
      action: Action<string>
    ): Action<string> => crashReporter(store)(next)(action);

    return { invoke, next, store };
  };

  test("should handle", (): void => {
    const { invoke, next } = create(jest.fn(() => initialState));
    const action: Action<string> = { type: "" };
    invoke(action);
    expect(next).toHaveBeenCalledWith(action);
  });

  test("should handle exception action", (): void => {
    const error: Error = new Error("");
    const { next, invoke } = create(
      jest.fn(() => initialState),
      (): void => {
        throw error;
      }
    );
    const action: Action<string> = actions.message.query({ query });
    try {
      invoke(action);
    } catch {
      expect(next).toThrow(error);
    }
  });

  test("should handle exception state from undefined", (): void => {
    const error: Error = new Error("");
    const { next, invoke } = create(
      jest.fn(() => ({ ...initialState, message: { queryFrom } })),
      (): void => {
        throw error;
      }
    );
    const action: Action<string> = { type: "" };
    try {
      invoke(action);
    } catch {
      expect(next).toThrow(error);
    }
  });

  test("should handle exception state", (): void => {
    const error: Error = new Error("");
    const { next, invoke } = create(
      jest.fn(() => ({ ...initialState, message: { query } })),
      (): void => {
        throw error;
      }
    );
    const action: Action<string> = { type: "" };
    try {
      invoke(action);
    } catch {
      expect(next).toThrow(error);
    }
  });
});
