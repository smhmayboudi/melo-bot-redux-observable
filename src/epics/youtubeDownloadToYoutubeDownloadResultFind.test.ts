import { StateObservable } from "redux-observable";
import { of, Subject } from "rxjs";

import { IActionYoutubeDownload } from "../../types/iActionYoutubeDownload";
import { IActionYoutubeDownloadResultFind } from "../../types/iActionYoutubeDownloadResultFind";
import { IMessage } from "../../types/telegramBot/types/iMessage";
import { IPhotoSize } from "../../types/telegramBot/types/iPhotoSize";
import { IState } from "../../types/iState";
import { IStateMessageQuery } from "../../types/iStateMessageQuery";
import { IStateYoutubeDownloadResultFindQuery } from "../../types/iStateYoutubeDownloadResultFindQuery";
import { IStateYoutubeDownloadResultInsertQuery } from "../../types/iStateYoutubeDownloadResultInsertQuery";
import * as actions from "../actions";
import * as texts from "../configs/texts";

import { caption } from "../utils/string";

import {
  transformObservableYoutubeDownloadResultFind,
  startActionYoutubeDownloadResultFind
} from "./youtubeDownloadToYoutubeDownloadResultFind";

describe("youtubeDownload epic", (): void => {
  describe("youtubeDownloadToYoutubeDownloadResultFind", (): void => {
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
    // const error: Error = new Error("");
    const query: IStateYoutubeDownloadResultFindQuery = {
      id: ""
    };
    const result: IStateYoutubeDownloadResultInsertQuery | null = {
      duration: 0,
      file_id: "small",
      file_size: 0,
      height: 0,
      id: "small",
      mime_type: "video/mp4",
      thumb: {
        file_id: "small",
        file_size: 0,
        height: 0,
        width: 0
      },
      title: "",
      width: 0
    };
    const state$Value: IState = {
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
      }
    };
    const state$ValueMessageQueryUndefined: IState = {
      ...state$Value,
      message: {
        ...state$Value.message,
        query: undefined
      }
    };
    const state$ValueMessageQueryMessageUndefined: IState = {
      ...state$Value,
      message: {
        ...state$Value.message,
        query: {
          ...(state$Value.message.query as IStateMessageQuery),
          message: undefined
        }
      }
    };
    const actionYoutubeDownloadResultThumbUndefined: IStateYoutubeDownloadResultInsertQuery | null = {
      ...result,
      thumb: undefined
    };

    describe("transformObservableYoutubeDownloadResultFind", (): void => {
      test("should handle error state$ undefined", (): void => {
        const action: IActionYoutubeDownloadResultFind = actions.youtubeDownloadResultFind.result(
          { result }
        );
        const state$: StateObservable<IState> | undefined = undefined;
        expect(
          transformObservableYoutubeDownloadResultFind(action, state$)
        ).toEqual(
          of(
            actions.youtubeDownload.error({
              error: new Error(texts.state$Undefined)
            })
          )
        );
      });

      test("should handle error state$ValueMessageQuery undefined", (): void => {
        const action: IActionYoutubeDownloadResultFind = actions.youtubeDownloadResultFind.result(
          { result }
        );
        const state$: StateObservable<IState> | undefined = new StateObservable(
          new Subject(),
          state$ValueMessageQueryUndefined
        );
        expect(
          transformObservableYoutubeDownloadResultFind(action, state$)
        ).toEqual(
          of(
            actions.youtubeDownload.error({
              error: new Error(texts.state$ValueMessageQueryUndefined)
            })
          )
        );
      });

      test("should handle error state$ValueMessageQueryMessage undefined", (): void => {
        const action: IActionYoutubeDownloadResultFind = actions.youtubeDownloadResultFind.result(
          { result }
        );
        const state$: StateObservable<IState> | undefined = new StateObservable(
          new Subject(),
          state$ValueMessageQueryMessageUndefined
        );
        expect(
          transformObservableYoutubeDownloadResultFind(action, state$)
        ).toEqual(
          of(
            actions.youtubeDownload.error({
              error: new Error(texts.state$ValueMessageQueryMessageUndefined)
            })
          )
        );
      });

      test("should handle error actionYoutubeDownloadResultFindResult undefined", (): void => {
        const action: IActionYoutubeDownloadResultFind = actions.youtubeDownloadResultFind.result(
          { result: undefined }
        );
        const state$: StateObservable<IState> | undefined = new StateObservable(
          new Subject(),
          state$Value
        );
        expect(
          transformObservableYoutubeDownloadResultFind(action, state$)
        ).toEqual(
          of(
            actions.youtubeDownload.error({
              error: new Error(texts.actionYoutubeDownloadResultUndefined)
            })
          )
        );
      });

      test("should handle error actionYoutubeDownloadResultFindResultThumb undefined", (): void => {
        const action: IActionYoutubeDownloadResultFind = actions.youtubeDownloadResultFind.result(
          { result: actionYoutubeDownloadResultThumbUndefined }
        );
        const state$: StateObservable<IState> | undefined = new StateObservable(
          new Subject(),
          state$Value
        );
        expect(
          transformObservableYoutubeDownloadResultFind(action, state$)
        ).toEqual(
          of(
            actions.youtubeDownload.error({
              error: new Error(texts.actionYoutubeDownloadResultThumbUndefined)
            })
          )
        );
      });

      test("should handle result", (): void => {
        const action: IActionYoutubeDownloadResultFind = actions.youtubeDownloadResultFind.result(
          { result }
        );
        const state$: StateObservable<IState> | undefined = new StateObservable(
          new Subject(),
          state$Value
        );
        expect(
          transformObservableYoutubeDownloadResultFind(action, state$)
        ).toEqual(
          of(
            actions.sendVideo.query({
              query: {
                caption: caption(result.title),
                chat_id: ((state$Value.message.query as IStateMessageQuery)
                  .message as IMessage).chat.id,
                disable_notification: true,
                duration: result.duration,
                height: result.height,
                parse_mode: "HTML",
                reply_markup: {
                  inline_keyboard: [
                    [
                      {
                        callback_data: "callback_data:OK",
                        text: "OK"
                      },
                      {
                        callback_data: "callback_data:NOK",
                        text: "NOK"
                      }
                    ]
                  ]
                },
                reply_to_message_id: ((state$Value.message
                  .query as IStateMessageQuery).message as IMessage).message_id,
                supports_streaming: true,
                thumb: (result.thumb as IPhotoSize).file_id,
                video: result.file_id,
                width: result.width
              }
            })
          )
        );
      });
    });

    describe("startActionYoutubeDownloadResultFind", (): void => {
      test("should handle error actionYoutubeDownloadQuery undefined", (): void => {
        const action: IActionYoutubeDownload = actions.youtubeDownload.query({
          query: undefined
        });
        expect(startActionYoutubeDownloadResultFind(action)).toEqual(
          actions.youtubeDownload.error({
            error: new Error(texts.actionYoutubeDownloadQueryUndefined)
          })
        );
      });

      test("should handle result", (): void => {
        const action: IActionYoutubeDownload = actions.youtubeDownload.query({
          query: query
        });
        expect(startActionYoutubeDownloadResultFind(action)).toEqual(
          actions.youtubeDownloadResultFind.query({
            query: {
              id: query.id
            }
          })
        );
      });
    });
  });
});
