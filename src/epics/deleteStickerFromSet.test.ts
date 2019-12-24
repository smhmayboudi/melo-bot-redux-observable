import { StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { ColdObservable } from "rxjs/internal/testing/ColdObservable";
import { RunHelpers } from "rxjs/internal/testing/TestScheduler";
import { TestScheduler } from "rxjs/testing";

import { IActionDeleteStickerFromSet } from "../../types/iActionDeleteStickerFromSet";
import { IDependencies } from "../../types/iDependencies";
import { ILocale } from "../../types/iLocale";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import { IStateDeleteStickerFromSetQuery } from "../../types/iStateDeleteStickerFromSetQuery";
import * as actions from "../actions";
import * as epic from "../epics/deleteStickerFromSet";
import { init as initDependencies } from "../utils/dependencies";
import { locale } from "../utils/string";

describe("deleteStickerFromSet epic", (): void => {
  const error: Error = new Error("");
  const query: IStateDeleteStickerFromSetQuery = {
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

  test("should handle dependency requestsObservable error", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionDeleteStickerFromSet> = cold("-a", {
        a: actions.deleteStickerFromSet.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initDependencies(locales),
        authorization: (): Observable<boolean> => of(true),
        botToken: "",
        requestsObservable: (): ColdObservable<any> => cold("--#", {}, error)
      };
      const output$: Observable<
        IActionDeleteStickerFromSet | IActionDeleteStickerFromSet
      > = epic.deleteStickerFromSet(action$, state$, dependencies);
      expectObservable(output$).toBe("---a", {
        a: actions.deleteStickerFromSet.error({ error })
      });
    });
  });

  test("should handle error actionDeleteStickerFromSetQuery undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: Observable<IActionDeleteStickerFromSet> = cold("-a", {
        a: actions.deleteStickerFromSet.query({ query: undefined })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initDependencies(locales),
        authorization: (): Observable<boolean> => of(true),
        botToken: "",
        requestsObservable: (): ColdObservable<any> => cold("--a")
      };
      const output$: Observable<
        IActionDeleteStickerFromSet | IActionDeleteStickerFromSet
      > = epic.deleteStickerFromSet(action$, state$, dependencies);
      expectObservable(output$).toBe("-a", {
        a: actions.deleteStickerFromSet.error({
          error: new Error(
            locales.find("actionDeleteStickerFromSetQueryUndefined")
          )
        })
      });
    });
  });

  test("should handle result ok false", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionDeleteStickerFromSet> = cold("-a", {
        a: actions.deleteStickerFromSet.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initDependencies(locales),
        authorization: (): Observable<boolean> => of(true),
        botToken: "",
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: responseOKF })
      };
      const output$: Observable<IActionDeleteStickerFromSet> = epic.deleteStickerFromSet(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("---a", {
        a: actions.deleteStickerFromSet.error({ error: responseOKF })
      });
    });
  });

  test("should handle result ok true", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionDeleteStickerFromSet> = cold("-a", {
        a: actions.deleteStickerFromSet.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initDependencies(locales),
        authorization: (): Observable<boolean> => of(true),
        botToken: "",
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: responseOKT })
      };
      const output$: Observable<IActionDeleteStickerFromSet> = epic.deleteStickerFromSet(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("---a", {
        a: actions.deleteStickerFromSet.result({ result })
      });
    });
  });
});
