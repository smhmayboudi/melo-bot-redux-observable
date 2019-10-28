import * as fs from "fs";
import { StateObservable } from "redux-observable";
import { Observable } from "rxjs";
import { ColdObservable } from "rxjs/internal/testing/ColdObservable";
import { RunHelpers } from "rxjs/internal/testing/TestScheduler";
import { TestScheduler } from "rxjs/testing";

import { IActionSetChatPhoto } from "../../types/iActionSetChatPhoto";
import { IDependencies } from "../../types/iDependencies";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import { IStateSetChatPhotoQuery } from "../../types/iStateSetChatPhotoQuery";
import * as actions from "../actions";
import * as texts from "../configs/texts";
import * as epic from "../epics/setChatPhoto";

describe("setChatPhoto epic", (): void => {
  const error: Error = new Error("");
  const query: IStateSetChatPhotoQuery = {
    chat_id: "",
    photo: fs.createReadStream("./asset/small.jpg")
  };
  const result: boolean = true;
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
      const action$: ColdObservable<IActionSetChatPhoto> = cold("-a", {
        a: actions.setChatPhoto.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: undefined,
        requestsObservable: (): ColdObservable<any> => cold("--a")
      };
      const output$: Observable<
        IActionSetChatPhoto | IActionSetChatPhoto
      > = epic.setChatPhoto(action$, state$, dependencies);
      expectObservable(output$).toBe("-a", {
        a: actions.setChatPhoto.error({
          error: new Error(texts.epicDependencyBotTokenUndefined)
        })
      });
    });
  });

  test("should handle dependency requestsObservable undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionSetChatPhoto> = cold("-a", {
        a: actions.setChatPhoto.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        requestsObservable: undefined
      };
      const output$: Observable<
        IActionSetChatPhoto | IActionSetChatPhoto
      > = epic.setChatPhoto(action$, state$, dependencies);
      expectObservable(output$).toBe("-a", {
        a: actions.setChatPhoto.error({
          error: new Error(texts.epicDependencyRequestsObservableUndefined)
        })
      });
    });
  });

  test("should handle dependency requestsObservable error", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionSetChatPhoto> = cold("-a", {
        a: actions.setChatPhoto.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        requestsObservable: (): ColdObservable<any> => cold("--#", {}, error)
      };
      const output$: Observable<
        IActionSetChatPhoto | IActionSetChatPhoto
      > = epic.setChatPhoto(action$, state$, dependencies);
      expectObservable(output$).toBe("---a", {
        a: actions.setChatPhoto.error({ error })
      });
    });
  });

  test("should handle error actionSetChatPhotoQuery undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: Observable<IActionSetChatPhoto> = cold("-a", {
        a: actions.setChatPhoto.query({})
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        requestsObservable: (): ColdObservable<any> => cold("--a")
      };
      const output$: Observable<
        IActionSetChatPhoto | IActionSetChatPhoto
      > = epic.setChatPhoto(action$, state$, dependencies);
      expectObservable(output$).toBe("-a", {
        a: actions.setChatPhoto.error({
          error: new Error(texts.actionSetChatPhotoQueryUndefined)
        })
      });
    });
  });

  test("should handle result ok false", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionSetChatPhoto> = cold("-a", {
        a: actions.setChatPhoto.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: responseOKF })
      };
      const output$: Observable<IActionSetChatPhoto> = epic.setChatPhoto(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("---a", {
        a: actions.setChatPhoto.error({ error: responseOKF })
      });
    });
  });

  test("should handle result ok true", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionSetChatPhoto> = cold("-a", {
        a: actions.setChatPhoto.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: responseOKT })
      };
      const output$: Observable<IActionSetChatPhoto> = epic.setChatPhoto(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("---a", {
        a: actions.setChatPhoto.result({ result })
      });
    });
  });
});
