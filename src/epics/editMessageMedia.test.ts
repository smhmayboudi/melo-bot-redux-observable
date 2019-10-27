import { StateObservable } from "redux-observable";
import { Observable } from "rxjs";
import { ColdObservable } from "rxjs/internal/testing/ColdObservable";
import { RunHelpers } from "rxjs/internal/testing/TestScheduler";
import { TestScheduler } from "rxjs/testing";

import { IActionEditMessageMedia } from "../../types/iActionEditMessageMedia";
import { IDependencies } from "../../types/iDependencies";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import { IStateEditMessageMediaQuery } from "../../types/iStateEditMessageMediaQuery";
import { IMessage } from "../../types/telegramBot/types/iMessage";
import * as actions from "../actions";
import * as texts from "../configs/texts";
import * as epic from "../epics/editMessageMedia";

describe("editMessageMedia epic", (): void => {
  const error: Error = new Error("");
  const query: IStateEditMessageMediaQuery = {
    media: {
      media: "",
      type: ""
    },
    reply_markup: {
      inline_keyboard: [
        [
          {
            login_url: {
              url: ""
            },
            text: ""
          }
        ]
      ]
    }
  };
  const result: IMessage = {
    chat: {
      id: 0,
      type: "private"
    },
    date: 0,
    message_id: 0
  };
  const responseOKF: IResponse = {
    ok: false
  };
  const responseOKT: IResponse = {
    ok: true,
    result
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
      const action$: ColdObservable<IActionEditMessageMedia> = cold("-a", {
        a: actions.editMessageMedia.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: undefined,
        requestsObservable: (): ColdObservable<any> => cold("--a")
      };
      const output$: Observable<
        IActionEditMessageMedia | IActionEditMessageMedia
      > = epic.editMessageMedia(action$, state$, dependencies);
      expectObservable(output$).toBe("-a", {
        a: actions.editMessageMedia.error({
          error: new Error(texts.epicDependencyBotTokenUndefined)
        })
      });
    });
  });

  test("should handle dependency requestsObservable undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionEditMessageMedia> = cold("-a", {
        a: actions.editMessageMedia.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        requestsObservable: undefined
      };
      const output$: Observable<
        IActionEditMessageMedia | IActionEditMessageMedia
      > = epic.editMessageMedia(action$, state$, dependencies);
      expectObservable(output$).toBe("-a", {
        a: actions.editMessageMedia.error({
          error: new Error(texts.epicDependencyRequestsObservableUndefined)
        })
      });
    });
  });

  test("should handle dependency requestsObservable error", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionEditMessageMedia> = cold("-a", {
        a: actions.editMessageMedia.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        requestsObservable: (): ColdObservable<any> => cold("--#", {}, error)
      };
      const output$: Observable<
        IActionEditMessageMedia | IActionEditMessageMedia
      > = epic.editMessageMedia(action$, state$, dependencies);
      expectObservable(output$).toBe("---a", {
        a: actions.editMessageMedia.error({ error })
      });
    });
  });

  test("should handle error actionEditMessageMediaQuery undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: Observable<IActionEditMessageMedia> = cold("-a", {
        a: actions.editMessageMedia.query({})
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        requestsObservable: (): ColdObservable<any> => cold("--a")
      };
      const output$: Observable<
        IActionEditMessageMedia | IActionEditMessageMedia
      > = epic.editMessageMedia(action$, state$, dependencies);
      expectObservable(output$).toBe("-a", {
        a: actions.editMessageMedia.error({
          error: new Error(texts.actionEditMessageMediaQueryUndefined)
        })
      });
    });
  });

  test("should handle result ok false", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionEditMessageMedia> = cold("-a", {
        a: actions.editMessageMedia.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: responseOKF })
      };
      const output$: Observable<
        IActionEditMessageMedia
      > = epic.editMessageMedia(action$, state$, dependencies);
      expectObservable(output$).toBe("---a", {
        a: actions.editMessageMedia.error({ error: responseOKF })
      });
    });
  });

  test("should handle result ok true", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionEditMessageMedia> = cold("-a", {
        a: actions.editMessageMedia.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: responseOKT })
      };
      const output$: Observable<
        IActionEditMessageMedia
      > = epic.editMessageMedia(action$, state$, dependencies);
      expectObservable(output$).toBe("---a", {
        a: actions.editMessageMedia.result({ result })
      });
    });
  });
});
