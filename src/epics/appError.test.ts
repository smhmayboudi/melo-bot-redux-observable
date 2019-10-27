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
