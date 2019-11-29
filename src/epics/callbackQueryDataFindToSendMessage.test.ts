declare global {
  namespace NodeJS {
    interface Global {
      __MONGO_DB_NAME__: string;
      __MONGO_URI__: string;
    }
  }
}

import { youtube_v3 } from "googleapis";

import { MongoClient } from "mongodb";
import { StateObservable } from "redux-observable";
import { Subject } from "rxjs";
import { RunHelpers } from "rxjs/internal/testing/TestScheduler";
import { TestScheduler } from "rxjs/testing";

import { initialState } from "../utils/store";
import { IActionCallbackQueryDataFind } from "../../types/iActionCallbackQueryDataFind";
import { IState } from "../../types/iState";
import { IStateCallbackQueryDataFindQuery } from "../../types/iStateCallbackQueryDataFindQuery";
import { IStateCallbackQueryDataInsertQuery } from "../../types/iStateCallbackQueryDataInsertQuery";
import * as actions from "../actions";
import * as env from "../configs/env";
import * as texts from "../configs/texts";
import { transformObservable } from "./callbackQueryDataFindToSendMessage";

describe("callbackQueryDataFind epic", (): void => {
  describe("callbackQueryDataFindToSendMessage", (): void => {
    const error: Error = new Error("");
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

    // let db: Db;
    let connection: MongoClient;

    beforeAll(
      async (): Promise<any> => {
        connection = await MongoClient.connect(global.__MONGO_URI__, {
          useNewUrlParser: true,
          useUnifiedTopology: true
        });
        // db = connection.db(global.__MONGO_DB_NAME__);
      }
    );

    afterAll(
      async (): Promise<any> => {
        await connection.close();
      }
    );

    test("should handle error", (): void => {
      testScheduler.run((runHelpers: RunHelpers): void => {
        const { expectObservable } = runHelpers;
        const action: IActionCallbackQueryDataFind = actions.callbackQueryDataFind.error(
          {
            error
          }
        );
        const state$: StateObservable<IState> | undefined = new StateObservable(
          new Subject(),
          state$Value
        );
        expectObservable(transformObservable(state$)(action)).toBe("(a|)", {
          a: action
        });
      });
    });

    test("should handle error state$ undefined", (): void => {
      testScheduler.run((runHelpers: RunHelpers): void => {
        const { expectObservable } = runHelpers;
        const action: IActionCallbackQueryDataFind = actions.callbackQueryDataFind.result(
          {
            result
          }
        );
        const state$: StateObservable<IState> | undefined = undefined;
        expectObservable(transformObservable(state$)(action)).toBe("(a|)", {
          a: actions.callbackQueryDataFind.error({
            error: new Error(texts.state$Undefined)
          })
        });
      });
    });

    test("should handle error state$ValueCallbackQueryDataFindQuery undefined", (): void => {
      testScheduler.run((runHelpers: RunHelpers): void => {
        const { expectObservable } = runHelpers;
        const action: IActionCallbackQueryDataFind = actions.callbackQueryDataFind.result(
          {
            result
          }
        );
        const state$: StateObservable<IState> | undefined = new StateObservable(
          new Subject(),
          state$ValueCallbackQueryDataFindQueryUndefined
        );
        expectObservable(transformObservable(state$)(action)).toBe("(a|)", {
          a: actions.callbackQueryDataFind.error({
            error: new Error(
              texts.state$ValueCallbackQueryDataFindQueryUndefined
            )
          })
        });
      });
    });

    test("should handle error actionCallbackQueryDataFindResult undefined", (): void => {
      testScheduler.run((runHelpers: RunHelpers): void => {
        const { expectObservable } = runHelpers;
        const action: IActionCallbackQueryDataFind = actions.callbackQueryDataFind.result(
          {
            result: undefined
          }
        );
        const state$: StateObservable<IState> | undefined = new StateObservable(
          new Subject(),
          state$Value
        );
        expectObservable(transformObservable(state$)(action)).toBe("(a|)", {
          a: actions.callbackQueryDataFind.error({
            error: new Error(texts.actionCallbackQueryDataFindResultUndefined)
          })
        });
      });
    });

    test("should handle error actionCallbackQueryDataFindResultPageInfo undefined", (): void => {
      testScheduler.run((runHelpers: RunHelpers): void => {
        const { expectObservable } = runHelpers;
        const action: IActionCallbackQueryDataFind = actions.callbackQueryDataFind.result(
          {
            result: resultPageInfoUndefined
          }
        );
        const state$: StateObservable<IState> | undefined = new StateObservable(
          new Subject(),
          state$Value
        );
        expectObservable(transformObservable(state$)(action)).toBe("(a|)", {
          a: actions.callbackQueryDataFind.error({
            error: new Error(
              texts.actionCallbackQueryDataFindResultPageInfoUndefined
            )
          })
        });
      });
    });

    test("should handle error actionCallbackQueryDataFindResultPageInfoResultsPerPage undefined", (): void => {
      testScheduler.run((runHelpers: RunHelpers): void => {
        const { expectObservable } = runHelpers;
        const action: IActionCallbackQueryDataFind = actions.callbackQueryDataFind.result(
          {
            result: resultPageInfoResultsPerPageUndefined
          }
        );
        const state$: StateObservable<IState> | undefined = new StateObservable(
          new Subject(),
          state$Value
        );
        expectObservable(transformObservable(state$)(action)).toBe("(a|)", {
          a: actions.callbackQueryDataFind.error({
            error: new Error(
              texts.actionCallbackQueryDataFindResultPageInfoResultsPerPageUndefined
            )
          })
        });
      });
    });

    test("should handle result chart", (): void => {
      testScheduler.run((runHelpers: RunHelpers): void => {
        const { expectObservable } = runHelpers;
        const action: IActionCallbackQueryDataFind = actions.callbackQueryDataFind.result(
          {
            result: resultChart
          }
        );
        const state$: StateObservable<IState> | undefined = new StateObservable(
          new Subject(),
          state$Value
        );
        expectObservable(transformObservable(state$)(action)).toBe("(a|)", {
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
        const { expectObservable } = runHelpers;
        const action: IActionCallbackQueryDataFind = actions.callbackQueryDataFind.result(
          {
            result: resultQ
          }
        );
        const state$: StateObservable<IState> | undefined = new StateObservable(
          new Subject(),
          state$Value
        );
        expectObservable(transformObservable(state$)(action)).toBe("(a|)", {
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
        const { expectObservable } = runHelpers;
        const action: IActionCallbackQueryDataFind = actions.callbackQueryDataFind.result(
          {
            result: result
          }
        );
        const state$: StateObservable<IState> | undefined = new StateObservable(
          new Subject(),
          state$Value
        );
        expectObservable(transformObservable(state$)(action)).toBe("(a|)", {
          a: actions.callbackQueryDataFind.result({ result })
        });
      });
    });
  });
});
