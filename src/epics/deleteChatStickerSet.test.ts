import { StateObservable } from "redux-observable";
import { Observable } from "rxjs";
import { ColdObservable } from "rxjs/internal/testing/ColdObservable";
import { RunHelpers } from "rxjs/internal/testing/TestScheduler";
import { TestScheduler } from "rxjs/testing";

import { IActionDeleteChatStickerSet } from "../../types/iActionDeleteChatStickerSet";
import { IDependencies } from "../../types/iDependencies";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import { IStateDeleteChatStickerSetQuery } from "../../types/iStateDeleteChatStickerSetQuery";
import * as actions from "../actions";
import * as texts from "../configs/texts";
import * as epic from "../epics/deleteChatStickerSet";
import { initialDependencies } from "../utils/dependencies";

describe("deleteChatStickerSet epic", (): void => {
  const error: Error = new Error("");
  const query: IStateDeleteChatStickerSetQuery = {
    chat_id: 0
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
      const action$: ColdObservable<IActionDeleteChatStickerSet> = cold("-a", {
        a: actions.deleteChatStickerSet.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initialDependencies,
        botToken: "",
        requestsObservable: (): ColdObservable<any> => cold("--#", {}, error)
      };
      const output$: Observable<
        IActionDeleteChatStickerSet | IActionDeleteChatStickerSet
      > = epic.deleteChatStickerSet(action$, state$, dependencies);
      expectObservable(output$).toBe("---a", {
        a: actions.deleteChatStickerSet.error({ error })
      });
    });
  });

  test("should handle error actionDeleteChatStickerSetQuery undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: Observable<IActionDeleteChatStickerSet> = cold("-a", {
        a: actions.deleteChatStickerSet.query({ query: undefined })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initialDependencies,
        botToken: "",
        requestsObservable: (): ColdObservable<any> => cold("--a")
      };
      const output$: Observable<
        IActionDeleteChatStickerSet | IActionDeleteChatStickerSet
      > = epic.deleteChatStickerSet(action$, state$, dependencies);
      expectObservable(output$).toBe("-a", {
        a: actions.deleteChatStickerSet.error({
          error: new Error(texts.actionDeleteChatStickerSetQueryUndefined)
        })
      });
    });
  });

  test("should handle result ok false", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionDeleteChatStickerSet> = cold("-a", {
        a: actions.deleteChatStickerSet.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initialDependencies,
        botToken: "",
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: responseOKF })
      };
      const output$: Observable<IActionDeleteChatStickerSet> = epic.deleteChatStickerSet(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("---a", {
        a: actions.deleteChatStickerSet.error({ error: responseOKF })
      });
    });
  });

  test("should handle result ok true", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionDeleteChatStickerSet> = cold("-a", {
        a: actions.deleteChatStickerSet.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initialDependencies,
        botToken: "",
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: responseOKT })
      };
      const output$: Observable<IActionDeleteChatStickerSet> = epic.deleteChatStickerSet(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("---a", {
        a: actions.deleteChatStickerSet.result({ result })
      });
    });
  });
});
