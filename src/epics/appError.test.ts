import { StateObservable } from "redux-observable";
import { Observable } from "rxjs";
import { RunHelpers } from "rxjs/internal/testing/TestScheduler";
import { TestScheduler } from "rxjs/testing";

import { IAction } from "../../types/iAction";
import { IDependencies } from "../../types/iDependencies";
import { ILocale } from "../../types/iLocale";
import { IState } from "../../types/iState";
import * as actions from "../actions";
import * as epic from "../epics/appError";
import { init as initDependencies } from "../utils/dependencies";
import { locale } from "../utils/string";

describe("appError epic", (): void => {
  const error: Error = new Error("");

  let locales: ILocale;

  beforeAll(
    async (): Promise<void> => {
      locales = await locale("en");
    }
  );

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
        a: actions.answerInlineQuery.error({ error })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initDependencies(locales)
      };
      const output$: Observable<IAction> = epic.appError(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe(
        "-#",
        {},
        actions.answerInlineQuery.error({ error })
      );
    });
  });
});
