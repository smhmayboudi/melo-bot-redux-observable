import { StateObservable } from "redux-observable";
import { Observable } from "rxjs";
import { ColdObservable } from "rxjs/internal/testing/ColdObservable";
import { RunHelpers } from "rxjs/internal/testing/TestScheduler";
import { TestScheduler } from "rxjs/testing";

import { IActionSendPhoto } from "../../types/iActionSendPhoto";
import { IDependencies } from "../../types/iDependencies";
import { ILocale } from "../../types/iLocale";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import { IStateSendPhotoQuery } from "../../types/iStateSendPhotoQuery";
import { IMessage } from "../../types/telegramBot/types/iMessage";
import * as actions from "../actions";
import * as epic from "../epics/sendPhoto";
import { init as initDependencies } from "../utils/dependencies";
import { locale } from "../utils/string";

describe("sendPhoto epic", (): void => {
  const locales: ILocale = locale("en");
  const error: Error = new Error("");
  const query: IStateSendPhotoQuery = {
    chat_id: 0,
    photo: ""
  };
  const result: IMessage = {
    chat: {
      id: 0,
      type: ""
    },
    date: 0,
    message_id: 0
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

  test("should handle dependency requestsUploadObservable error", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionSendPhoto> = cold("-a", {
        a: actions.sendPhoto.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initDependencies(locales).initDependencies,
        botToken: "",
        requestsUploadObservable: (): ColdObservable<any> =>
          cold("--#", {}, error)
      };
      const output$: Observable<
        IActionSendPhoto | IActionSendPhoto
      > = epic.sendPhoto(action$, state$, dependencies);
      expectObservable(output$).toBe("---a", {
        a: actions.sendPhoto.error({ error })
      });
    });
  });

  test("should handle error actionSendPhotoQuery undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: Observable<IActionSendPhoto> = cold("-a", {
        a: actions.sendPhoto.query({ query: undefined })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initDependencies(locales).initDependencies,
        botToken: "",
        requestsUploadObservable: (): ColdObservable<any> => cold("--a")
      };
      const output$: Observable<
        IActionSendPhoto | IActionSendPhoto
      > = epic.sendPhoto(action$, state$, dependencies);
      expectObservable(output$).toBe("-a", {
        a: actions.sendPhoto.error({
          error: new Error(locales.find("actionSendPhotoQueryUndefined"))
        })
      });
    });
  });

  test("should handle result ok false", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionSendPhoto> = cold("-a", {
        a: actions.sendPhoto.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initDependencies(locales).initDependencies,
        botToken: "",
        requestsUploadObservable: (): ColdObservable<any> =>
          cold("--a", { a: responseOKF })
      };
      const output$: Observable<IActionSendPhoto> = epic.sendPhoto(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("---a", {
        a: actions.sendPhoto.error({ error: responseOKF })
      });
    });
  });

  test("should handle result ok true", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionSendPhoto> = cold("-a", {
        a: actions.sendPhoto.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initDependencies(locales).initDependencies,
        botToken: "",
        requestsUploadObservable: (): ColdObservable<any> =>
          cold("--a", { a: responseOKT })
      };
      const output$: Observable<IActionSendPhoto> = epic.sendPhoto(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("---a", {
        a: actions.sendPhoto.result({ result })
      });
    });
  });
});
