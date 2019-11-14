import { StateObservable } from "redux-observable";
import { of, Subject } from "rxjs";

import * as actions from "../actions";
import * as texts from "../configs/texts";
import { IActionYoutubeSearchList } from "../../types/iActionYoutubeSearchList";
import { IState } from "../../types/iState";
import { IStateYoutubeSearchListQuery } from "../../types/iStateYoutubeSearchListQuery";
import { transformObservable } from "./youtubeSearchListToSendMessage";

describe("youtubeSearchList epic", (): void => {
  describe("youtubeSearchListToSendMessage", (): void => {
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
    const error: Error = new Error("");
    const query: IStateYoutubeSearchListQuery = {
      key: ""
    };
    // const result = {};
    const state$Value = {
      ...initialState,
      message: {
        query: {
          message: {
            chat: {
              id: 0,
              type: ""
            },
            date: 0,
            message_id: 0
          },
          update_id: 0
        }
      },
      youtubeSearchList: {
        query: {
          key: "",
          q: "",
          relatedToVideoId: undefined
        },
        result: {
          items: []
        }
      }
    };
    const state$ValueMessageQueryUndefined = {
      ...state$Value,
      message: {
        ...state$Value.message,
        query: undefined
      }
    };
    const state$ValueMessageQueryMessageUndefined = {
      ...state$Value,
      message: {
        ...state$Value.message,
        query: {
          ...state$Value.message.query,
          message: undefined
        }
      }
    };
    const state$ValueYoutubeSearchListQueryUndefined = {
      ...state$Value,
      youtubeSearchList: {
        query: undefined
      }
    };
    const state$ValueYoutubeSearchListQueryQRelatedToVideoIdUndefined = {
      ...state$Value,
      youtubeSearchList: {
        ...state$Value.youtubeSearchList,
        query: {
          ...state$Value.youtubeSearchList.query,
          q: undefined,
          relatedToVideoId: undefined
        }
      }
    };
    const actionYoutubeSearchListResult = {
      items: [],
      nextPageToken: "",
      prevPageToken: ""
    };
    const actionYoutubeSearchListResultItemsUndefined = {
      ...actionYoutubeSearchListResult,
      items: undefined
    };
    const actionYoutubeSearchListResultNextPageTokenUndefined = {
      ...actionYoutubeSearchListResult,
      nextPageToken: undefined
    };
    const actionYoutubeSearchListResultPrevPageTokenUndefined = {
      ...actionYoutubeSearchListResult,
      prevPageToken: undefined
    };

    test("should handle error", (): void => {
      const action: IActionYoutubeSearchList = actions.youtubeSearchList.error({
        error
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        state$Value
      );
      const action2 = actions.callbackQueryDataInsert.result({ result: "" });
      expect(transformObservable(action, state$)(action2)).toEqual(of(action));
    });

    test("should handle error state$ undefined", (): void => {
      const action: IActionYoutubeSearchList = actions.youtubeSearchList.query({
        query
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const action2 = actions.callbackQueryDataInsert.result({ result: "" });
      expect(transformObservable(action, state$)(action2)).toEqual(
        of(
          actions.youtubeSearchList.error({
            error: new Error(texts.state$Undefined)
          })
        )
      );
    });

    test("should handle error state$ValueMessageQuery undefined", (): void => {
      const action: IActionYoutubeSearchList = actions.youtubeSearchList.query({
        query
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        state$ValueMessageQueryUndefined
      );
      const action2 = actions.callbackQueryDataInsert.result({ result: "" });
      expect(transformObservable(action, state$)(action2)).toEqual(
        of(
          actions.youtubeSearchList.error({
            error: new Error(texts.state$ValueMessageQueryUndefined)
          })
        )
      );
    });

    test("should handle error state$ValueMessageQueryMessage undefined", (): void => {
      const action: IActionYoutubeSearchList = actions.youtubeSearchList.query({
        query
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        state$ValueMessageQueryMessageUndefined
      );
      const action2 = actions.callbackQueryDataInsert.result({ result: "" });
      expect(transformObservable(action, state$)(action2)).toEqual(
        of(
          actions.youtubeSearchList.error({
            error: new Error(texts.state$ValueMessageQueryMessageUndefined)
          })
        )
      );
    });

    test("should handle error state$ValueYoutubeSearchListQuery undefined", (): void => {
      const action: IActionYoutubeSearchList = actions.youtubeSearchList.query({
        query
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        state$ValueYoutubeSearchListQueryUndefined
      );
      const action2 = actions.callbackQueryDataInsert.result({ result: "" });
      expect(transformObservable(action, state$)(action2)).toEqual(
        of(
          actions.youtubeSearchList.error({
            error: new Error(texts.state$ValueYoutubeSearchListQueryUndefined)
          })
        )
      );
    });

    test("should handle error actionYoutubeSearchListResult undefined", (): void => {
      const action: IActionYoutubeSearchList = actions.youtubeSearchList.result(
        {
          result: undefined
        }
      );
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        state$Value
      );
      const action2 = actions.callbackQueryDataInsert.result({ result: "" });
      expect(transformObservable(action, state$)(action2)).toEqual(
        of(
          actions.youtubeSearchList.error({
            error: new Error(texts.actionYoutubeSearchListResultUndefined)
          })
        )
      );
    });

    test("should handle error actionYoutubeSearchListResultItems undefined", (): void => {
      const action: IActionYoutubeSearchList = actions.youtubeSearchList.result(
        {
          result: actionYoutubeSearchListResultItemsUndefined
        }
      );
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        state$Value
      );
      const action2 = actions.callbackQueryDataInsert.result({ result: "" });
      expect(transformObservable(action, state$)(action2)).toEqual(
        of(
          actions.youtubeSearchList.error({
            error: new Error(texts.actionYoutubeSearchListResultItemsUndefined)
          })
        )
      );
    });

    test("should handle error action2CallbackQueryDataInsertResult undefined", (): void => {
      const action: IActionYoutubeSearchList = actions.youtubeSearchList.result(
        {
          result: actionYoutubeSearchListResult
        }
      );
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        state$Value
      );
      const action2 = actions.callbackQueryDataInsert.result({
        result: undefined
      });
      expect(transformObservable(action, state$)(action2)).toEqual(
        of(
          actions.youtubeSearchList.error({
            error: new Error(texts.actionCallbackQueryDataInsertResultUndefined)
          })
        )
      );
    });

    test("should handle error state$ValueYoutubeSearchListQueryQRelatedToVideoId undefined", (): void => {
      const action: IActionYoutubeSearchList = actions.youtubeSearchList.result(
        {
          result: actionYoutubeSearchListResult
        }
      );
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        state$ValueYoutubeSearchListQueryQRelatedToVideoIdUndefined
      );
      const action2 = actions.callbackQueryDataInsert.result({ result: "" });
      expect(transformObservable(action, state$)(action2)).toEqual(
        of(
          actions.youtubeSearchList.error({
            error: new Error(
              texts.state$ValueYoutubeSearchListQueryQRelatedToVideoIdUndefined
            )
          })
        )
      );
    });

    test("should handle result actionYoutubeSearchListResultNextPageToken undefined", (): void => {
      const action: IActionYoutubeSearchList = actions.youtubeSearchList.result(
        {
          result: actionYoutubeSearchListResultNextPageTokenUndefined
        }
      );
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        state$Value
      );
      const action2 = actions.callbackQueryDataInsert.result({ result: "" });
      expect(transformObservable(action, state$)(action2)).toEqual(
        of(
          actions.youtubeSearchList.error({
            error: new Error(
              texts.state$ValueYoutubeSearchListQueryQRelatedToVideoIdUndefined
            )
          })
        )
      );
    });

    test("should handle result actionYoutubeSearchListResultPrevPageToken undefined", (): void => {
      const action: IActionYoutubeSearchList = actions.youtubeSearchList.result(
        {
          result: actionYoutubeSearchListResultPrevPageTokenUndefined
        }
      );
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        state$Value
      );
      const action2 = actions.callbackQueryDataInsert.result({ result: "" });
      expect(transformObservable(action, state$)(action2)).toEqual(
        of(
          actions.youtubeSearchList.error({
            error: new Error(
              texts.state$ValueYoutubeSearchListQueryQRelatedToVideoIdUndefined
            )
          })
        )
      );
    });

    test("should handle result", (): void => {
      const action: IActionYoutubeSearchList = actions.youtubeSearchList.result(
        {
          result: actionYoutubeSearchListResult
        }
      );
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        state$Value
      );
      const action2 = actions.callbackQueryDataInsert.result({ result: "" });
      expect(transformObservable(action, state$)(action2)).toEqual(
        of(
          actions.youtubeSearchList.error({
            error: new Error(
              texts.state$ValueYoutubeSearchListQueryQRelatedToVideoIdUndefined
            )
          })
        )
      );
    });
  });
});
