import { youtube_v3 } from "googleapis";
import { StateObservable } from "redux-observable";
import { Observable, Subject } from "rxjs";
import { ColdObservable } from "rxjs/internal/testing/ColdObservable";
import { RunHelpers } from "rxjs/internal/testing/TestScheduler";
import { TestScheduler } from "rxjs/testing";

import { IActionSendMessage } from "../../types/iActionSendMessage";
import { IActionYoutubeVideoList } from "../../types/iActionYoutubeVideoList";
import { IDependencies } from "../../types/iDependencies";
import { IState } from "../../types/iState";
import { IStateMessage } from "../../types/iStateMessage";
import { IStateSendMessageQuery } from "../../types/iStateSendMessageQuery";
import { IStateYoutubeVideoListQuery } from "../../types/iStateYoutubeVideoListQuery";
import * as actions from "../actions";
import * as texts from "../configs/texts";
import { transformVideoList } from "../utils/string";

import * as epic from "./youtubeVideoList";

describe("youtubeVideoList epic", (): void => {
  const error: Error = new Error("");
  const initialState: IState = {
    answerInlineQuery: actions.answerInlineQuery.initialState,
    getChatMember: actions.getChatMember.initialState,
    inlineQuery: actions.inlineQuery.initialState,
    literate: actions.literate.initialState,
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
    youtubeVideoList: {
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
    youtubeVideoList: {
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
  const state$ValueYoutubeVideoListQuery: IState = {
    ...initialState,
    message,
    youtubeVideoList: {
      query: undefined,
      result: undefined
    }
  };
  const result: youtube_v3.Schema$VideoListResponse = {
    items: [
      {
        id: "",
        snippet: {
          title: ""
        }
      }
    ]
  };
  const query: IStateYoutubeVideoListQuery = {
    key: ""
  };
  const resultState: IState = {
    ...initialState,
    message,
    youtubeVideoList: {
      query,
      result
    }
  };
  const actionYoutubeVideoListResultItems: youtube_v3.Schema$VideoListResponse = {
    items: undefined
  };
  const sendMessageQuery: IStateSendMessageQuery = {
    chat_id: 0,
    disable_notification: true,
    disable_web_page_preview: true,
    parse_mode: "HTML",
    reply_markup: {
      remove_keyboard: true
    },
    reply_to_message_id: 0,
    text: transformVideoList([
      {
        id: "",
        snippet: { title: "" }
      }
    ])
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
      const action$: ColdObservable<IActionYoutubeVideoList> = cold("-a", {
        a: actions.youtubeVideoList.query({
          query
        })
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        resultState
      );
      const dependencies: IDependencies = {
        requestsObservable: undefined
      };
      const output$: Observable<
        IActionYoutubeVideoList | IActionSendMessage
      > = epic.youtubeVideoList(action$, state$, dependencies);
      expectObservable(output$).toBe("-a", {
        a: actions.youtubeVideoList.error({
          error: new Error(texts.epicDependencyRequestsObservableUndefined)
        })
      });
    });
  });

  test("should handle dependency requestsObservable error", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionYoutubeVideoList> = cold("-a", {
        a: actions.youtubeVideoList.query({
          query
        })
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        resultState
      );
      const dependencies: IDependencies = {
        requestsObservable: (): ColdObservable<any> => cold("--#", {}, error)
      };
      const output$: Observable<
        IActionYoutubeVideoList | IActionSendMessage
      > = epic.youtubeVideoList(action$, state$, dependencies);
      expectObservable(output$).toBe("---a", {
        a: actions.youtubeVideoList.error({
          error
        })
      });
    });
  });

  test("should handle error actionYoutubeVideoListQuery undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionYoutubeVideoList> = cold("-a", {
        a: actions.youtubeVideoList.query({})
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        resultState
      );
      const dependencies: IDependencies = {
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: result })
      };
      const output$: Observable<
        IActionYoutubeVideoList | IActionSendMessage
      > = epic.youtubeVideoList(action$, state$, dependencies);
      expectObservable(output$).toBe("-a", {
        a: actions.youtubeVideoList.error({
          error: new Error(texts.actionYoutubeVideoListQueryUndefined)
        })
      });
    });
  });

  test("should handle error actionYoutubeVideoListResult undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionYoutubeVideoList> = cold("-a", {
        a: actions.youtubeVideoList.query({
          query
        })
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        resultState
      );
      const dependencies: IDependencies = {
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: undefined })
      };
      const output$: Observable<
        IActionYoutubeVideoList | IActionSendMessage
      > = epic.youtubeVideoList(action$, state$, dependencies);
      expectObservable(output$).toBe("---a", {
        a: actions.youtubeVideoList.error({
          error: new Error(texts.actionYoutubeVideoListResultUndefined)
        })
      });
    });
  });

  test("should handle error actionYoutubeVideoListResultItems undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionYoutubeVideoList> = cold("-a", {
        a: actions.youtubeVideoList.query({
          query
        })
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        resultState
      );
      const dependencies: IDependencies = {
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: actionYoutubeVideoListResultItems })
      };
      const output$: Observable<
        IActionYoutubeVideoList | IActionSendMessage
      > = epic.youtubeVideoList(action$, state$, dependencies);
      expectObservable(output$).toBe("---a", {
        a: actions.youtubeVideoList.error({
          error: new Error(texts.actionYoutubeVideoListResultItemsUndefined)
        })
      });
    });
  });

  test("should handle error state$ undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionYoutubeVideoList> = cold("-a", {
        a: actions.youtubeVideoList.query({
          query
        })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: result })
      };
      const output$: Observable<
        IActionYoutubeVideoList | IActionSendMessage
      > = epic.youtubeVideoList(action$, state$, dependencies);
      expectObservable(output$).toBe("---a", {
        a: actions.youtubeVideoList.error({
          error: new Error(texts.state$Undefined)
        })
      });
    });
  });

  test("should handle error state$ValueMessageQuery undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionYoutubeVideoList> = cold("-a", {
        a: actions.youtubeVideoList.query({
          query
        })
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
        IActionYoutubeVideoList | IActionSendMessage
      > = epic.youtubeVideoList(action$, state$, dependencies);
      expectObservable(output$).toBe("---a", {
        a: actions.youtubeVideoList.error({
          error: new Error(texts.state$ValueMessageQueryUndefined)
        })
      });
    });
  });

  test("should handle error state$ValueMessageQueryMessage undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionYoutubeVideoList> = cold("-a", {
        a: actions.youtubeVideoList.query({
          query
        })
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
        IActionYoutubeVideoList | IActionSendMessage
      > = epic.youtubeVideoList(action$, state$, dependencies);
      expectObservable(output$).toBe("---a", {
        a: actions.youtubeVideoList.error({
          error: new Error(texts.state$ValueMessageQueryMessageUndefined)
        })
      });
    });
  });

  test("should handle error state$ValueYoutubeVideoListQuery undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionYoutubeVideoList> = cold("-a", {
        a: actions.youtubeVideoList.query({
          query
        })
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        state$ValueYoutubeVideoListQuery
      );
      const dependencies: IDependencies = {
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: result })
      };
      const output$: Observable<
        IActionYoutubeVideoList | IActionSendMessage
      > = epic.youtubeVideoList(action$, state$, dependencies);
      expectObservable(output$).toBe("---a", {
        a: actions.youtubeVideoList.error({
          error: new Error(texts.state$ValueYoutubeVideoListQueryUndefined)
        })
      });
    });
  });

  test("should handle result", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionYoutubeVideoList> = cold("-a", {
        a: actions.youtubeVideoList.query({
          query
        })
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        resultState
      );
      const dependencies: IDependencies = {
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: result })
      };
      const output$: Observable<
        IActionYoutubeVideoList | IActionSendMessage
      > = epic.youtubeVideoList(action$, state$, dependencies);
      expectObservable(output$).toBe("---a", {
        a: actions.sendMessage.query({
          query: sendMessageQuery
        })
      });
    });
  });
});
