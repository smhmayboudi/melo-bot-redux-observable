import { StateObservable } from "redux-observable";
import { Observable, Subject } from "rxjs";
import { ColdObservable } from "rxjs/internal/testing/ColdObservable";
import { RunHelpers } from "rxjs/internal/testing/TestScheduler";
import { TestScheduler } from "rxjs/testing";

import { IActionSendMessage } from "../../types/iActionSendMessage";
import { IActionShortenList } from "../../types/iActionShortenList";
import { IDependencies } from "../../types/iDependencies";
import { IState } from "../../types/iState";
import { IStateShortenListQuery } from "../../types/iStateShortenListQuery";
import { IStateShortenListResult } from "../../types/iStateShortenListResult";
import * as actions from "../actions";
import * as texts from "../configs/texts";
import * as epic from "../epics/shortenList";
import { initialDependencies } from "../utils/dependencies";
import { initialState } from "../utils/store";

describe("shortenList epic", (): void => {
  const error: Error = new Error("");
  const query: IStateShortenListQuery = {};
  const result: IStateShortenListResult[] = [
    {
      alphabet: "",
      count: 0,
      date: null,
      id: 0,
      longLink: "",
      longBase64: null,
      shortLink: ""
    }
  ];
  const resultQuery = [
    {
      alphabet: "",
      count: 0,
      date: null,
      id: 0,
      long_link: "",
      long_base64: null,
      short_link: ""
    }
  ];
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

  let testScheduler: TestScheduler;

  beforeEach((): void => {
    testScheduler = new TestScheduler((actual: IState, expected: IState):
      | boolean
      | void => {
      expect(actual).toEqual(expected);
    });
  });

  test("should handle dependency connectionObservable error", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionShortenList> = cold("-a", {
        a: actions.shortenList.query({ query })
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        state$Value
      );
      const dependencies: IDependencies = {
        ...initialDependencies,
        connectionObservable: (): ColdObservable<any> => cold("--#", {}, error),
        queryObservable: (): ColdObservable<any> =>
          cold("--a", { a: resultQuery })
      };
      const output$: Observable<
        IActionSendMessage | IActionShortenList
      > = epic.shortenList(action$, state$, dependencies);
      expectObservable(output$).toBe("---a", {
        a: actions.shortenList.error({ error })
      });
    });
  });

  test("should handle dependency queryObservable error", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionShortenList> = cold("-a", {
        a: actions.shortenList.query({ query })
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        state$Value
      );
      const dependencies: IDependencies = {
        ...initialDependencies,
        connectionObservable: (): ColdObservable<any> => cold("--a"),
        queryObservable: (): ColdObservable<any> => cold("--#", {}, error)
      };
      const output$: Observable<
        IActionSendMessage | IActionShortenList
      > = epic.shortenList(action$, state$, dependencies);
      expectObservable(output$).toBe("-----a", {
        a: actions.shortenList.error({ error })
      });
    });
  });

  test("should handle error actionShortenListQuery undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: Observable<IActionShortenList> = cold("-a", {
        a: actions.shortenList.query({ query: undefined })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initialDependencies,
        connectionObservable: (): ColdObservable<any> => cold("--a"),
        queryObservable: (): ColdObservable<any> =>
          cold("--a", { a: resultQuery })
      };
      const output$: Observable<
        IActionSendMessage | IActionShortenList
      > = epic.shortenList(action$, state$, dependencies);
      expectObservable(output$).toBe("---a", {
        a: actions.shortenList.error({
          error: new Error(texts.actionShortenListQueryUndefined)
        })
      });
    });
  });

  test("should handle error actionShortenListQueryShortLink empty", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: Observable<IActionShortenList> = cold("-a", {
        a: actions.shortenList.query({ query: { shortLink: "" } })
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        state$Value
      );
      const dependencies: IDependencies = {
        ...initialDependencies,
        connectionObservable: (): ColdObservable<any> => cold("--a"),
        queryObservable: (): ColdObservable<any> =>
          cold("--a", { a: resultQuery })
      };
      const output$: Observable<
        IActionSendMessage | IActionShortenList
      > = epic.shortenList(action$, state$, dependencies);
      expectObservable(output$).toBe("-----a", {
        a: actions.shortenList.result({ result })
      });
    });
  });

  test("should handle error actionShortenListQueryShortLink not empty", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: Observable<IActionShortenList> = cold("-a", {
        a: actions.shortenList.query({ query: { shortLink: "test" } })
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        state$Value
      );
      const dependencies: IDependencies = {
        ...initialDependencies,
        connectionObservable: (): ColdObservable<any> => cold("--a"),
        queryObservable: (): ColdObservable<any> =>
          cold("--a", { a: resultQuery })
      };
      const output$: Observable<
        IActionSendMessage | IActionShortenList
      > = epic.shortenList(action$, state$, dependencies);
      expectObservable(output$).toBe("-----a", {
        a: actions.shortenList.result({ result })
      });
    });
  });

  test("should handle result rows null", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionShortenList> = cold("-a", {
        a: actions.shortenList.query({ query })
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        state$Value
      );
      const dependencies: IDependencies = {
        ...initialDependencies,
        connectionObservable: (): ColdObservable<any> => cold("--a"),
        queryObservable: (): ColdObservable<any> => cold("--a", { a: null })
      };
      const output$: Observable<
        IActionSendMessage | IActionShortenList
      > = epic.shortenList(action$, state$, dependencies);
      expectObservable(output$).toBe("-----a", {
        a: actions.shortenList.result({ result: undefined })
      });
    });
  });

  test("should handle result", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionShortenList> = cold("-a", {
        a: actions.shortenList.query({ query })
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        state$Value
      );
      const dependencies: IDependencies = {
        ...initialDependencies,
        connectionObservable: (): ColdObservable<any> => cold("--a"),
        queryObservable: (): ColdObservable<any> =>
          cold("--a", { a: resultQuery })
      };
      const output$: Observable<
        IActionSendMessage | IActionShortenList
      > = epic.shortenList(action$, state$, dependencies);
      expectObservable(output$).toBe("-----a", {
        a: actions.shortenList.result({ result })
      });
    });
  });
});
