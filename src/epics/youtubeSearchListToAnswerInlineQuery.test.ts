import { youtube_v3 } from "googleapis";
import { StateObservable } from "redux-observable";
import { Observable, of, Subject } from "rxjs";
import { RunHelpers } from "rxjs/internal/testing/TestScheduler";
import { TestScheduler } from "rxjs/testing";

import { IActionYoutubeSearchList } from "../../types/iActionYoutubeSearchList";
import { IDependencies } from "../../types/iDependencies";
import { ILocale } from "../../types/iLocale";
import { IState } from "../../types/iState";
import { IStateInlineQueryQuery } from "../../types/iStateInlineQueryQuery";
import { IStateYoutubeSearchListQuery } from "../../types/iStateYoutubeSearchListQuery";
import * as actions from "../actions";
import { init as initDependencies } from "../utils/dependencies";
import { transformSearchResults } from "../utils/inlineQueryResultArticle";
import { initialState } from "../utils/store";
import { encode, locale } from "../utils/string";
import { transformObservable } from "./youtubeSearchListToAnswerInlineQuery";

describe("youtubeSearchList epic", (): void => {
  describe("youtubeSearchListToAnswerInlineQuery", (): void => {
    const error: Error = new Error("");
    const query: IStateYoutubeSearchListQuery = {
      key: "",
      q: "",
      relatedToVideoId: undefined
    };
    const state$Value: IState = {
      ...initialState,
      inlineQuery: {
        query: {
          from: {
            first_name: "",
            id: 0,
            is_bot: false,
            language_code: "en"
          },
          id: "",
          offset: "",
          query: ""
        }
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
      },
      youtubeSearchList: {
        query
      }
    };
    const state$ValueInlineQueryQueryUndefined: IState = {
      ...state$Value,
      inlineQuery: {
        ...state$Value.inlineQuery,
        query: undefined
      }
    };
    const state$ValueYoutubeSearchListQueryUndefined: IState = {
      ...state$Value,
      youtubeSearchList: {
        ...state$Value.youtubeSearchList,
        query: undefined
      }
    };
    const state$ValueYoutubeSearchListQueryQRelatedToVideoIdUndefined: IState = {
      ...state$Value,
      youtubeSearchList: {
        ...state$Value.youtubeSearchList,
        query: {
          ...(state$Value.youtubeSearchList
            .query as IStateYoutubeSearchListQuery),
          q: undefined,
          relatedToVideoId: undefined
        }
      }
    };
    const actionYoutubeSearchListResult: youtube_v3.Schema$SearchListResponse = {
      items: [{}],
      nextPageToken: ""
    };
    const actionYoutubeSearchListResultItemsUndefined: youtube_v3.Schema$SearchListResponse = {
      ...actionYoutubeSearchListResult,
      items: undefined
    };
    const actionYoutubeSearchListResultNextPageTokenUndefined: youtube_v3.Schema$SearchListResponse = {
      ...actionYoutubeSearchListResult,
      nextPageToken: undefined
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

    test("should handle error", (): void => {
      testScheduler.run((runHelpers: RunHelpers): void => {
        const { expectObservable } = runHelpers;
        const action: IActionYoutubeSearchList = actions.youtubeSearchList.error(
          {
            error
          }
        );
        const state$: StateObservable<IState> | undefined = new StateObservable(
          new Subject(),
          state$Value
        );
        const dependencies: IDependencies = {
          ...initDependencies(locales),
          authorization: (): Observable<boolean> => of(true)
        };
        const action2 = actions.callbackQueryDataInsert.result({
          result: ""
        });
        expectObservable(
          transformObservable(action, state$, dependencies)(action2)
        ).toBe("(a|)", { a: action });
      });
    });

    test("should handle error state$ undefined", (): void => {
      testScheduler.run((runHelpers: RunHelpers): void => {
        const { expectObservable } = runHelpers;
        const action: IActionYoutubeSearchList = actions.youtubeSearchList.query(
          {
            query
          }
        );
        const state$: StateObservable<IState> | undefined = undefined;
        const dependencies: IDependencies = {
          ...initDependencies(locales),
          authorization: (): Observable<boolean> => of(true)
        };
        const action2 = actions.callbackQueryDataInsert.result({
          result: ""
        });
        expectObservable(
          transformObservable(action, state$, dependencies)(action2)
        ).toBe("(a|)", {
          a: actions.youtubeSearchList.error({
            error: new Error(locales.find("state$Undefined"))
          })
        });
      });
    });

    test("should handle error state$ValueInlineQueryQuery undefined", (): void => {
      testScheduler.run((runHelpers: RunHelpers): void => {
        const { expectObservable } = runHelpers;
        const action: IActionYoutubeSearchList = actions.youtubeSearchList.query(
          {
            query
          }
        );
        const state$: StateObservable<IState> | undefined = new StateObservable(
          new Subject(),
          state$ValueInlineQueryQueryUndefined
        );
        const dependencies: IDependencies = {
          ...initDependencies(locales),
          authorization: (): Observable<boolean> => of(true)
        };
        const action2 = actions.callbackQueryDataInsert.result({
          result: ""
        });
        expectObservable(
          transformObservable(action, state$, dependencies)(action2)
        ).toBe("(a|)", {
          a: actions.youtubeSearchList.error({
            error: new Error(
              locales.find("state$ValueInlineQueryQueryUndefined")
            )
          })
        });
      });
    });

    test("should handle error state$ValueYoutubeSearchListQuery undefined", (): void => {
      testScheduler.run((runHelpers: RunHelpers): void => {
        const { expectObservable } = runHelpers;
        const action: IActionYoutubeSearchList = actions.youtubeSearchList.query(
          {
            query: undefined
          }
        );
        const state$: StateObservable<IState> | undefined = new StateObservable(
          new Subject(),
          state$ValueYoutubeSearchListQueryUndefined
        );
        const dependencies: IDependencies = {
          ...initDependencies(locales),
          authorization: (): Observable<boolean> => of(true)
        };
        const action2 = actions.callbackQueryDataInsert.result({
          result: ""
        });
        expectObservable(
          transformObservable(action, state$, dependencies)(action2)
        ).toBe("(a|)", {
          a: actions.youtubeSearchList.error({
            error: new Error(
              locales.find("state$ValueYoutubeSearchListQueryUndefined")
            )
          })
        });
      });
    });

    test("should handle error actionYoutubeSearchListResult undefined", (): void => {
      testScheduler.run((runHelpers: RunHelpers): void => {
        const { expectObservable } = runHelpers;
        const action: IActionYoutubeSearchList = actions.youtubeSearchList.result(
          {
            result: undefined
          }
        );
        const state$: StateObservable<IState> | undefined = new StateObservable(
          new Subject(),
          state$Value
        );
        const dependencies: IDependencies = {
          ...initDependencies(locales),
          authorization: (): Observable<boolean> => of(true)
        };
        const action2 = actions.callbackQueryDataInsert.result({
          result: ""
        });
        expectObservable(
          transformObservable(action, state$, dependencies)(action2)
        ).toBe("(a|)", {
          a: actions.youtubeSearchList.error({
            error: new Error(
              locales.find("actionYoutubeSearchListResultUndefined")
            )
          })
        });
      });
    });

    test("should handle error actionYoutubeSearchListResultItems undefined", (): void => {
      testScheduler.run((runHelpers: RunHelpers): void => {
        const { expectObservable } = runHelpers;
        const action: IActionYoutubeSearchList = actions.youtubeSearchList.result(
          {
            result: actionYoutubeSearchListResultItemsUndefined
          }
        );
        const state$: StateObservable<IState> | undefined = new StateObservable(
          new Subject(),
          state$Value
        );
        const dependencies: IDependencies = {
          ...initDependencies(locales),
          authorization: (): Observable<boolean> => of(true)
        };
        const action2 = actions.callbackQueryDataInsert.result({
          result: ""
        });
        expectObservable(
          transformObservable(action, state$, dependencies)(action2)
        ).toBe("(a|)", {
          a: actions.youtubeSearchList.error({
            error: new Error(
              locales.find("actionYoutubeSearchListResultItemsUndefined")
            )
          })
        });
      });
    });

    test("should handle error action2CallbackQueryDataInsertResult undefined", (): void => {
      testScheduler.run((runHelpers: RunHelpers): void => {
        const { expectObservable } = runHelpers;
        const action: IActionYoutubeSearchList = actions.youtubeSearchList.result(
          {
            result: actionYoutubeSearchListResult
          }
        );
        const state$: StateObservable<IState> | undefined = new StateObservable(
          new Subject(),
          state$Value
        );
        const dependencies: IDependencies = {
          ...initDependencies(locales),
          authorization: (): Observable<boolean> => of(true)
        };
        const action2 = actions.callbackQueryDataInsert.result({
          result: undefined
        });
        expectObservable(
          transformObservable(action, state$, dependencies)(action2)
        ).toBe("(a|)", {
          a: actions.youtubeSearchList.error({
            error: new Error(
              locales.find("actionCallbackQueryDataInsertResultUndefined")
            )
          })
        });
      });
    });

    test("should handle error state$ValueYoutubeSearchListQueryQRelatedToVideoId undefined", (): void => {
      testScheduler.run((runHelpers: RunHelpers): void => {
        const { expectObservable } = runHelpers;
        const action: IActionYoutubeSearchList = actions.youtubeSearchList.result(
          {
            result: actionYoutubeSearchListResult
          }
        );
        const state$: StateObservable<IState> | undefined = new StateObservable(
          new Subject(),
          state$ValueYoutubeSearchListQueryQRelatedToVideoIdUndefined
        );
        const dependencies: IDependencies = {
          ...initDependencies(locales),
          authorization: (): Observable<boolean> => of(true)
        };
        const action2 = actions.callbackQueryDataInsert.result({
          result: ""
        });
        expectObservable(
          transformObservable(action, state$, dependencies)(action2)
        ).toBe("(a|)", {
          a: actions.youtubeSearchList.error({
            error: new Error(
              locales.find(
                "state$ValueYoutubeSearchListQueryQRelatedToVideoIdUndefined"
              )
            )
          })
        });
      });
    });

    test("should handle result actionYoutubeSearchListResultNextPageToken undefined", (): void => {
      testScheduler.run((runHelpers: RunHelpers): void => {
        const { expectObservable } = runHelpers;
        const action: IActionYoutubeSearchList = actions.youtubeSearchList.result(
          {
            result: actionYoutubeSearchListResultNextPageTokenUndefined
          }
        );
        const state$: StateObservable<IState> | undefined = new StateObservable(
          new Subject(),
          state$Value
        );
        const dependencies: IDependencies = {
          ...initDependencies(locales),
          authorization: (): Observable<boolean> => of(true)
        };
        const action2 = actions.callbackQueryDataInsert.result({
          result: ""
        });
        expectObservable(
          transformObservable(action, state$, dependencies)(action2)
        ).toBe("(a|)", {
          a: actions.answerInlineQuery.query({
            query: {
              inline_query_id: (state$.value.inlineQuery
                .query as IStateInlineQueryQuery).id,
              is_personal: true,
              next_offset: "",
              results: transformSearchResults(
                (action.youtubeSearchList
                  .result as youtube_v3.Schema$SearchListResponse)
                  .items as youtube_v3.Schema$SearchResult[]
              ),
              switch_pm_parameter: "string",
              switch_pm_text: locales.find(
                "actionAnswerInlineQueryQuerySwitchPMText"
              )
            }
          })
        });
      });
    });

    test("should handle result", (): void => {
      testScheduler.run((runHelpers: RunHelpers): void => {
        const { expectObservable } = runHelpers;
        const action: IActionYoutubeSearchList = actions.youtubeSearchList.result(
          {
            result: actionYoutubeSearchListResult
          }
        );
        const state$: StateObservable<IState> | undefined = new StateObservable(
          new Subject(),
          state$Value
        );
        const dependencies: IDependencies = {
          ...initDependencies(locales),
          authorization: (): Observable<boolean> => of(true)
        };
        const action2 = actions.callbackQueryDataInsert.result({
          result: ""
        });
        expectObservable(
          transformObservable(action, state$, dependencies)(action2)
        ).toBe("(a|)", {
          a: actions.answerInlineQuery.query({
            query: {
              inline_query_id: (state$.value.inlineQuery
                .query as IStateInlineQueryQuery).id,
              is_personal: true,
              next_offset: encode(
                {
                  id: action2.callbackQueryDataInsert.result as string,
                  pageToken: (action.youtubeSearchList
                    .result as youtube_v3.Schema$SearchListResponse)
                    .nextPageToken as string
                },
                "iStateCallbackQueryDataFindQuery"
              ),
              results: transformSearchResults(
                (action.youtubeSearchList
                  .result as youtube_v3.Schema$SearchListResponse)
                  .items as youtube_v3.Schema$SearchResult[]
              ),
              switch_pm_parameter: "string",
              switch_pm_text: locales.find(
                "actionAnswerInlineQueryQuerySwitchPMText"
              )
            }
          })
        });
      });
    });
  });
});
