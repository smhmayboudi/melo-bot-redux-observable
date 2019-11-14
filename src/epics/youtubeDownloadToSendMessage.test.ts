import { Subject, of } from "rxjs";
import { StateObservable } from "redux-observable";

import * as actions from "../actions";
import * as texts from "../configs/texts";
import { IActionYoutubeDownload } from "../../types/iActionYoutubeDownload";
import { IState } from "../../types/iState";
import { IStateYoutubeDownloadQuery } from "../../types/iStateYoutubeDownloadQuery";
import { transformObservableSendMessage } from "./youtubeDownloadToSendMessage";

describe("youtubeDownload epic", (): void => {
  describe("youtubeDownloadToSendMessage", (): void => {
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
    const query: IStateYoutubeDownloadQuery = {
      id: ""
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

    test("should handle error", (): void => {
      const action: IActionYoutubeDownload = actions.youtubeDownload.error({
        error
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        state$Value
      );
      expect(transformObservableSendMessage(action, state$)).toEqual(
        of(action)
      );
    });

    test("should handle error state$ undefined", (): void => {
      const action: IActionYoutubeDownload = actions.youtubeDownload.query({
        query
      });
      const state$: StateObservable<IState> | undefined = undefined;
      expect(transformObservableSendMessage(action, state$)).toEqual(
        of(
          actions.youtubeDownload.error({
            error: new Error(texts.state$Undefined)
          })
        )
      );
    });

    test("should handle error state$ValueMessageQuery undefined", (): void => {
      const action: IActionYoutubeDownload = actions.youtubeDownload.query({
        query
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        state$ValueMessageQueryUndefined
      );
      expect(transformObservableSendMessage(action, state$)).toEqual(
        of(
          actions.youtubeDownload.error({
            error: new Error(texts.state$ValueMessageQueryUndefined)
          })
        )
      );
    });

    test("should handle error state$ValueMessageQueryMessage undefined", (): void => {
      const action: IActionYoutubeDownload = actions.youtubeDownload.query({
        query
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        state$ValueMessageQueryMessageUndefined
      );
      expect(transformObservableSendMessage(action, state$)).toEqual(
        of(
          actions.youtubeDownload.error({
            error: new Error(texts.state$ValueMessageQueryMessageUndefined)
          })
        )
      );
    });

    test("should handle result", (): void => {
      const action: IActionYoutubeDownload = actions.youtubeDownload.query({
        query
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        state$Value
      );
      expect(transformObservableSendMessage(action, state$)).toEqual(
        of(
          actions.sendMessage.query({
            query: {
              chat_id: state$Value.message.query.message.chat.id,
              disable_notification: true,
              disable_web_page_preview: true,
              parse_mode: "HTML",
              reply_to_message_id: state$Value.message.query.message.message_id,
              text: texts.messageChannelJoin
            }
          })
        )
      );
    });
  });
});
