import { StateObservable } from "redux-observable";
import { Observable } from "rxjs";
import { ColdObservable } from "rxjs/internal/testing/ColdObservable";
import { RunHelpers } from "rxjs/internal/testing/TestScheduler";
import { TestScheduler } from "rxjs/testing";

import { IActionGetUserProfilePhotos } from "../../types/iActionGetUserProfilePhotos";
import { IDependencies } from "../../types/iDependencies";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import { IStateGetUserProfilePhotosQuery } from "../../types/iStateGetUserProfilePhotosQuery";
import { IUserProfilePhotos } from "../../types/telegramBot/types/iUserProfilePhotos";
import * as actions from "../actions";
import * as texts from "../configs/texts";
import * as epic from "../epics/getUserProfilePhotos";

describe("getUserProfilePhotos epic", (): void => {
  const error: Error = new Error("");
  const query: IStateGetUserProfilePhotosQuery = {
    user_id: 0
  };
  const result: IUserProfilePhotos = {
    photos: [
      [
        {
          file_id: "",
          height: 0,
          width: 0
        }
      ]
    ],
    total_count: 1
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
      const action$: ColdObservable<IActionGetUserProfilePhotos> = cold("-a", {
        a: actions.getUserProfilePhotos.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: undefined,
        requestsObservable: (): ColdObservable<any> => cold("--a")
      };
      const output$: Observable<
        IActionGetUserProfilePhotos | IActionGetUserProfilePhotos
      > = epic.getUserProfilePhotos(action$, state$, dependencies);
      expectObservable(output$).toBe("-a", {
        a: actions.getUserProfilePhotos.error({
          error: new Error(texts.epicDependencyBotTokenUndefined)
        })
      });
    });
  });

  test("should handle dependency requestsObservable undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionGetUserProfilePhotos> = cold("-a", {
        a: actions.getUserProfilePhotos.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        requestsObservable: undefined
      };
      const output$: Observable<
        IActionGetUserProfilePhotos | IActionGetUserProfilePhotos
      > = epic.getUserProfilePhotos(action$, state$, dependencies);
      expectObservable(output$).toBe("-a", {
        a: actions.getUserProfilePhotos.error({
          error: new Error(texts.epicDependencyRequestsObservableUndefined)
        })
      });
    });
  });

  test("should handle dependency requestsObservable error", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionGetUserProfilePhotos> = cold("-a", {
        a: actions.getUserProfilePhotos.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        requestsObservable: (): ColdObservable<any> => cold("--#", {}, error)
      };
      const output$: Observable<
        IActionGetUserProfilePhotos | IActionGetUserProfilePhotos
      > = epic.getUserProfilePhotos(action$, state$, dependencies);
      expectObservable(output$).toBe("---a", {
        a: actions.getUserProfilePhotos.error({ error })
      });
    });
  });

  test("should handle error actionGetUserProfilePhotosQuery undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: Observable<IActionGetUserProfilePhotos> = cold("-a", {
        a: actions.getUserProfilePhotos.query({})
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        requestsObservable: (): ColdObservable<any> => cold("--a")
      };
      const output$: Observable<
        IActionGetUserProfilePhotos | IActionGetUserProfilePhotos
      > = epic.getUserProfilePhotos(action$, state$, dependencies);
      expectObservable(output$).toBe("-a", {
        a: actions.getUserProfilePhotos.error({
          error: new Error(texts.actionGetUserProfilePhotosQueryUndefined)
        })
      });
    });
  });

  test("should handle result ok false", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionGetUserProfilePhotos> = cold("-a", {
        a: actions.getUserProfilePhotos.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: responseOKF })
      };
      const output$: Observable<IActionGetUserProfilePhotos> = epic.getUserProfilePhotos(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("---a", {
        a: actions.getUserProfilePhotos.error({ error: responseOKF })
      });
    });
  });

  test("should handle result ok true", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionGetUserProfilePhotos> = cold("-a", {
        a: actions.getUserProfilePhotos.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: responseOKT })
      };
      const output$: Observable<IActionGetUserProfilePhotos> = epic.getUserProfilePhotos(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("---a", {
        a: actions.getUserProfilePhotos.result({ result })
      });
    });
  });
});
