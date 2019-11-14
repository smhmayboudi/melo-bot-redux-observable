import { StateObservable } from "redux-observable";
import { of, Subject } from "rxjs";

import * as actions from "../actions";
import * as texts from "../configs/texts";
import { IActionYoutubeVideoList } from "../../types/iActionYoutubeVideoList";
import { IState } from "../../types/iState";
import { IStateYoutubeVideoListQuery } from "../../types/iStateYoutubeVideoListQuery";
import { transformObservable } from "./youtubeVideoListToEditMessageMedia";

describe("youtubeVideoList epic", (): void => {
  describe("youtubeVideoListToEditMessageText", (): void => {
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
    const query: IStateYoutubeVideoListQuery = {
      key: ""
    };
    // const result = {};
    const state$Value = {
      ...initialState,
      inlineQuery: {
        query: {
          from: {
            first_name: "",
            id: 0,
            is_bot: false
          },
          id: "",
          offset: "",
          query: ""
        }
      },
      message: {
        query: {
          callback_query: {
            chat_instance: "",
            from: {
              first_name: "",
              id: 0,
              is_bot: false
            },
            id: "",
            message: {
              chat: {
                id: 0,
                type: ""
              },
              date: 0,
              message_id: 0
            }
          },
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
      youtubeVideoList: {
        query: {
          chart: "",
          key: ""
        },
        result: {}
      }
    };
    const state$ValueMessageQueryUndefined = {
      ...state$Value,
      message: {
        ...state$Value.message,
        query: undefined
      }
    };
    const state$ValueMessageQueryCallbackQueryUndefined = {
      ...state$Value,
      message: {
        ...state$Value.message,
        query: {
          ...state$Value.message.query,
          callback_query: undefined
        }
      }
    };
    const state$ValueMessageQueryCallbackQueryMessageUndefined = {
      ...state$Value,
      message: {
        ...state$Value.message,
        query: {
          ...state$Value.message.query,
          callback_query: {
            ...state$Value.message.query.callback_query,
            message: undefined
          }
        }
      }
    };
    const state$ValueYoutubeVideoListQueryUndefined = {
      ...state$Value,
      youtubeVideoList: {
        ...state$Value.youtubeVideoList,
        query: undefined
      }
    };
    const state$ValueYoutubeVideoListQueryChartUndefined = {
      ...state$Value,
      youtubeVideoList: {
        ...state$Value.youtubeVideoList,
        query: {
          ...state$Value.youtubeVideoList.query,
          chart: undefined
        }
      }
    };
    const actionYoutubeVideoListResult = {
      items: [],
      nextPageToken: "",
      prevPageToken: ""
    };
    const actionYoutubeVideoListResultItemsUndefined = {
      ...actionYoutubeVideoListResult,
      items: undefined
    };
    const actionYoutubeVideoListResultNextPageTokenUndefined = {
      ...actionYoutubeVideoListResult,
      nextPageToken: undefined
    };
    const actionYoutubeVideoListResultPrevPageTokenUndefined = {
      ...actionYoutubeVideoListResult,
      prevPageToken: undefined
    };

    test("should handle error", (): void => {
      const action: IActionYoutubeVideoList = actions.youtubeVideoList.error({
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
      const action: IActionYoutubeVideoList = actions.youtubeVideoList.query({
        query
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const action2 = actions.callbackQueryDataInsert.result({ result: "" });
      expect(transformObservable(action, state$)(action2)).toEqual(
        of(
          actions.youtubeVideoList.error({
            error: new Error(texts.state$Undefined)
          })
        )
      );
    });

    test("should handle error state$ValueMessageQuery undefined", (): void => {
      const action: IActionYoutubeVideoList = actions.youtubeVideoList.query({
        query
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        state$ValueMessageQueryUndefined
      );
      const action2 = actions.callbackQueryDataInsert.result({ result: "" });
      expect(transformObservable(action, state$)(action2)).toEqual(
        of(
          actions.youtubeVideoList.error({
            error: new Error(texts.state$ValueMessageQueryUndefined)
          })
        )
      );
    });

    test("should handle error state$ValueMessageQueryCallbackQuery undefined", (): void => {
      const action: IActionYoutubeVideoList = actions.youtubeVideoList.query({
        query
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        state$ValueMessageQueryCallbackQueryUndefined
      );
      const action2 = actions.callbackQueryDataInsert.result({ result: "" });
      expect(transformObservable(action, state$)(action2)).toEqual(
        of(
          actions.youtubeVideoList.error({
            error: new Error(
              texts.state$ValueMessageQueryCallbackQueryUndefined
            )
          })
        )
      );
    });

    test("should handle error state$ValueMessageQueryCallbackQueryMessage undefined", (): void => {
      const action: IActionYoutubeVideoList = actions.youtubeVideoList.query({
        query
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        state$ValueMessageQueryCallbackQueryMessageUndefined
      );
      const action2 = actions.callbackQueryDataInsert.result({ result: "" });
      expect(transformObservable(action, state$)(action2)).toEqual(
        of(
          actions.youtubeVideoList.error({
            error: new Error(
              texts.state$ValueMessageQueryCallbackQueryMessageUndefined
            )
          })
        )
      );
    });

    test("should handle error state$ValueYoutubeVideoListQuery undefined", (): void => {
      const action: IActionYoutubeVideoList = actions.youtubeVideoList.query({
        query: undefined
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        state$ValueYoutubeVideoListQueryUndefined
      );
      const action2 = actions.callbackQueryDataInsert.result({ result: "" });
      expect(transformObservable(action, state$)(action2)).toEqual(
        of(
          actions.youtubeVideoList.error({
            error: new Error(texts.state$ValueYoutubeVideoListQueryUndefined)
          })
        )
      );
    });

    test("should handle error state$ValueYoutubeVideoListQueryChart undefined", (): void => {
      const action: IActionYoutubeVideoList = actions.youtubeVideoList.query({
        query: undefined
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        state$ValueYoutubeVideoListQueryChartUndefined
      );
      const action2 = actions.callbackQueryDataInsert.result({ result: "" });
      expect(transformObservable(action, state$)(action2)).toEqual(
        of(
          actions.youtubeVideoList.error({
            error: new Error(
              texts.state$ValueYoutubeVideoListQueryChartUndefined
            )
          })
        )
      );
    });

    test("should handle error actionYoutubeVideoListResult undefined", (): void => {
      const action: IActionYoutubeVideoList = actions.youtubeVideoList.result({
        result: undefined
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        state$Value
      );
      const action2 = actions.callbackQueryDataInsert.result({ result: "" });
      expect(transformObservable(action, state$)(action2)).toEqual(
        of(
          actions.youtubeVideoList.error({
            error: new Error(texts.actionYoutubeVideoListResultUndefined)
          })
        )
      );
    });

    test("should handle error actionYoutubeVideoListResultItems undefined", (): void => {
      const action: IActionYoutubeVideoList = actions.youtubeVideoList.result({
        result: actionYoutubeVideoListResultItemsUndefined
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        state$Value
      );
      const action2 = actions.callbackQueryDataInsert.result({ result: "" });
      expect(transformObservable(action, state$)(action2)).toEqual(
        of(
          actions.youtubeVideoList.error({
            error: new Error(texts.actionYoutubeVideoListResultItemsUndefined)
          })
        )
      );
    });

    test("should handle error action2CallbackQueryDataInsertResult undefined", (): void => {
      const action: IActionYoutubeVideoList = actions.youtubeVideoList.result({
        result: actionYoutubeVideoListResult
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        state$Value
      );
      const action2 = actions.callbackQueryDataInsert.result({
        result: undefined
      });
      expect(transformObservable(action, state$)(action2)).toEqual(
        of(
          actions.youtubeVideoList.error({
            error: new Error(texts.actionCallbackQueryDataInsertResultUndefined)
          })
        )
      );
    });

    test("should handle result actionYoutubeVideoListResultNextPageToken undefined", (): void => {
      const action: IActionYoutubeVideoList = actions.youtubeVideoList.result({
        result: actionYoutubeVideoListResultNextPageTokenUndefined
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        state$Value
      );
      const action2 = actions.callbackQueryDataInsert.result({ result: "" });
      expect(transformObservable(action, state$)(action2)).toEqual(
        of(
          actions.youtubeVideoList.error({
            error: new Error("")
          })
        )
      );
    });

    test("should handle result actionYoutubeVideoListResultPrevPageToken undefined", (): void => {
      const action: IActionYoutubeVideoList = actions.youtubeVideoList.result({
        result: actionYoutubeVideoListResultPrevPageTokenUndefined
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        state$Value
      );
      const action2 = actions.callbackQueryDataInsert.result({ result: "" });
      expect(transformObservable(action, state$)(action2)).toEqual(
        of(
          actions.youtubeVideoList.error({
            error: new Error("")
          })
        )
      );
    });

    test("should handle result", (): void => {
      const action: IActionYoutubeVideoList = actions.youtubeVideoList.result({
        result: actionYoutubeVideoListResult
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        state$Value
      );
      const action2 = actions.callbackQueryDataInsert.result({ result: "" });
      expect(transformObservable(action, state$)(action2)).toEqual(
        of(
          actions.youtubeVideoList.error({
            error: new Error("")
          })
        )
      );
    });
  });
});
