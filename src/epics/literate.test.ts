import { StateObservable } from "redux-observable";
import { Observable } from "rxjs";
import { ColdObservable } from "rxjs/internal/testing/ColdObservable";
import { RunHelpers } from "rxjs/internal/testing/TestScheduler";
import { TestScheduler } from "rxjs/testing";

import { IActionLiterate } from "../../types/iActionLiterate";
import { IDependencies } from "../../types/iDependencies";
import { IState } from "../../types/iState";
import * as actions from "../actions";
import * as texts from "../configs/texts";
import * as epic from "../epics/literate";

describe("literate epic", (): void => {
  const error: Error = new Error("");
  const query: string = "HI";
  const result: string = "های";

  let testScheduler: TestScheduler;

  beforeEach((): void => {
    testScheduler = new TestScheduler((actual: IState, expected: IState):
      | boolean
      | void => {
      expect(actual).toEqual(expected);
    });
  });

  test("should handle dependency requestObservable undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionLiterate> = cold("-a", {
        a: actions.literate.query({
          query
        })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        requestObservable: undefined
      };
      const output$: Observable<IActionLiterate> = epic.literate(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("-a", {
        a: actions.literate.error({
          error: new Error(texts.epicDependencyRequestObservableUndefined)
        })
      });
    });
  });

  test("should handle dependency requestObservable error", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionLiterate> = cold("-a", {
        a: actions.literate.query({
          query
        })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        requestObservable: (): ColdObservable<any> => cold("--#", {}, error)
      };
      const output$: Observable<IActionLiterate> = epic.literate(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("---a", {
        a: actions.literate.error({
          error
        })
      });
    });
  });

  test("should handle error actionGetChatMemberQuery undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionLiterate> = cold("-a", {
        a: actions.literate.query({})
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        requestObservable: (): ColdObservable<any> => cold("--a")
      };
      const output$: Observable<IActionLiterate> = epic.literate(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("-a", {
        a: actions.literate.error({
          error: new Error(texts.actionLiterateQueryUndefined)
        })
      });
    });
  });

  test("should handle result", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionLiterate> = cold("-a", {
        a: actions.literate.query({
          query
        })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        requestObservable: (): ColdObservable<any> =>
          cold("--a", { a: { result } })
      };
      const output$: Observable<IActionLiterate> = epic.literate(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("---a", {
        a: actions.literate.result({
          result
        })
      });
    });
  });
});
