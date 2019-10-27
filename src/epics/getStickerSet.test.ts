import { StateObservable } from "redux-observable";
import { Observable } from "rxjs";
import { ColdObservable } from "rxjs/internal/testing/ColdObservable";
import { RunHelpers } from "rxjs/internal/testing/TestScheduler";
import { TestScheduler } from "rxjs/testing";

import { IActionGetStickerSet } from "../../types/iActionGetStickerSet";
import { IDependencies } from "../../types/iDependencies";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import { IStateGetStickerSetQuery } from "../../types/iStateGetStickerSetQuery";
import { IStickerSet } from "../../types/telegramBot/stickers/iStickerSet";
import * as actions from "../actions";
import * as texts from "../configs/texts";
import * as epic from "../epics/getStickerSet";

describe("getStickerSet epic", (): void => {
  const error: Error = new Error("");
  const query: IStateGetStickerSetQuery = {
    name: ""
  };
  const result: IStickerSet = {
    contains_masks: false,
    is_animated: false,
    name: "",
    stickers: [
      {
        file_id: "",
        height: 0,
        is_animated: false,
        width: 0
      }
    ],
    title: ""
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
      const action$: ColdObservable<IActionGetStickerSet> = cold("-a", {
        a: actions.getStickerSet.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: undefined,
        requestsObservable: (): ColdObservable<any> => cold("--a")
      };
      const output$: Observable<
        IActionGetStickerSet | IActionGetStickerSet
      > = epic.getStickerSet(action$, state$, dependencies);
      expectObservable(output$).toBe("-a", {
        a: actions.getStickerSet.error({
          error: new Error(texts.epicDependencyBotTokenUndefined)
        })
      });
    });
  });

  test("should handle dependency requestsObservable undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionGetStickerSet> = cold("-a", {
        a: actions.getStickerSet.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        requestsObservable: undefined
      };
      const output$: Observable<
        IActionGetStickerSet | IActionGetStickerSet
      > = epic.getStickerSet(action$, state$, dependencies);
      expectObservable(output$).toBe("-a", {
        a: actions.getStickerSet.error({
          error: new Error(texts.epicDependencyRequestsObservableUndefined)
        })
      });
    });
  });

  test("should handle dependency requestsObservable error", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionGetStickerSet> = cold("-a", {
        a: actions.getStickerSet.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        requestsObservable: (): ColdObservable<any> => cold("--#", {}, error)
      };
      const output$: Observable<
        IActionGetStickerSet | IActionGetStickerSet
      > = epic.getStickerSet(action$, state$, dependencies);
      expectObservable(output$).toBe("---a", {
        a: actions.getStickerSet.error({ error })
      });
    });
  });

  test("should handle error actionGetStickerSetQuery undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: Observable<IActionGetStickerSet> = cold("-a", {
        a: actions.getStickerSet.query({})
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        requestsObservable: (): ColdObservable<any> => cold("--a")
      };
      const output$: Observable<
        IActionGetStickerSet | IActionGetStickerSet
      > = epic.getStickerSet(action$, state$, dependencies);
      expectObservable(output$).toBe("-a", {
        a: actions.getStickerSet.error({
          error: new Error(texts.actionGetStickerSetQueryUndefined)
        })
      });
    });
  });

  test("should handle result ok false", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionGetStickerSet> = cold("-a", {
        a: actions.getStickerSet.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: responseOKF })
      };
      const output$: Observable<IActionGetStickerSet> = epic.getStickerSet(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("---a", {
        a: actions.getStickerSet.error({ error: responseOKF })
      });
    });
  });

  test("should handle result ok true", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionGetStickerSet> = cold("-a", {
        a: actions.getStickerSet.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: responseOKT })
      };
      const output$: Observable<IActionGetStickerSet> = epic.getStickerSet(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("---a", {
        a: actions.getStickerSet.result({ result })
      });
    });
  });
});
