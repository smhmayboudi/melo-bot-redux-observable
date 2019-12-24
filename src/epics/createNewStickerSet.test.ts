import { StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { ColdObservable } from "rxjs/internal/testing/ColdObservable";
import { RunHelpers } from "rxjs/internal/testing/TestScheduler";
import { TestScheduler } from "rxjs/testing";

import { IActionCreateNewStickerSet } from "../../types/iActionCreateNewStickerSet";
import { IDependencies } from "../../types/iDependencies";
import { ILocale } from "../../types/iLocale";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import { IStateCreateNewStickerSetQuery } from "../../types/iStateCreateNewStickerSetQuery";
import * as actions from "../actions";
import * as epic from "../epics/createNewStickerSet";
import { init as initDependencies } from "../utils/dependencies";
import { locale } from "../utils/string";

describe("createNewStickerSet epic", (): void => {
  const error: Error = new Error("");
  const query: IStateCreateNewStickerSetQuery = {
    emojis: "",
    name: "",
    png_sticker: "",
    title: "",
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

  test("should handle dependency requestsUploadObservable error", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionCreateNewStickerSet> = cold("-a", {
        a: actions.createNewStickerSet.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initDependencies(locales),
        authorization: (): Observable<boolean> => of(true),
        botToken: "",
        requestsUploadObservable: (): ColdObservable<any> =>
          cold("--#", {}, error)
      };
      const output$: Observable<
        IActionCreateNewStickerSet | IActionCreateNewStickerSet
      > = epic.createNewStickerSet(action$, state$, dependencies);
      expectObservable(output$).toBe("---a", {
        a: actions.createNewStickerSet.error({ error })
      });
    });
  });

  test("should handle error actionCreateNewStickerSetQuery undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: Observable<IActionCreateNewStickerSet> = cold("-a", {
        a: actions.createNewStickerSet.query({ query: undefined })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initDependencies(locales),
        authorization: (): Observable<boolean> => of(true),
        botToken: "",
        requestsUploadObservable: (): ColdObservable<any> => cold("--a")
      };
      const output$: Observable<
        IActionCreateNewStickerSet | IActionCreateNewStickerSet
      > = epic.createNewStickerSet(action$, state$, dependencies);
      expectObservable(output$).toBe("-a", {
        a: actions.createNewStickerSet.error({
          error: new Error(
            locales.find("actionCreateNewStickerSetQueryUndefined")
          )
        })
      });
    });
  });

  test("should handle result ok false", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionCreateNewStickerSet> = cold("-a", {
        a: actions.createNewStickerSet.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initDependencies(locales),
        authorization: (): Observable<boolean> => of(true),
        botToken: "",
        requestsUploadObservable: (): ColdObservable<any> =>
          cold("--a", { a: responseOKF })
      };
      const output$: Observable<IActionCreateNewStickerSet> = epic.createNewStickerSet(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("---a", {
        a: actions.createNewStickerSet.error({ error: responseOKF })
      });
    });
  });

  test("should handle result ok true", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionCreateNewStickerSet> = cold("-a", {
        a: actions.createNewStickerSet.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initDependencies(locales),
        authorization: (): Observable<boolean> => of(true),
        botToken: "",
        requestsUploadObservable: (): ColdObservable<any> =>
          cold("--a", { a: responseOKT })
      };
      const output$: Observable<IActionCreateNewStickerSet> = epic.createNewStickerSet(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("---a", {
        a: actions.createNewStickerSet.result({ result })
      });
    });
  });
});
