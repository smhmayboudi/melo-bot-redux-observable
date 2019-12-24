import { youtube_v3 } from "googleapis";
import { StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { ColdObservable } from "rxjs/internal/testing/ColdObservable";
import { RunHelpers } from "rxjs/internal/testing/TestScheduler";
import { TestScheduler } from "rxjs/testing";

import { IActionYoutubeSearchList } from "../../types/iActionYoutubeSearchList";
import { IDependencies } from "../../types/iDependencies";
import { IError } from "../../types/iError";
import { ILocale } from "../../types/iLocale";
import { IState } from "../../types/iState";
import { IStateYoutubeSearchListQuery } from "../../types/iStateYoutubeSearchListQuery";
import * as actions from "../actions";
import * as epic from "../epics/youtubeSearchList";
import { init as initDependencies } from "../utils/dependencies";
import { locale } from "../utils/string";

describe("youtubeSearchList epic", (): void => {
  const error: Error = new Error("");
  const query: IStateYoutubeSearchListQuery = {
    key: ""
  };
  const result: youtube_v3.Schema$SearchListResponse = {
    items: [
      {
        id: {
          videoId: ""
        },
        snippet: {
          description: "",
          thumbnails: {
            default: {
              height: 0,
              url: "",
              width: 0
            },
            high: {
              height: 0,
              url: "",
              width: 0
            },
            maxres: {
              height: 0,
              url: "",
              width: 0
            },
            medium: {
              height: 0,
              url: "",
              width: 0
            },
            standard: {
              height: 0,
              url: "",
              width: 0
            }
          },
          title: ""
        }
      }
    ],
    nextPageToken: "",
    pageInfo: {
      resultsPerPage: 0,
      totalResults: 0
    },
    prevPageToken: ""
  };
  const resultError: IError = {
    error: {
      errors: [
        {
          domain: "",
          reason: "",
          message: "",
          locationType: "",
          location: ""
        }
      ],
      code: 0,
      message: ""
    }
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
      const action$: ColdObservable<IActionYoutubeSearchList> = cold("-a", {
        a: actions.youtubeSearchList.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initDependencies(locales),
        authorization: (): Observable<boolean> => of(true),
        requestsObservable: (): ColdObservable<any> => cold("--#", {}, error)
      };
      const output$: Observable<IActionYoutubeSearchList> = epic.youtubeSearchList(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("---a", {
        a: actions.youtubeSearchList.error({ error })
      });
    });
  });

  test("should handle error actionYoutubeSearchListQuery undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: Observable<IActionYoutubeSearchList> = cold("-a", {
        a: actions.youtubeSearchList.query({ query: undefined })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initDependencies(locales),
        authorization: (): Observable<boolean> => of(true),
        requestsObservable: (): ColdObservable<any> => cold("--a")
      };
      const output$: Observable<IActionYoutubeSearchList> = epic.youtubeSearchList(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("-a", {
        a: actions.youtubeSearchList.error({
          error: new Error(
            locales.find("actionYoutubeSearchListQueryUndefined")
          )
        })
      });
    });
  });

  test("should handle result error", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionYoutubeSearchList> = cold("-a", {
        a: actions.youtubeSearchList.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initDependencies(locales),
        authorization: (): Observable<boolean> => of(true),
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: resultError })
      };
      const output$: Observable<IActionYoutubeSearchList> = epic.youtubeSearchList(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("---a", {
        a: actions.youtubeSearchList.error({ error: resultError.error })
      });
    });
  });

  test("should handle result", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionYoutubeSearchList> = cold("-a", {
        a: actions.youtubeSearchList.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initDependencies(locales),
        authorization: (): Observable<boolean> => of(true),
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: result })
      };
      const output$: Observable<IActionYoutubeSearchList> = epic.youtubeSearchList(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("---a", {
        a: actions.youtubeSearchList.result({ result })
      });
    });
  });
});
