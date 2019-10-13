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
import { IStateMessage } from "../../types/iStateMessage";
import { IChatMember } from "../../types/telegramBot/types/iChatMember";
import * as actions from "../actions";
import * as texts from "../config/texts";
import * as epic from "../epics/getChatMember";

describe("getChatMember epic", (): void => {

  const error: Error = new Error("");
  const initialState: IState = {
    getChatMember: actions.getChatMember.initialState,
    literate: actions.literate.initialState,
    message: actions.message.initialState,
    sendAudio: actions.sendAudio.initialState,
    sendMessage: actions.sendMessage.initialState,
    sendVideo: actions.sendVideo.initialState,
    youtubeDownload: actions.youtubeDownload.initialState,
    youtubeSearchList: actions.youtubeSearchList.initialState,
    youtubeVideoList: actions.youtubeVideoList.initialState,
  };
  const state$ValueMessageQueryUndefined: IState = {
    ...initialState,
    message: {
      query: undefined,
    },
  };
  const state$ValueMessageQueryMessageUndefined: IState = {
    ...initialState,
    message: {
      query: {
        message: undefined,
        update_id: 0,
      },
    },
  };
  const message: IStateMessage = {
    query: {
      message: {
        chat: {
          id: 0,
          type: "",
        },
        date: 0,
        message_id: 0,
      },
      update_id: 0,
    },
  };
  const resultState: IState = {
    ...initialState,
    message,
  };
  const query: IStateGetChatMemberQuery = {
    chat_id: 0,
    user_id: 0,
  };
  const resultLeft: IChatMember = {
    status: "left",
    user: {
      first_name: "",
      id: 0,
      is_bot: false,
    },
  };
  const resultMember: IChatMember = {
    status: "member",
    user: {
      first_name: "",
      id: 0,
      is_bot: false,
    },
  };
  const resultOKF: IResponse = {
    description: "Bad Request: CHAT_ADMIN_REQUIRED",
    error_code: 400,
    ok: false,
  };
  const resultOKTLeft: IResponse = {
    ok: true,
    result: resultLeft,
  };
  const resultOKTMember: IResponse = {
    ok: true,
    result: resultMember,
  };

  let testScheduler: TestScheduler;

  beforeEach((): void => {
    testScheduler = new TestScheduler(
      (actual: IState, expected: IState): boolean | void => {
        expect(actual)
          .toEqual(expected);
      },
    );
  });

  test("should handle dependency botToken undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionGetChatMember> = cold("-a", {
        a: actions.getChatMember.query({
          query,
        }),
      });
      const state$: StateObservable<IState> | undefined =
        new StateObservable(new Subject(), resultState);
      const dependencies: IDependencies = {
        botToken: undefined,
        requestsObservable: (): ColdObservable<any> => cold("--a"),
      };
      const output$: Observable<IActionGetChatMember | IActionSendMessage> =
        epic.getChatMember(action$, state$, dependencies);
      expectObservable(output$)
        .toBe("-(ab)", {
          a: actions.sendMessage.error({
            error: new Error(texts.epicDependencyBotTokenUndefined),
          }),
          b: actions.getChatMember.error({
            error: new Error(texts.epicDependencyBotTokenUndefined),
          }),
        });
    });
  });

  test("should handle dependency requestsObservable undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionGetChatMember> = cold("-a", {
        a: actions.getChatMember.query({
          query,
        }),
      });
      const state$: StateObservable<IState> | undefined =
        new StateObservable(new Subject(), resultState);
      const dependencies: IDependencies = {
        botToken: "",
        requestsObservable: undefined,
      };
      const output$: Observable<IActionGetChatMember | IActionSendMessage> =
        epic.getChatMember(action$, state$, dependencies);
      expectObservable(output$)
        .toBe("-(ab)", {
          a: actions.sendMessage.error({
            error: new Error(texts.epicDependencyRequestsObservableUndefined),
          }),
          b: actions.getChatMember.error({
            error: new Error(texts.epicDependencyRequestsObservableUndefined),
          }),
        });
    });
  });

  test("should handle dependency requestsObservable error", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionGetChatMember> = cold("-a", {
        a: actions.getChatMember.query({
          query,
        }),
      });
      const state$: StateObservable<IState> | undefined =
        new StateObservable(new Subject(), resultState);
      const dependencies: IDependencies = {
        botToken: "",
        requestsObservable: (): ColdObservable<any> => cold("--#", {}, error),
      };
      const output$: Observable<IActionGetChatMember | IActionSendMessage> =
        epic.getChatMember(action$, state$, dependencies);
      expectObservable(output$)
        .toBe("---(ab)", {
          a: actions.sendMessage.error({
            error,
          }),
          b: actions.getChatMember.error({
            error,
          }),
        });
    });
  });

  test("should handle error actionGetChatMemberQuery undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: Observable<IActionGetChatMember> = cold("-a", {
        a: actions.getChatMember.query({}),
      });
      const state$: StateObservable<IState> | undefined =
        new StateObservable(new Subject(), resultState);
      const dependencies: IDependencies = {
        botToken: "",
        requestsObservable: (): ColdObservable<any> => cold("--a"),
      };
      const output$: Observable<IActionGetChatMember | IActionSendMessage> =
        epic.getChatMember(action$, state$, dependencies);
      expectObservable(output$)
        .toBe("-(ab)", {
          a: actions.sendMessage.error({
            error: new Error(texts.actionGetChatMemberQueryUndefined),
          }),
          b: actions.getChatMember.error({
            error: new Error(texts.actionGetChatMemberQueryUndefined),
          }),
        });
    });
  });

  test("should handle error state$ undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionGetChatMember> = cold("-a", {
        a: actions.getChatMember.query({
          query,
        }),
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        requestsObservable: (): ColdObservable<any> => cold("--a", {
          a: resultOKTMember,
        }),
      };
      const output$: Observable<IActionGetChatMember | IActionSendMessage> =
        epic.getChatMember(action$, state$, dependencies);
      expectObservable(output$)
        .toBe("---(ab)", {
          a: actions.sendMessage.error({
            error: new Error(texts.state$Undefined),
          }),
          b: actions.getChatMember.result({
            result: resultMember,
          }),
        });
    });
  });

  test("should handle error state$ValueMessageQuery undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionGetChatMember> = cold("-a", {
        a: actions.getChatMember.query({
          query,
        }),
      });
      const state$: StateObservable<IState> | undefined =
        new StateObservable(new Subject(), state$ValueMessageQueryUndefined);
      const dependencies: IDependencies = {
        botToken: "",
        requestsObservable: (): ColdObservable<any> => cold("--a", {
          a: resultOKTMember,
        }),
      };
      const output$: Observable<IActionGetChatMember | IActionSendMessage> =
        epic.getChatMember(action$, state$, dependencies);
      expectObservable(output$)
        .toBe("---(ab)", {
          a: actions.sendMessage.error({
            error: new Error(texts.state$ValueMessageQueryUndefined),
          }),
          b: actions.getChatMember.result({
            result: resultMember,
          }),
        });
    });
  });

  test("should handle error state$ValueMessageQueryMessage undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionGetChatMember> = cold("-a", {
        a: actions.getChatMember.query({
          query,
        }),
      });
      const state$: StateObservable<IState> | undefined =
        new StateObservable(new Subject(), state$ValueMessageQueryMessageUndefined);
      const dependencies: IDependencies = {
        botToken: "",
        requestsObservable: (): ColdObservable<any> => cold("--a", {
          a: resultOKTMember,
        }),
      };
      const output$: Observable<IActionGetChatMember | IActionSendMessage> =
        epic.getChatMember(action$, state$, dependencies);
      expectObservable(output$)
        .toBe("---(ab)", {
          a: actions.sendMessage.error({
            error: new Error(texts.state$ValueMessageQueryMessageUndefined),
          }),
          b: actions.getChatMember.result({
            result: resultMember,
          }),
        });
    });
  });

  test("should handle result ok false", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionGetChatMember> = cold("-a", {
        a: actions.getChatMember.query({
          query,
        }),
      });
      const state$: StateObservable<IState> | undefined =
        new StateObservable(new Subject(), resultState);
      const dependencies: IDependencies = {
        botToken: "",
        requestsObservable: (): ColdObservable<any> => cold("--a", {
          a: resultOKF,
        }),
      };
      const output$: Observable<IActionGetChatMember | IActionSendMessage> =
        epic.getChatMember(action$, state$, dependencies);
      expectObservable(output$)
        .toBe("---(ab)", {
          a: actions.sendMessage.error({
            error: resultOKF,
          }),
          b: actions.getChatMember.error({
            error: resultOKF,
          }),
        });
    });
  });

  test("should handle result ok true left", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionGetChatMember> = cold("-a", {
        a: actions.getChatMember.query({
          query,
        }),
      });
      const state$: StateObservable<IState> | undefined =
        new StateObservable(new Subject(), resultState);
      const dependencies: IDependencies = {
        botToken: "",
        requestsObservable: (): ColdObservable<any> => cold("--a", {
          a: resultOKTLeft,
        }),
      };
      const output$: Observable<IActionGetChatMember | IActionSendMessage> =
        epic.getChatMember(action$, state$, dependencies);
      expectObservable(output$)
        .toBe("---(ab)", {
          a: actions.sendMessage.query({
            query: {
              chat_id: 0,
              disable_notification: true,
              disable_web_page_preview: true,
              parse_mode: "HTML",
              reply_markup: { remove_keyboard: true },
              reply_to_message_id: 0,
              text: texts.messageJoin,
            },
          }),
          b: actions.getChatMember.result({
            result: resultLeft,
          }),
        });
    });
  });

  test("should handle result ok true member", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionGetChatMember> = cold("-a", {
        a: actions.getChatMember.query({
          query,
        }),
      });
      const state$: StateObservable<IState> | undefined =
        new StateObservable(new Subject(), resultState);
      const dependencies: IDependencies = {
        botToken: "",
        requestsObservable: (): ColdObservable<any> => cold("--a", {
          a: resultOKTMember,
        }),
      };
      const output$: Observable<IActionGetChatMember | IActionSendMessage> =
        epic.getChatMember(action$, state$, dependencies);
      expectObservable(output$)
        .toBe("---a", {
          a: actions.getChatMember.result({
            result: resultMember,
          }),
        });
    });
  });

});
