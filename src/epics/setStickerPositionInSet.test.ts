import { StateObservable } from "redux-observable";
import { Observable } from "rxjs";
import { ColdObservable } from "rxjs/internal/testing/ColdObservable";
import { RunHelpers } from "rxjs/internal/testing/TestScheduler";
import { TestScheduler } from "rxjs/testing";

import { IActionSetStickerPositionInSet } from "../../types/iActionSetStickerPositionInSet";
import { IDependencies } from "../../types/iDependencies";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import { IStateSetStickerPositionInSetQuery } from "../../types/iStateSetStickerPositionInSetQuery";
import * as actions from "../actions";
import * as texts from "../configs/texts";
import * as epic from "../epics/setStickerPositionInSet";
import { initialDependencies } from "../utils/dependencies";

describe("setStickerPositionInSet epic", (): void => {
  const error: Error = new Error("");
  const query: IStateSetStickerPositionInSetQuery = {
    position: 0,
    sticker: ""
  };
  const result = true;
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

  test("should handle dependency requestsObservable error", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionSetStickerPositionInSet> = cold(
        "-a",
        {
          a: actions.setStickerPositionInSet.query({ query })
        }
      );
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initialDependencies,
        botToken: "",
        requestsObservable: (): ColdObservable<any> => cold("--#", {}, error)
      };
      const output$: Observable<
        IActionSetStickerPositionInSet | IActionSetStickerPositionInSet
      > = epic.setStickerPositionInSet(action$, state$, dependencies);
      expectObservable(output$).toBe("---a", {
        a: actions.setStickerPositionInSet.error({ error })
      });
    });
  });

  test("should handle error actionSetStickerPositionInSetQuery undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: Observable<IActionSetStickerPositionInSet> = cold("-a", {
        a: actions.setStickerPositionInSet.query({ query: undefined })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initialDependencies,
        botToken: "",
        requestsObservable: (): ColdObservable<any> => cold("--a")
      };
      const output$: Observable<
        IActionSetStickerPositionInSet | IActionSetStickerPositionInSet
      > = epic.setStickerPositionInSet(action$, state$, dependencies);
      expectObservable(output$).toBe("-a", {
        a: actions.setStickerPositionInSet.error({
          error: new Error(texts.actionSetStickerPositionInSetQueryUndefined)
        })
      });
    });
  });

  test("should handle result ok false", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionSetStickerPositionInSet> = cold(
        "-a",
        {
          a: actions.setStickerPositionInSet.query({ query })
        }
      );
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initialDependencies,
        botToken: "",
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: responseOKF })
      };
      const output$: Observable<IActionSetStickerPositionInSet> = epic.setStickerPositionInSet(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("---a", {
        a: actions.setStickerPositionInSet.error({ error: responseOKF })
      });
    });
  });

  test("should handle result ok true", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionSetStickerPositionInSet> = cold(
        "-a",
        {
          a: actions.setStickerPositionInSet.query({ query })
        }
      );
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initialDependencies,
        botToken: "",
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: responseOKT })
      };
      const output$: Observable<IActionSetStickerPositionInSet> = epic.setStickerPositionInSet(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("---a", {
        a: actions.setStickerPositionInSet.result({ result })
      });
    });
  });
});
