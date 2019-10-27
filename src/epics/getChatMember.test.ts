import { StateObservable } from "redux-observable";
import { Observable, Subject } from "rxjs";
import { ColdObservable } from "rxjs/internal/testing/ColdObservable";
import { RunHelpers } from "rxjs/internal/testing/TestScheduler";
import { TestScheduler } from "rxjs/testing";

import { IActionGetChatMember } from "../../types/iActionGetChatMember";
import { IActionSendMessage } from "../../types/iActionSendMessage";
import { IDependencies } from "../../types/iDependencies";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import { IStateGetChatMemberQuery } from "../../types/iStateGetChatMemberQuery";
import { IStateMessageQuery } from "../../types/iStateMessageQuery";
import { IChatMember } from "../../types/telegramBot/types/iChatMember";
import * as actions from "../actions";
import * as texts from "../configs/texts";
import * as epic from "../epics/getChatMember";

describe("getChatMember epic", (): void => {
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
  const state$ValueMessageQueryUndefined: IState = {
    ...stateResult,
    message: {
      ...stateResult.message,
      query: undefined
    }
  };
  const state$ValueMessageQueryMessageUndefined: IState = {
    ...stateResult,
    message: {
      ...stateResult.message,
      query: {
        ...(stateResult.message.query as IStateMessageQuery),
        message: undefined
      }
    }
  };
  const error: Error = new Error("");
  const query: IStateGetChatMemberQuery = {
    chat_id: 0,
    user_id: 0
  };
  const result: IChatMember = {
    status: "left",
    user: {
      first_name: "",
      id: 0,
      is_bot: false
    }
  };
  const resultLeft: IChatMember = {
    ...result,
    status: "left"
  };
  const resultMember: IChatMember = {
    ...result,
    status: "member"
  };
  const responseOKF: IResponse = {
    description: "Bad Request: CHAT_ADMIN_REQUIRED",
    error_code: 400,
    ok: false
  };
  const responseOKT: IResponse = {
    ok: true,
    result
  };
  const responseOKTLeft: IResponse = {
    ...responseOKT,
    result: resultLeft
  };
  const responseOKTMember: IResponse = {
    ...responseOKT,
    result: resultMember
  };

  let testScheduler: TestScheduler;

  beforeEach((): void => {
    testScheduler = new TestScheduler((actual: IState, expected: IState):
      | boolean
      | void => {
      expect(actual).toEqual(expected);
    });
  });

  test("should handle dependency botToken undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionGetChatMember> = cold("-a", {
        a: actions.getChatMember.query({ query })
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        stateResult
      );
      const dependencies: IDependencies = {
        botToken: undefined,
        requestsObservable: (): ColdObservable<any> => cold("--a")
      };
      const output$: Observable<
        IActionGetChatMember | IActionSendMessage
      > = epic.getChatMember(action$, state$, dependencies);
      expectObservable(output$).toBe("-a)", {
        a: actions.getChatMember.error({
          error: new Error(texts.epicDependencyBotTokenUndefined)
        })
      });
    });
  });

  test("should handle dependency requestsObservable undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionGetChatMember> = cold("-a", {
        a: actions.getChatMember.query({ query })
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        stateResult
      );
      const dependencies: IDependencies = {
        botToken: "",
        requestsObservable: undefined
      };
      const output$: Observable<
        IActionGetChatMember | IActionSendMessage
      > = epic.getChatMember(action$, state$, dependencies);
      expectObservable(output$).toBe("-a", {
        a: actions.getChatMember.error({
          error: new Error(texts.epicDependencyRequestsObservableUndefined)
        })
      });
    });
  });

  test("should handle dependency requestsObservable error", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionGetChatMember> = cold("-a", {
        a: actions.getChatMember.query({ query })
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        stateResult
      );
      const dependencies: IDependencies = {
        botToken: "",
        requestsObservable: (): ColdObservable<any> => cold("--#", {}, error)
      };
      const output$: Observable<
        IActionGetChatMember | IActionSendMessage
      > = epic.getChatMember(action$, state$, dependencies);
      expectObservable(output$).toBe("---a", {
        a: actions.getChatMember.error({ error })
      });
    });
  });

  test("should handle error actionGetChatMemberQuery undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: Observable<IActionGetChatMember> = cold("-a", {
        a: actions.getChatMember.query({})
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        stateResult
      );
      const dependencies: IDependencies = {
        botToken: "",
        requestsObservable: (): ColdObservable<any> => cold("--a")
      };
      const output$: Observable<
        IActionGetChatMember | IActionSendMessage
      > = epic.getChatMember(action$, state$, dependencies);
      expectObservable(output$).toBe("-a", {
        a: actions.getChatMember.error({
          error: new Error(texts.actionGetChatMemberQueryUndefined)
        })
      });
    });
  });

  test("should handle error state$ undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionGetChatMember> = cold("-a", {
        a: actions.getChatMember.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: responseOKTLeft })
      };
      const output$: Observable<
        IActionGetChatMember | IActionSendMessage
      > = epic.getChatMember(action$, state$, dependencies);
      expectObservable(output$).toBe("---a", {
        a: actions.getChatMember.error({
          error: new Error(texts.state$Undefined)
        })
      });
    });
  });

  test("should handle error state$ValueMessageQuery undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionGetChatMember> = cold("-a", {
        a: actions.getChatMember.query({ query })
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        state$ValueMessageQueryUndefined
      );
      const dependencies: IDependencies = {
        botToken: "",
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: responseOKTLeft })
      };
      const output$: Observable<
        IActionGetChatMember | IActionSendMessage
      > = epic.getChatMember(action$, state$, dependencies);
      expectObservable(output$).toBe("---a", {
        a: actions.getChatMember.error({
          error: new Error(texts.state$ValueMessageQueryUndefined)
        })
      });
    });
  });

  test("should handle error state$ValueMessageQueryMessage undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionGetChatMember> = cold("-a", {
        a: actions.getChatMember.query({ query })
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        state$ValueMessageQueryMessageUndefined
      );
      const dependencies: IDependencies = {
        botToken: "",
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: responseOKTLeft })
      };
      const output$: Observable<
        IActionGetChatMember | IActionSendMessage
      > = epic.getChatMember(action$, state$, dependencies);
      expectObservable(output$).toBe("---a", {
        a: actions.getChatMember.error({
          error: new Error(texts.state$ValueMessageQueryMessageUndefined)
        })
      });
    });
  });

  test("should handle result ok false", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionGetChatMember> = cold("-a", {
        a: actions.getChatMember.query({ query })
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        stateResult
      );
      const dependencies: IDependencies = {
        botToken: "",
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: responseOKF })
      };
      const output$: Observable<
        IActionGetChatMember | IActionSendMessage
      > = epic.getChatMember(action$, state$, dependencies);
      expectObservable(output$).toBe("---a", {
        a: actions.getChatMember.error({ error: responseOKF })
      });
    });
  });

  test("should handle result ok true left", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionGetChatMember> = cold("-a", {
        a: actions.getChatMember.query({ query })
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        stateResult
      );
      const dependencies: IDependencies = {
        botToken: "",
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: responseOKTLeft })
      };
      const output$: Observable<
        IActionGetChatMember | IActionSendMessage
      > = epic.getChatMember(action$, state$, dependencies);
      expectObservable(output$).toBe("---a", {
        a: actions.sendMessage.query({
          query: {
            chat_id: 0,
            disable_notification: true,
            disable_web_page_preview: true,
            parse_mode: "HTML",
            reply_markup: { remove_keyboard: true },
            reply_to_message_id: 0,
            text: texts.messageJoin
          }
        })
      });
    });
  });

  test("should handle result ok true member", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionGetChatMember> = cold("-a", {
        a: actions.getChatMember.query({ query })
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        stateResult
      );
      const dependencies: IDependencies = {
        botToken: "",
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: responseOKTMember })
      };
      const output$: Observable<
        IActionGetChatMember | IActionSendMessage
      > = epic.getChatMember(action$, state$, dependencies);
      expectObservable(output$).toBe("---a", {
        a: actions.getChatMember.result({ result: resultMember })
      });
    });
  });
});
