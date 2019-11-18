import { StateObservable } from "redux-observable";
import { Observable } from "rxjs";
import { RunHelpers } from "rxjs/internal/testing/TestScheduler";
import { TestScheduler } from "rxjs/testing";

import { initialState } from "../utils/store";
import { IAction } from "../../types/iAction";
import { IActionSendMessage } from "../../types/iActionSendMessage";
import { IDependencies } from "../../types/iDependencies";
import { IState } from "../../types/iState";
import * as actions from "../actions";
import * as epic from "../epics/appError";
import { initialDependencies } from "../utils/dependencies";

describe("appError epic", (): void => {
  const error: Error = new Error("");

  let testScheduler: TestScheduler;

  beforeEach((): void => {
    testScheduler = new TestScheduler((actual: IState, expected: IState):
      | boolean
      | void => {
      expect(actual).toEqual(expected);
    });
  });

  test("should handle error", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: Observable<IAction> = cold("-a", {
        a: { ...initialState, ...actions.answerInlineQuery.error({ error }) }
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initialDependencies
      };
      const output$: Observable<IActionSendMessage> = epic.appError(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe(
        "-#",
        {},
        {
          ...initialState,
          ...actions.answerInlineQuery.error({ error })
        }
      );
    });
  });
});
