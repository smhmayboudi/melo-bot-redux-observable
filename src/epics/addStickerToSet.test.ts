import { StateObservable } from "redux-observable";
import { Observable } from "rxjs";
import { ColdObservable } from "rxjs/internal/testing/ColdObservable";
import { RunHelpers } from "rxjs/internal/testing/TestScheduler";
import { TestScheduler } from "rxjs/testing";

import { IActionAddStickerToSet } from "../../types/iActionAddStickerToSet";
import { IDependencies } from "../../types/iDependencies";
import { ILocale } from "../../types/iLocale";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import { IStateAddStickerToSetQuery } from "../../types/iStateAddStickerToSetQuery";
import * as actions from "../actions";
import * as epic from "../epics/addStickerToSet";
import { init as initDependencies } from "../utils/dependencies";
import { locale } from "../utils/string";

describe("addStickerToSet epic", (): void => {
  const locales: ILocale = locale("en");
  const error: Error = new Error("");
  const query: IStateAddStickerToSetQuery = {
    emojis: "",
    name: "",
    png_sticker: "",
    user_id: 0
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

  test("should handle dependency requestsUploadObservable error", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionAddStickerToSet> = cold("-a", {
        a: actions.addStickerToSet.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initDependencies(locales).initDependencies,
        botToken: "",
        requestsUploadObservable: (): ColdObservable<any> =>
          cold("--#", {}, error)
      };
      const output$: Observable<
        IActionAddStickerToSet | IActionAddStickerToSet
      > = epic.addStickerToSet(action$, state$, dependencies);
      expectObservable(output$).toBe("---a", {
        a: actions.addStickerToSet.error({ error })
      });
    });
  });

  test("should handle error actionAddStickerToSetQuery undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: Observable<IActionAddStickerToSet> = cold("-a", {
        a: actions.addStickerToSet.query({ query: undefined })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initDependencies(locales).initDependencies,
        botToken: "",
        requestsUploadObservable: (): ColdObservable<any> => cold("--a")
      };
      const output$: Observable<
        IActionAddStickerToSet | IActionAddStickerToSet
      > = epic.addStickerToSet(action$, state$, dependencies);
      expectObservable(output$).toBe("-a", {
        a: actions.addStickerToSet.error({
          error: new Error(locales.find("actionAddStickerToSetQueryUndefined"))
        })
      });
    });
  });

  test("should handle result ok false", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionAddStickerToSet> = cold("-a", {
        a: actions.addStickerToSet.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initDependencies(locales).initDependencies,
        botToken: "",
        requestsUploadObservable: (): ColdObservable<any> =>
          cold("--a", { a: responseOKF })
      };
      const output$: Observable<IActionAddStickerToSet> = epic.addStickerToSet(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("---a", {
        a: actions.addStickerToSet.error({ error: responseOKF })
      });
    });
  });

  test("should handle result ok true", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionAddStickerToSet> = cold("-a", {
        a: actions.addStickerToSet.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initDependencies(locales).initDependencies,
        botToken: "",
        requestsUploadObservable: (): ColdObservable<any> =>
          cold("--a", { a: responseOKT })
      };
      const output$: Observable<IActionAddStickerToSet> = epic.addStickerToSet(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("---a", {
        a: actions.addStickerToSet.result({ result })
      });
    });
  });
});
