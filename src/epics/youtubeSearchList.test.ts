import { youtube_v3 } from "googleapis";
import { StateObservable } from "redux-observable";
import { Observable, Subject } from "rxjs";
import { ColdObservable } from "rxjs/internal/testing/ColdObservable";
import { RunHelpers } from "rxjs/internal/testing/TestScheduler";
import { TestScheduler } from "rxjs/testing";

import { IActionAnswerInlineQuery } from "../../types/iActionAnswerInlineQuery";
import { IActionSendMessage } from "../../types/iActionSendMessage";
import { IActionYoutubeSearchList } from "../../types/iActionYoutubeSearchList";
import { IDependencies } from "../../types/iDependencies";
import { IState } from "../../types/iState";
import { IStateMessage } from "../../types/iStateMessage";
import { IStateYoutubeSearchListQuery } from "../../types/iStateYoutubeSearchListQuery";
import * as actions from "../actions";
import * as texts from "../configs/texts";
import { transformSearchList } from "../utils/string";

import * as epic from "./youtubeSearchList";

describe("youtubeSearchList epic", (): void => {
  const initialState: IState = {
    answerInlineQuery: actions.answerInlineQuery.initialState,
    chosenInlineResult: actions.chosenInlineResult.initialState,
    getChatMember: actions.getChatMember.initialState,
    inlineQuery: actions.inlineQuery.initialState,
    message: actions.message.initialState,
    sendAudio: actions.sendAudio.initialState,
    sendMessage: actions.sendMessage.initialState,
    sendVideo: actions.sendVideo.initialState,
    youtubeDownload: actions.youtubeDownload.initialState,
    youtubeSearchList: actions.youtubeSearchList.initialState,
    youtubeVideoList: actions.youtubeVideoList.initialState
  };
  const state$ValueMessageQueryUndefined: IState = {
    ...initialState,
    message: {
      query: undefined
    },
    youtubeSearchList: {
      query: undefined,
      result: undefined
    }
  };
  const state$ValueMessageQueryMessageUndefined: IState = {
    ...initialState,
    message: {
      query: {
        message: undefined,
        update_id: 0
      }
    },
    youtubeSearchList: {
      query: undefined,
      result: undefined
    }
  };
  const message: IStateMessage = {
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
  };
  const state$ValueYoutubeSearchListQuery: IState = {
    ...initialState,
    message,
    youtubeSearchList: {
      query: undefined,
      result: undefined
    }
  };
  const state$ValueYoutubeSearchListQueryQ: IState = {
    ...initialState,
    message,
    youtubeSearchList: {
      query: {
        key: "",
        q: undefined
      },
      result: undefined
    }
  };
  const error: Error = new Error("");
  const query: IStateYoutubeSearchListQuery = {
    key: "",
    q: ""
  };
  const result: youtube_v3.Schema$SearchListResponse = {
    items: [
      {
        id: {
          videoId: ""
        },
        snippet: {
          title: ""
        }
      }
    ]
  };
  const stateResult: IState = {
    ...initialState,
    message,
    youtubeSearchList: {
      query,
      result
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

  test("should handle dependency requestsObservable undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionYoutubeSearchList> = cold("-a", {
        a: actions.youtubeSearchList.query({ query })
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        stateResult
      );
      const dependencies: IDependencies = {
        requestsObservable: undefined
      };
      const output$: Observable<
        IActionYoutubeSearchList | IActionSendMessage | IActionAnswerInlineQuery
      > = epic.youtubeSearchList(action$, state$, dependencies);
      expectObservable(output$).toBe("-a", {
        a: actions.youtubeSearchList.error({
          error: new Error(texts.epicDependencyRequestsObservableUndefined)
        })
      });
    });
  });

  test("should handle dependency requestsObservable error", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionYoutubeSearchList> = cold("-a", {
        a: actions.youtubeSearchList.query({ query })
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        stateResult
      );
      const dependencies: IDependencies = {
        requestsObservable: (): ColdObservable<any> => cold("--#", {}, error)
      };
      const output$: Observable<
        IActionYoutubeSearchList | IActionSendMessage | IActionAnswerInlineQuery
      > = epic.youtubeSearchList(action$, state$, dependencies);
      expectObservable(output$).toBe("---a", {
        a: actions.youtubeSearchList.error({ error })
      });
    });
  });

  test("should handle error actionYoutubeSearchListQuery undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionYoutubeSearchList> = cold("-a", {
        a: actions.youtubeSearchList.query({})
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        stateResult
      );
      const dependencies: IDependencies = {
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: { items: undefined } })
      };
      const output$: Observable<
        IActionYoutubeSearchList | IActionSendMessage | IActionAnswerInlineQuery
      > = epic.youtubeSearchList(action$, state$, dependencies);
      expectObservable(output$).toBe("-a", {
        a: actions.youtubeSearchList.error({
          error: new Error(texts.actionYoutubeSearchListQueryUndefined)
        })
      });
    });
  });

  test("should handle error actionYoutubeSearchListResult undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionYoutubeSearchList> = cold("-a", {
        a: actions.youtubeSearchList.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: undefined })
      };
      const output$: Observable<
        IActionYoutubeSearchList | IActionSendMessage | IActionAnswerInlineQuery
      > = epic.youtubeSearchList(action$, state$, dependencies);
      expectObservable(output$).toBe("---a", {
        a: actions.youtubeSearchList.error({
          error: new Error(texts.actionYoutubeSearchListResultUndefined)
        })
      });
    });
  });

  test("should handle error actionYoutubeSearchListResultItems undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionYoutubeSearchList> = cold("-a", {
        a: actions.youtubeSearchList.query({ query })
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        stateResult
      );
      const dependencies: IDependencies = {
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: { items: undefined } })
      };
      const output$: Observable<
        IActionYoutubeSearchList | IActionSendMessage | IActionAnswerInlineQuery
      > = epic.youtubeSearchList(action$, state$, dependencies);
      expectObservable(output$).toBe("---a", {
        a: actions.youtubeSearchList.error({
          error: new Error(texts.actionYoutubeSearchListResultItemsUndefined)
        })
      });
    });
  });

  test("should handle error state$ undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionYoutubeSearchList> = cold("-a", {
        a: actions.youtubeSearchList.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: result })
      };
      const output$: Observable<
        IActionYoutubeSearchList | IActionSendMessage | IActionAnswerInlineQuery
      > = epic.youtubeSearchList(action$, state$, dependencies);
      expectObservable(output$).toBe("---a", {
        a: actions.youtubeSearchList.error({
          error: new Error(texts.state$Undefined)
        })
      });
    });
  });

  test("should handle error state$ValueMessageQuery undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionYoutubeSearchList> = cold("-a", {
        a: actions.youtubeSearchList.query({ query })
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        state$ValueMessageQueryUndefined
      );
      const dependencies: IDependencies = {
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: result })
      };
      const output$: Observable<
        IActionYoutubeSearchList | IActionSendMessage | IActionAnswerInlineQuery
      > = epic.youtubeSearchList(action$, state$, dependencies);
      expectObservable(output$).toBe("---a", {
        a: actions.youtubeSearchList.error({
          error: new Error(texts.state$ValueMessageQueryUndefined)
        })
      });
    });
  });

  test("should handle error state$ValueMessageQueryMessage undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionYoutubeSearchList> = cold("-a", {
        a: actions.youtubeSearchList.query({ query })
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        state$ValueMessageQueryMessageUndefined
      );
      const dependencies: IDependencies = {
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: result })
      };
      const output$: Observable<
        IActionYoutubeSearchList | IActionSendMessage | IActionAnswerInlineQuery
      > = epic.youtubeSearchList(action$, state$, dependencies);
      expectObservable(output$).toBe("---a", {
        a: actions.youtubeSearchList.error({
          error: new Error(texts.state$ValueMessageQueryMessageUndefined)
        })
      });
    });
  });

  test("should handle error state$ValueYoutubeSearchListQuery undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionYoutubeSearchList> = cold("-a", {
        a: actions.youtubeSearchList.query({ query })
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        state$ValueYoutubeSearchListQuery
      );
      const dependencies: IDependencies = {
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: result })
      };
      const output$: Observable<
        IActionYoutubeSearchList | IActionSendMessage | IActionAnswerInlineQuery
      > = epic.youtubeSearchList(action$, state$, dependencies);
      expectObservable(output$).toBe("---a", {
        a: actions.youtubeSearchList.error({
          error: new Error(texts.state$ValueYoutubeSearchListQueryUndefined)
        })
      });
    });
  });

  test("should handle error state$ValueYoutubeSearchListQueryQ undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionYoutubeSearchList> = cold("-a", {
        a: actions.youtubeSearchList.query({ query })
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        state$ValueYoutubeSearchListQueryQ
      );
      const dependencies: IDependencies = {
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: result })
      };
      const output$: Observable<
        IActionYoutubeSearchList | IActionSendMessage | IActionAnswerInlineQuery
      > = epic.youtubeSearchList(action$, state$, dependencies);
      expectObservable(output$).toBe("---a", {
        a: actions.youtubeSearchList.error({
          error: new Error(texts.state$ValueYoutubeSearchListQueryQUndefined)
        })
      });
    });
  });

  test("should handle result", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionYoutubeSearchList> = cold("-a", {
        a: actions.youtubeSearchList.query({ query })
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        stateResult
      );
      const dependencies: IDependencies = {
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: result })
      };
      const output$: Observable<
        IActionYoutubeSearchList | IActionSendMessage | IActionAnswerInlineQuery
      > = epic.youtubeSearchList(action$, state$, dependencies);
      expectObservable(output$).toBe("---a", {
        a: actions.sendMessage.query({
          query: {
            chat_id: 0,
            disable_notification: true,
            disable_web_page_preview: true,
            parse_mode: "HTML",
            reply_markup: { remove_keyboard: true },
            reply_to_message_id: 0,
            text: transformSearchList(
              result.items as youtube_v3.Schema$SearchResult[],
              ""
            )
          }
        })
      });
    });
  });
});
