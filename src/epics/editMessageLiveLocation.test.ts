import { StateObservable } from "redux-observable";
import { Observable } from "rxjs";
import { ColdObservable } from "rxjs/internal/testing/ColdObservable";
import { RunHelpers } from "rxjs/internal/testing/TestScheduler";
import { TestScheduler } from "rxjs/testing";

import { IActionEditMessageLiveLocation } from "../../types/iActionEditMessageLiveLocation";
import { IDependencies } from "../../types/iDependencies";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import { IStateEditMessageLiveLocationQuery } from "../../types/iStateEditMessageLiveLocationQuery";
import * as actions from "../actions";
import * as texts from "../configs/texts";
import * as epic from "../epics/editMessageLiveLocation";
import { initialDependencies } from "../utils/dependencies";

describe("editMessageLiveLocation epic", (): void => {
  const error: Error = new Error("");
  const query: IStateEditMessageLiveLocationQuery = {
    latitude: 0,
    longitude: 0
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
      const action$: ColdObservable<IActionEditMessageLiveLocation> = cold(
        "-a",
        {
          a: actions.editMessageLiveLocation.query({ query })
        }
      );
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initialDependencies,
        botToken: "",
        requestsObservable: (): ColdObservable<any> => cold("--#", {}, error)
      };
      const output$: Observable<
        IActionEditMessageLiveLocation | IActionEditMessageLiveLocation
      > = epic.editMessageLiveLocation(action$, state$, dependencies);
      expectObservable(output$).toBe("---a", {
        a: actions.editMessageLiveLocation.error({ error })
      });
    });
  });

  test("should handle error actionEditMessageLiveLocationQuery undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: Observable<IActionEditMessageLiveLocation> = cold("-a", {
        a: actions.editMessageLiveLocation.query({ query: undefined })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initialDependencies,
        botToken: "",
        requestsObservable: (): ColdObservable<any> => cold("--a")
      };
      const output$: Observable<
        IActionEditMessageLiveLocation | IActionEditMessageLiveLocation
      > = epic.editMessageLiveLocation(action$, state$, dependencies);
      expectObservable(output$).toBe("-a", {
        a: actions.editMessageLiveLocation.error({
          error: new Error(texts.actionEditMessageLiveLocationQueryUndefined)
        })
      });
    });
  });

  test("should handle result ok false", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionEditMessageLiveLocation> = cold(
        "-a",
        {
          a: actions.editMessageLiveLocation.query({ query })
        }
      );
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initialDependencies,
        botToken: "",
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: responseOKF })
      };
      const output$: Observable<IActionEditMessageLiveLocation> = epic.editMessageLiveLocation(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("---a", {
        a: actions.editMessageLiveLocation.error({ error: responseOKF })
      });
    });
  });

  test("should handle result ok true", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionEditMessageLiveLocation> = cold(
        "-a",
        {
          a: actions.editMessageLiveLocation.query({ query })
        }
      );
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initialDependencies,
        botToken: "",
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: responseOKT })
      };
      const output$: Observable<IActionEditMessageLiveLocation> = epic.editMessageLiveLocation(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("---a", {
        a: actions.editMessageLiveLocation.result({ result })
      });
    });
  });
});
