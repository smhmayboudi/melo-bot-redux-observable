import { youtube_v3 } from "googleapis";
import { StateObservable } from "redux-observable";
import { Subject } from "rxjs";
import { ColdObservable } from "rxjs/internal/testing/ColdObservable";
import { RunHelpers } from "rxjs/internal/testing/TestScheduler";
import { TestScheduler } from "rxjs/testing";

import { IActionCallbackQueryDataFind } from "../../types/iActionCallbackQueryDataFind";
import { IDependencies } from "../../types/iDependencies";
import { ILocale } from "../../types/iLocale";
import { IState } from "../../types/iState";
import { IStateCallbackQueryDataFindQuery } from "../../types/iStateCallbackQueryDataFindQuery";
import { IStateCallbackQueryDataInsertQuery } from "../../types/iStateCallbackQueryDataInsertQuery";
import * as actions from "../actions";
import * as env from "../configs/env";
import { init as initDependencies } from "../utils/dependencies";
import { initialState } from "../utils/store";
import { locale } from "../utils/string";
import * as epic from "./callbackQueryDataFindToSendMessage";

describe("callbackQueryDataFind epic", (): void => {
  describe("callbackQueryDataFindToSendMessage", (): void => {
    const locales: ILocale = locale("en");
    const query: IStateCallbackQueryDataFindQuery = {
      id: "000000000000000000000000",
      pageToken: ""
    };
    const result: IStateCallbackQueryDataInsertQuery | null = {
      nextPageToken: "",
      pageInfo: {
        resultsPerPage: 0,
        totalResults: 0
      },
      prevPageToken: ""
    };
    const resultPageInfoUndefined: IStateCallbackQueryDataInsertQuery | null = {
      ...result,
      pageInfo: undefined
    };
    const resultPageInfoResultsPerPageUndefined: IStateCallbackQueryDataInsertQuery | null = {
      ...result,
      pageInfo: {
        ...result.pageInfo,
        resultsPerPage: undefined
      }
    };
    const resultChart: IStateCallbackQueryDataInsertQuery | null = {
      ...result,
      chart: ""
    };
    const resultQ: IStateCallbackQueryDataInsertQuery | null = {
      ...result,
      q: ""
    };
    const state$Value: IState = {
      ...initialState,
      callbackQueryDataFind: {
        query
      },
      message: {
        query: {
          message: {
            chat: {
              id: 0,
              type: ""
            },
            date: 0,
            message_id: 0
          },
          update_id: 0
        }
      }
    };
    const state$ValueCallbackQueryDataFindQueryUndefined: IState = {
      ...state$Value,
      callbackQueryDataFind: {
        ...state$Value.callbackQueryDataFind,
        query: undefined
      }
    };

    let testScheduler: TestScheduler;

    beforeEach((): void => {
      testScheduler = new TestScheduler((actual: IState, expected: IState):
        | boolean
        | void => {
        expect(actual).toEqual(expected);
      });
    });

    test("should handle error state$ undefined", (): void => {
      testScheduler.run((runHelpers: RunHelpers): void => {
        const { cold, expectObservable } = runHelpers;
        const action$: ColdObservable<IActionCallbackQueryDataFind> = cold(
          "-a",
          {
            a: actions.callbackQueryDataFind.result({ result })
          }
        );
        const state$: StateObservable<IState> | undefined = undefined;
        const dependencies: IDependencies = {
          ...initDependencies(locales).initDependencies
        };
        const output$ = epic.callbackQueryDataFindToSendMessage(
          action$,
          state$,
          dependencies
        );
        expectObservable(output$).toBe("-a", {
          a: actions.callbackQueryDataFind.error({
            error: new Error(locales.find("state$Undefined"))
          })
        });
      });
    });

    test("should handle error state$ValueCallbackQueryDataFindQuery undefined", (): void => {
      testScheduler.run((runHelpers: RunHelpers): void => {
        const { cold, expectObservable } = runHelpers;
        const action$: ColdObservable<IActionCallbackQueryDataFind> = cold(
          "-a",
          {
            a: actions.callbackQueryDataFind.result({ result })
          }
        );
        const state$: StateObservable<IState> | undefined = new StateObservable(
          new Subject(),
          state$ValueCallbackQueryDataFindQueryUndefined
        );
        const dependencies: IDependencies = {
          ...initDependencies(locales).initDependencies
        };
        const output$ = epic.callbackQueryDataFindToSendMessage(
          action$,
          state$,
          dependencies
        );
        expectObservable(output$).toBe("-a", {
          a: actions.callbackQueryDataFind.error({
            error: new Error(
              locales.find("state$ValueCallbackQueryDataFindQueryUndefined")
            )
          })
        });
      });
    });

    test("should handle error actionCallbackQueryDataFindResult undefined", (): void => {
      testScheduler.run((runHelpers: RunHelpers): void => {
        const { cold, expectObservable } = runHelpers;
        const action$: ColdObservable<IActionCallbackQueryDataFind> = cold(
          "-a",
          {
            a: actions.callbackQueryDataFind.result({ result: undefined })
          }
        );
        const state$: StateObservable<IState> | undefined = new StateObservable(
          new Subject(),
          state$Value
        );
        const dependencies: IDependencies = {
          ...initDependencies(locales).initDependencies
        };
        const output$ = epic.callbackQueryDataFindToSendMessage(
          action$,
          state$,
          dependencies
        );
        expectObservable(output$).toBe("-a", {
          a: actions.callbackQueryDataFind.error({
            error: new Error(
              locales.find("actionCallbackQueryDataFindResultUndefined")
            )
          })
        });
      });
    });

    test("should handle error actionCallbackQueryDataFindResultPageInfo undefined", (): void => {
      testScheduler.run((runHelpers: RunHelpers): void => {
        const { cold, expectObservable } = runHelpers;
        const action$: ColdObservable<IActionCallbackQueryDataFind> = cold(
          "-a",
          {
            a: actions.callbackQueryDataFind.result({
              result: resultPageInfoUndefined
            })
          }
        );
        const state$: StateObservable<IState> | undefined = new StateObservable(
          new Subject(),
          state$Value
        );
        const dependencies: IDependencies = {
          ...initDependencies(locales).initDependencies
        };
        const output$ = epic.callbackQueryDataFindToSendMessage(
          action$,
          state$,
          dependencies
        );
        expectObservable(output$).toBe("-a", {
          a: actions.callbackQueryDataFind.error({
            error: new Error(
              locales.find("actionCallbackQueryDataFindResultPageInfoUndefined")
            )
          })
        });
      });
    });

    test("should handle error actionCallbackQueryDataFindResultPageInfoResultsPerPage undefined", (): void => {
      testScheduler.run((runHelpers: RunHelpers): void => {
        const { cold, expectObservable } = runHelpers;
        const action$: ColdObservable<IActionCallbackQueryDataFind> = cold(
          "-a",
          {
            a: actions.callbackQueryDataFind.result({
              result: resultPageInfoResultsPerPageUndefined
            })
          }
        );
        const state$: StateObservable<IState> | undefined = new StateObservable(
          new Subject(),
          state$Value
        );
        const dependencies: IDependencies = {
          ...initDependencies(locales).initDependencies
        };
        const output$ = epic.callbackQueryDataFindToSendMessage(
          action$,
          state$,
          dependencies
        );
        expectObservable(output$).toBe("-a", {
          a: actions.callbackQueryDataFind.error({
            error: new Error(
              locales.find(
                "actionCallbackQueryDataFindResultPageInfoResultsPerPageUndefined"
              )
            )
          })
        });
      });
    });

    test("should handle result chart", (): void => {
      testScheduler.run((runHelpers: RunHelpers): void => {
        const { cold, expectObservable } = runHelpers;
        const action$: ColdObservable<IActionCallbackQueryDataFind> = cold(
          "-a",
          {
            a: actions.callbackQueryDataFind.result({
              result: resultChart
            })
          }
        );
        const state$: StateObservable<IState> | undefined = new StateObservable(
          new Subject(),
          state$Value
        );
        const dependencies: IDependencies = {
          ...initDependencies(locales).initDependencies
        };
        const output$ = epic.callbackQueryDataFindToSendMessage(
          action$,
          state$,
          dependencies
        );
        expectObservable(output$).toBe("-a", {
          a: actions.youtubeVideoList.query({
            query: {
              chart: resultChart.chart,
              hl: env.GOOGLE_API_RELEVANCE_LANGUAGE,
              key: env.GOOGLE_API_KEY,
              maxResults: (result.pageInfo as youtube_v3.Schema$PageInfo)
                .resultsPerPage as number,
              part: "id,snippet",
              pageToken: query.pageToken,
              regionCode: env.GOOGLE_API_REGION_CODE
            }
          })
        });
      });
    });

    test("should handle result q", (): void => {
      testScheduler.run((runHelpers: RunHelpers): void => {
        const { cold, expectObservable } = runHelpers;
        const action$: ColdObservable<IActionCallbackQueryDataFind> = cold(
          "-a",
          {
            a: actions.callbackQueryDataFind.result({
              result: resultQ
            })
          }
        );
        const state$: StateObservable<IState> | undefined = new StateObservable(
          new Subject(),
          state$Value
        );
        const dependencies: IDependencies = {
          ...initDependencies(locales).initDependencies
        };
        const output$ = epic.callbackQueryDataFindToSendMessage(
          action$,
          state$,
          dependencies
        );
        expectObservable(output$).toBe("-a", {
          a: actions.youtubeSearchList.query({
            query: {
              key: env.GOOGLE_API_KEY,
              maxResults: (result.pageInfo as youtube_v3.Schema$PageInfo)
                .resultsPerPage as number,
              part: "id,snippet",
              pageToken: query.pageToken,
              q: resultQ.q,
              regionCode: env.GOOGLE_API_REGION_CODE,
              relevanceLanguage: env.GOOGLE_API_RELEVANCE_LANGUAGE,
              safeSearch: env.GOOGLE_API_SAFE_SEARCH,
              type: env.GOOGLE_API_SEARCH_LIST_TYPE
            }
          })
        });
      });
    });

    test("should handle result", (): void => {
      testScheduler.run((runHelpers: RunHelpers): void => {
        const { cold, expectObservable } = runHelpers;
        const action$: ColdObservable<IActionCallbackQueryDataFind> = cold(
          "-a",
          {
            a: actions.callbackQueryDataFind.result({
              result: result
            })
          }
        );
        const state$: StateObservable<IState> | undefined = new StateObservable(
          new Subject(),
          state$Value
        );
        const dependencies: IDependencies = {
          ...initDependencies(locales).initDependencies
        };
        const output$ = epic.callbackQueryDataFindToSendMessage(
          action$,
          state$,
          dependencies
        );
        expectObservable(output$).toBe(
          "-#",
          {},
          new Error(
            locales.find("actionCallbackQueryDataFindResultChartQUndefined")
          )
        );
      });
    });
  });
});
