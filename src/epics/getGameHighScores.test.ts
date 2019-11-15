import { StateObservable } from "redux-observable";
import { Observable } from "rxjs";
import { ColdObservable } from "rxjs/internal/testing/ColdObservable";
import { RunHelpers } from "rxjs/internal/testing/TestScheduler";
import { TestScheduler } from "rxjs/testing";

import { IActionGetGameHighScores } from "../../types/iActionGetGameHighScores";
import { IDependencies } from "../../types/iDependencies";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import { IStateGetGameHighScoresQuery } from "../../types/iStateGetGameHighScoresQuery";
import { IGameHighScore } from "../../types/telegramBot/games/iGameHighScore";
import * as actions from "../actions";
import * as texts from "../configs/texts";
import * as epic from "../epics/getGameHighScores";

describe("getGameHighScores epic", (): void => {
  const error: Error = new Error("");
  const query: IStateGetGameHighScoresQuery = {
    user_id: 0
  };
  const result: IGameHighScore[] = [
    {
      position: 0,
      score: 0,
      user: {
        first_name: "",
        id: 0,
        is_bot: false
      }
    }
  ];
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
      const action$: ColdObservable<IActionGetGameHighScores> = cold("-a", {
        a: actions.getGameHighScores.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: undefined,
        requestsObservable: (): ColdObservable<any> => cold("--a")
      };
      const output$: Observable<
        IActionGetGameHighScores | IActionGetGameHighScores
      > = epic.getGameHighScores(action$, state$, dependencies);
      expectObservable(output$).toBe("-a", {
        a: actions.getGameHighScores.error({
          error: new Error(texts.epicDependencyBotTokenUndefined)
        })
      });
    });
  });

  test("should handle dependency requestsObservable undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionGetGameHighScores> = cold("-a", {
        a: actions.getGameHighScores.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        requestsObservable: undefined
      };
      const output$: Observable<
        IActionGetGameHighScores | IActionGetGameHighScores
      > = epic.getGameHighScores(action$, state$, dependencies);
      expectObservable(output$).toBe("-a", {
        a: actions.getGameHighScores.error({
          error: new Error(texts.epicDependencyRequestsObservableUndefined)
        })
      });
    });
  });

  test("should handle dependency requestsObservable error", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionGetGameHighScores> = cold("-a", {
        a: actions.getGameHighScores.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        requestsObservable: (): ColdObservable<any> => cold("--#", {}, error)
      };
      const output$: Observable<
        IActionGetGameHighScores | IActionGetGameHighScores
      > = epic.getGameHighScores(action$, state$, dependencies);
      expectObservable(output$).toBe("---a", {
        a: actions.getGameHighScores.error({ error })
      });
    });
  });

  test("should handle error actionGetGameHighScoresQuery undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: Observable<IActionGetGameHighScores> = cold("-a", {
        a: actions.getGameHighScores.query({})
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        requestsObservable: (): ColdObservable<any> => cold("--a")
      };
      const output$: Observable<
        IActionGetGameHighScores | IActionGetGameHighScores
      > = epic.getGameHighScores(action$, state$, dependencies);
      expectObservable(output$).toBe("-a", {
        a: actions.getGameHighScores.error({
          error: new Error(texts.actionGetGameHighScoresQueryUndefined)
        })
      });
    });
  });

  test("should handle result ok false", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionGetGameHighScores> = cold("-a", {
        a: actions.getGameHighScores.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: responseOKF })
      };
      const output$: Observable<IActionGetGameHighScores> = epic.getGameHighScores(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("---a", {
        a: actions.getGameHighScores.error({ error: responseOKF })
      });
    });
  });

  test("should handle result ok true", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionGetGameHighScores> = cold("-a", {
        a: actions.getGameHighScores.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: responseOKT })
      };
      const output$: Observable<IActionGetGameHighScores> = epic.getGameHighScores(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("---a", {
        a: actions.getGameHighScores.result({ result })
      });
    });
  });
});
