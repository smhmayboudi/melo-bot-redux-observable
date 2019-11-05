import { StateObservable } from "redux-observable";
import { Observable } from "rxjs";
import { ColdObservable } from "rxjs/internal/testing/ColdObservable";
import { RunHelpers } from "rxjs/internal/testing/TestScheduler";
import { TestScheduler } from "rxjs/testing";

import { IActionYoutubeDownloadResultInsert } from "../../types/iActionYoutubeDownloadResultInsert";
import { IDependencies } from "../../types/iDependencies";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import { IStateYoutubeDownloadResultInsertQuery } from "../../types/iStateYoutubeDownloadResultInsertQuery";
import * as actions from "../actions";
import * as texts from "../configs/texts";
import * as epic from "../epics/youtubeDownloadResultInsert";

describe("youtubeDownloadResultInsert epic", (): void => {
  const error: Error = new Error("");
  const query: IStateYoutubeDownloadResultInsertQuery = {
    duration: 0,
    file_id: "",
    file_size: 0,
    height: 0,
    id: "",
    mime_type: "",
    thumb: {
      file_id: "",
      file_size: 0,
      height: 0,
      width: 0
    },
    title: "",
    width: 0
  };
  const result = "";
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
      const action$: ColdObservable<IActionYoutubeDownloadResultInsert> = cold(
        "-a",
        { a: actions.youtubeDownloadResultInsert.query({ query }) }
      );
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: undefined,
        requestsObservable: (): ColdObservable<any> => cold("--a")
      };
      const output$: Observable<
        IActionYoutubeDownloadResultInsert | IActionYoutubeDownloadResultInsert
      > = epic.youtubeDownloadResultInsert(action$, state$, dependencies);
      expectObservable(output$).toBe("-a", {
        a: actions.youtubeDownloadResultInsert.error({
          error: new Error(texts.epicDependencyBotTokenUndefined)
        })
      });
    });
  });

  test("should handle dependency requestsObservable undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionYoutubeDownloadResultInsert> = cold(
        "-a",
        { a: actions.youtubeDownloadResultInsert.query({ query }) }
      );
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        requestsObservable: undefined
      };
      const output$: Observable<
        IActionYoutubeDownloadResultInsert | IActionYoutubeDownloadResultInsert
      > = epic.youtubeDownloadResultInsert(action$, state$, dependencies);
      expectObservable(output$).toBe("-a", {
        a: actions.youtubeDownloadResultInsert.error({
          error: new Error(texts.epicDependencyRequestsObservableUndefined)
        })
      });
    });
  });

  test("should handle dependency requestsObservable error", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionYoutubeDownloadResultInsert> = cold(
        "-a",
        {
          a: actions.youtubeDownloadResultInsert.query({ query })
        }
      );
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        requestsObservable: (): ColdObservable<any> => cold("--#", {}, error)
      };
      const output$: Observable<
        IActionYoutubeDownloadResultInsert | IActionYoutubeDownloadResultInsert
      > = epic.youtubeDownloadResultInsert(action$, state$, dependencies);
      expectObservable(output$).toBe("---a", {
        a: actions.youtubeDownloadResultInsert.error({ error })
      });
    });
  });

  test("should handle error actionYoutubeDownloadResultInsertQuery undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: Observable<IActionYoutubeDownloadResultInsert> = cold(
        "-a",
        {
          a: actions.youtubeDownloadResultInsert.query({})
        }
      );
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        requestsObservable: (): ColdObservable<any> => cold("--a")
      };
      const output$: Observable<
        IActionYoutubeDownloadResultInsert | IActionYoutubeDownloadResultInsert
      > = epic.youtubeDownloadResultInsert(action$, state$, dependencies);
      expectObservable(output$).toBe("-a", {
        a: actions.youtubeDownloadResultInsert.error({
          error: new Error(
            texts.actionYoutubeDownloadResultInsertQueryUndefined
          )
        })
      });
    });
  });

  test("should handle result ok false", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionYoutubeDownloadResultInsert> = cold(
        "-a",
        {
          a: actions.youtubeDownloadResultInsert.query({ query })
        }
      );
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: responseOKF })
      };
      const output$: Observable<
        IActionYoutubeDownloadResultInsert
      > = epic.youtubeDownloadResultInsert(action$, state$, dependencies);
      expectObservable(output$).toBe("---a", {
        a: actions.youtubeDownloadResultInsert.error({ error: responseOKF })
      });
    });
  });

  test("should handle result ok true", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionYoutubeDownloadResultInsert> = cold(
        "-a",
        {
          a: actions.youtubeDownloadResultInsert.query({ query })
        }
      );
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: responseOKT })
      };
      const output$: Observable<
        IActionYoutubeDownloadResultInsert
      > = epic.youtubeDownloadResultInsert(action$, state$, dependencies);
      expectObservable(output$).toBe("---a", {
        a: actions.youtubeDownloadResultInsert.result({ result })
      });
    });
  });
});
