import { StateObservable } from "redux-observable";
import { Observable } from "rxjs";
import { ColdObservable } from "rxjs/internal/testing/ColdObservable";
import { RunHelpers } from "rxjs/internal/testing/TestScheduler";
import { TestScheduler } from "rxjs/testing";

import { IActionDeleteChatPhoto } from "../../types/iActionDeleteChatPhoto";
import { IDependencies } from "../../types/iDependencies";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import { IStateDeleteChatPhotoQuery } from "../../types/iStateDeleteChatPhotoQuery";
import * as actions from "../actions";
import * as texts from "../configs/texts";
import * as epic from "../epics/deleteChatPhoto";

describe("deleteChatPhoto epic", (): void => {
  const error: Error = new Error("");
  const query: IStateDeleteChatPhotoQuery = {
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

  test("should handle dependency botToken undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionDeleteChatPhoto> = cold("-a", {
        a: actions.deleteChatPhoto.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: undefined,
        requestsObservable: (): ColdObservable<any> => cold("--a")
      };
      const output$: Observable<
        IActionDeleteChatPhoto | IActionDeleteChatPhoto
      > = epic.deleteChatPhoto(action$, state$, dependencies);
      expectObservable(output$).toBe("-a", {
        a: actions.deleteChatPhoto.error({
          error: new Error(texts.epicDependencyBotTokenUndefined)
        })
      });
    });
  });

  test("should handle dependency requestsObservable undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionDeleteChatPhoto> = cold("-a", {
        a: actions.deleteChatPhoto.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        requestsObservable: undefined
      };
      const output$: Observable<
        IActionDeleteChatPhoto | IActionDeleteChatPhoto
      > = epic.deleteChatPhoto(action$, state$, dependencies);
      expectObservable(output$).toBe("-a", {
        a: actions.deleteChatPhoto.error({
          error: new Error(texts.epicDependencyRequestsObservableUndefined)
        })
      });
    });
  });

  test("should handle dependency requestsObservable error", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionDeleteChatPhoto> = cold("-a", {
        a: actions.deleteChatPhoto.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        requestsObservable: (): ColdObservable<any> => cold("--#", {}, error)
      };
      const output$: Observable<
        IActionDeleteChatPhoto | IActionDeleteChatPhoto
      > = epic.deleteChatPhoto(action$, state$, dependencies);
      expectObservable(output$).toBe("---a", {
        a: actions.deleteChatPhoto.error({ error })
      });
    });
  });

  test("should handle error actionDeleteChatPhotoQuery undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: Observable<IActionDeleteChatPhoto> = cold("-a", {
        a: actions.deleteChatPhoto.query({})
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        requestsObservable: (): ColdObservable<any> => cold("--a")
      };
      const output$: Observable<
        IActionDeleteChatPhoto | IActionDeleteChatPhoto
      > = epic.deleteChatPhoto(action$, state$, dependencies);
      expectObservable(output$).toBe("-a", {
        a: actions.deleteChatPhoto.error({
          error: new Error(texts.actionDeleteChatPhotoQueryUndefined)
        })
      });
    });
  });

  test("should handle result ok false", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionDeleteChatPhoto> = cold("-a", {
        a: actions.deleteChatPhoto.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: responseOKF })
      };
      const output$: Observable<IActionDeleteChatPhoto> = epic.deleteChatPhoto(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("---a", {
        a: actions.deleteChatPhoto.error({ error: responseOKF })
      });
    });
  });

  test("should handle result ok true", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionDeleteChatPhoto> = cold("-a", {
        a: actions.deleteChatPhoto.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: responseOKT })
      };
      const output$: Observable<IActionDeleteChatPhoto> = epic.deleteChatPhoto(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("---a", {
        a: actions.deleteChatPhoto.result({ result })
      });
    });
  });
});
