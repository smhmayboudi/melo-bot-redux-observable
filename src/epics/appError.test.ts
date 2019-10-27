import { Action } from "redux";
import { StateObservable } from "redux-observable";
import { Observable, Subject } from "rxjs";
import { ColdObservable } from "rxjs/internal/testing/ColdObservable";
import { RunHelpers } from "rxjs/internal/testing/TestScheduler";
import { TestScheduler } from "rxjs/testing";

import { IActionSendMessage } from "../../types/iActionSendMessage";
import { IDependencies } from "../../types/iDependencies";
import { IState } from "../../types/iState";
import { IStateMessageQuery } from "../../types/iStateMessageQuery";
import { IMessage } from "../../types/telegramBot/types/iMessage";
import * as actions from "../actions";
import * as texts from "../configs/texts";
import * as epic from "../epics/appError";

describe("appError epic", (): void => {
  const initialState: IState = {
    addStickerToSet: actions.addStickerToSet.initialState,
    answerCallbackQuery: actions.answerCallbackQuery.initialState,
    answerInlineQuery: actions.answerInlineQuery.initialState,
    answerPreCheckoutQuery: actions.answerPreCheckoutQuery.initialState,
    answerShippingQuery: actions.answerShippingQuery.initialState,
    chosenInlineResult: actions.chosenInlineResult.initialState,
    createNewStickerSet: actions.createNewStickerSet.initialState,
    deleteChatPhoto: actions.deleteChatPhoto.initialState,
    deleteChatStickerSet: actions.ddeleteChatStickerSet.initialState,
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
  const state$ValueMessageQueryMessageUndefined: IState = {
    ...initialState,
    message: {
      query: {
        message: undefined,
        update_id: 0
      }
    }
  };
  const stateResult: IState = {
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

  let testScheduler: TestScheduler;

  beforeEach((): void => {
    testScheduler = new TestScheduler((actual: IState, expected: IState):
      | boolean
      | void => {
      expect(actual).toEqual(expected);
    });
  });

  test("should handle error state$ undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<Action<string>> = cold("-a", {
        a: { type: actions.answerInlineQuery.ANSWER_INLINE_QUERY_ERROR }
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {};
      const output$: Observable<IActionSendMessage> = epic.appError(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("-a", {
        a: actions.sendMessage.error({
          error: new Error(texts.state$Undefined)
        })
      });
    });
  });

  test("should handle error state$ValueMessageQuery undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<Action<string>> = cold("-a", {
        a: { type: actions.answerInlineQuery.ANSWER_INLINE_QUERY_ERROR }
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        initialState
      );
      const dependencies: IDependencies = {};
      const output$: Observable<IActionSendMessage> = epic.appError(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("-a", {
        a: actions.sendMessage.error({
          error: new Error(texts.state$ValueMessageQueryUndefined)
        })
      });
    });
  });

  test("should handle error state$ValueMessageQueryMessage undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<Action<string>> = cold("-a", {
        a: { type: actions.answerInlineQuery.ANSWER_INLINE_QUERY_ERROR }
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        state$ValueMessageQueryMessageUndefined
      );
      const dependencies: IDependencies = {};
      const output$: Observable<IActionSendMessage> = epic.appError(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("-a", {
        a: actions.sendMessage.error({
          error: new Error(texts.state$ValueMessageQueryMessageUndefined)
        })
      });
    });
  });

  test("should handle result", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<Action<string>> = cold("-a", {
        a: { type: actions.answerInlineQuery.ANSWER_INLINE_QUERY_ERROR }
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        stateResult
      );
      const dependencies: IDependencies = {};
      const output$: Observable<IActionSendMessage> = epic.appError(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("-a", {
        a: actions.sendMessage.query({
          query: {
            chat_id: ((state$.value.message.query as IStateMessageQuery)
              .message as IMessage).chat.id,
            disable_notification: true,
            disable_web_page_preview: true,
            parse_mode: "HTML",
            reply_markup: { remove_keyboard: true },
            reply_to_message_id: ((state$.value.message
              .query as IStateMessageQuery).message as IMessage).message_id,
            text: texts.messageError
          }
        })
      });
    });
  });
});
