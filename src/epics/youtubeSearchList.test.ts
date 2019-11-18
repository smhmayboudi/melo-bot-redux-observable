import { youtube_v3 } from "googleapis";

import { StateObservable } from "redux-observable";
import { Observable, Subject } from "rxjs";
import { ColdObservable } from "rxjs/internal/testing/ColdObservable";
import { RunHelpers } from "rxjs/internal/testing/TestScheduler";
import { TestScheduler } from "rxjs/testing";

import { initialState } from "../utils/store";
import { IActionAnswerInlineQuery } from "../../types/iActionAnswerInlineQuery";
import { IActionCallbackQueryDataInsert } from "../../types/iActionCallbackQueryDataInsert";
import { IActionEditMessageText } from "../../types/iActionEditMessageText";
import { IActionSendMessage } from "../../types/iActionSendMessage";
import { IActionYoutubeSearchList } from "../../types/iActionYoutubeSearchList";
import { IDependencies } from "../../types/iDependencies";
import { IState } from "../../types/iState";
// import { IStateInlineQueryQuery } from "../../types/iStateInlineQueryQuery";
// import { IStateMessageQuery } from "../../types/iStateMessageQuery";
import { IStateYoutubeSearchListQuery } from "../../types/iStateYoutubeSearchListQuery";
import * as actions from "../actions";
// import * as texts from "../configs/texts";
// import { transformSearchResults as transformSearchListInlineQueryResultArticle } from "../utils/inlineQueryResultArticle";
import { transformSearchResults as transformSearchListString } from "../utils/string";
import * as epic from "./youtubeSearchList";
import { initialDependencies } from "../utils/dependencies";

describe("youtubeSearchList epic", (): void => {
  // const error: Error = new Error("");
  const query: IStateYoutubeSearchListQuery = {
    key: "",
    q: "",
    relatedToVideoId: undefined
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
  const state$Value: IState = {
    ...initialState,
    inlineQuery: {
      query: {
        from: {
          first_name: "",
          id: 0,
          is_bot: false
        },
        id: "",
        offset: "",
        query: ""
      }
    },
    message: {
      query: {
        callback_query: {
          chat_instance: "",
          from: {
            first_name: "",
            id: 0,
            is_bot: false
          },
          id: "",
          message: {
            chat: {
              id: 0,
              type: ""
            },
            date: 0,
            message_id: 0,
            reply_to_message: {
              chat: {
                id: 0,
                type: ""
              },
              date: 0,
              message_id: 0,
              text: ""
            }
          }
        },
        message: {
          chat: {
            id: 0,
            type: ""
          },
          date: 0,
          message_id: 0,
          text: ""
        },
        update_id: 0
      }
    },
    youtubeSearchList: {
      query
    }
  };
  // const state$ValueMessageQueryUndefined: IState = {
  //   ...state$Value,
  //   message: {
  //     ...state$Value.message,
  //     query: undefined
  //   }
  // };
  // const state$ValueMessageQueryMessageUndefined: IState = {
  //   ...state$Value,
  //   message: {
  //     ...state$Value.message,
  //     query: {
  //       ...(state$Value.message.query as IStateMessageQuery),
  //       message: undefined
  //     }
  //   }
  // };
  // const state$ValueInlineQueryQueryUndefined: IState = {
  //   ...state$Value,
  //   inlineQuery: {
  //     ...state$Value.inlineQuery,
  //     query: undefined
  //   }
  // };
  // const state$ValueYoutubeSearchListQueryUndefined: IState = {
  //   ...state$Value,
  //   youtubeSearchList: {
  //     ...state$Value.youtubeSearchList,
  //     query: undefined
  //   }
  // };
  // const state$ValueYoutubeSearchListQueryQUndefined: IState = {
  //   ...state$Value,
  //   youtubeSearchList: {
  //     ...state$Value.youtubeSearchList,
  //     query: {
  //       ...(state$Value.youtubeSearchList
  //         .query as IStateYoutubeSearchListQuery),
  //       q: undefined
  //     }
  //   }
  // };

  let testScheduler: TestScheduler;

  beforeEach((): void => {
    testScheduler = new TestScheduler((actual: IState, expected: IState):
      | boolean
      | void => {
      expect(actual).toEqual(expected);
    });
  });

  // test("should handle dependency requestsObservable error", (): void => {
  //   testScheduler.run((runHelpers: RunHelpers): void => {
  //     const { cold, expectObservable } = runHelpers;
  //     const action$: ColdObservable<IActionYoutubeSearchList> = cold("-a", {
  //       a: actions.youtubeSearchList.query({ query })
  //     });
  //     const state$: StateObservable<IState> | undefined = new StateObservable(
  //       new Subject(),
  //       state$Value
  //     );
  //     const dependencies: IDependencies = {
  //       requestsObservable: (): ColdObservable<any> => cold("--#", {}, error)
  //     };
  //     const output$: Observable<
  //       | IActionAnswerInlineQuery
  //       | IActionCallbackQueryDataInsert
  //       | IActionEditMessageText
  //       | IActionSendMessage
  //       | IActionYoutubeSearchList
  //     > = epic.youtubeSearchList(action$, state$, dependencies);
  //     expectObservable(output$).toBe("---a", {
  //       a: actions.youtubeSearchList.error({ error })
  //     });
  //   });
  // });

  // test("should handle error actionYoutubeSearchListQuery undefined", (): void => {
  //   testScheduler.run((runHelpers: RunHelpers): void => {
  //     const { cold, expectObservable } = runHelpers;
  //     const action$: ColdObservable<IActionYoutubeSearchList> = cold("-a", {
  //       a: actions.youtubeSearchList.query({})
  //     });
  //     const state$: StateObservable<IState> | undefined = new StateObservable(
  //       new Subject(),
  //       state$Value
  //     );
  //     const dependencies: IDependencies = {
  //       requestsObservable: (): ColdObservable<any> =>
  //         cold("--a", { a: { items: undefined } })
  //     };
  //     const output$: Observable<
  //       | IActionAnswerInlineQuery
  //       | IActionCallbackQueryDataInsert
  //       | IActionEditMessageText
  //       | IActionSendMessage
  //       | IActionYoutubeSearchList
  //     > = epic.youtubeSearchList(action$, state$, dependencies);
  //     expectObservable(output$).toBe("-a", {
  //       a: actions.youtubeSearchList.error({
  //         error: new Error(texts.actionYoutubeSearchListQueryUndefined)
  //       })
  //     });
  //   });
  // });

  // test("should handle error actionYoutubeSearchListResult undefined", (): void => {
  //   testScheduler.run((runHelpers: RunHelpers): void => {
  //     const { cold, expectObservable } = runHelpers;
  //     const action$: ColdObservable<IActionYoutubeSearchList> = cold("-a", {
  //       a: actions.youtubeSearchList.query({ query })
  //     });
  //     const state$: StateObservable<IState> | undefined = undefined;
  //     const dependencies: IDependencies = {
  //       requestsObservable: (): ColdObservable<any> =>
  //         cold("--a", { a: undefined })
  //     };
  //     const output$: Observable<
  //       | IActionAnswerInlineQuery
  //       | IActionCallbackQueryDataInsert
  //       | IActionEditMessageText
  //       | IActionSendMessage
  //       | IActionYoutubeSearchList
  //     > = epic.youtubeSearchList(action$, state$, dependencies);
  //     expectObservable(output$).toBe("---a", {
  //       a: actions.youtubeSearchList.error({
  //         error: new Error(texts.actionYoutubeSearchListResultUndefined)
  //       })
  //     });
  //   });
  // });

  // test("should handle error actionYoutubeSearchListResultItems undefined", (): void => {
  //   testScheduler.run((runHelpers: RunHelpers): void => {
  //     const { cold, expectObservable } = runHelpers;
  //     const action$: ColdObservable<IActionYoutubeSearchList> = cold("-a", {
  //       a: actions.youtubeSearchList.query({ query })
  //     });
  //     const state$: StateObservable<IState> | undefined = new StateObservable(
  //       new Subject(),
  //       state$Value
  //     );
  //     const dependencies: IDependencies = {
  //       requestsObservable: (): ColdObservable<any> =>
  //         cold("--a", { a: { items: undefined } })
  //     };
  //     const output$: Observable<
  //       | IActionAnswerInlineQuery
  //       | IActionCallbackQueryDataInsert
  //       | IActionEditMessageText
  //       | IActionSendMessage
  //       | IActionYoutubeSearchList
  //     > = epic.youtubeSearchList(action$, state$, dependencies);
  //     expectObservable(output$).toBe("---a", {
  //       a: actions.youtubeSearchList.error({
  //         error: new Error(texts.actionYoutubeSearchListResultItemsUndefined)
  //       })
  //     });
  //   });
  // });

  // test("should handle error state$ undefined", (): void => {
  //   testScheduler.run((runHelpers: RunHelpers): void => {
  //     const { cold, expectObservable } = runHelpers;
  //     const action$: ColdObservable<IActionYoutubeSearchList> = cold("-a", {
  //       a: actions.youtubeSearchList.query({ query })
  //     });
  //     const state$: StateObservable<IState> | undefined = undefined;
  //     const dependencies: IDependencies = {
  //       requestsObservable: (): ColdObservable<any> =>
  //         cold("--a", { a: result })
  //     };
  //     const output$: Observable<
  //       | IActionAnswerInlineQuery
  //       | IActionCallbackQueryDataInsert
  //       | IActionEditMessageText
  //       | IActionSendMessage
  //       | IActionYoutubeSearchList
  //     > = epic.youtubeSearchList(action$, state$, dependencies);
  //     expectObservable(output$).toBe("---a", {
  //       a: actions.youtubeSearchList.error({
  //         error: new Error(texts.state$Undefined)
  //       })
  //     });
  //   });
  // });

  // test("should handle error inline state$ValueInlineQueryQuery undefined", (): void => {
  //   testScheduler.run((runHelpers: RunHelpers): void => {
  //     const { cold, expectObservable } = runHelpers;
  //     const action$: ColdObservable<IActionYoutubeSearchList> = cold("-a", {
  //       a: actions.youtubeSearchList.query({ query })
  //     });
  //     const state$: StateObservable<IState> | undefined = new StateObservable(
  //       new Subject(),
  //       state$ValueInlineQueryQueryUndefined
  //     );
  //     const dependencies: IDependencies = {
  //       requestsObservable: (): ColdObservable<any> =>
  //         cold("--a", { a: result })
  //     };
  //     const output$: Observable<
  //       | IActionAnswerInlineQuery
  //       | IActionCallbackQueryDataInsert
  //       | IActionEditMessageText
  //       | IActionSendMessage
  //       | IActionYoutubeSearchList
  //     > = epic.youtubeSearchList(action$, state$, dependencies);
  //     expectObservable(output$).toBe("---a", {
  //       a: actions.youtubeSearchList.error({
  //         error: new Error(texts.state$ValueInlineQueryQueryUndefined)
  //       })
  //     });
  //   });
  // });

  // test("should handle error inline state$ValueYoutubeSearchListQuery undefined", (): void => {
  //   testScheduler.run((runHelpers: RunHelpers): void => {
  //     const { cold, expectObservable } = runHelpers;
  //     const action$: ColdObservable<IActionYoutubeSearchList> = cold("-a", {
  //       a: actions.youtubeSearchList.query({ query })
  //     });
  //     const state$: StateObservable<IState> | undefined = new StateObservable(
  //       new Subject(),
  //       state$ValueYoutubeSearchListQueryUndefined
  //     );
  //     const dependencies: IDependencies = {
  //       requestsObservable: (): ColdObservable<any> =>
  //         cold("--a", { a: result })
  //     };
  //     const output$: Observable<
  //       | IActionAnswerInlineQuery
  //       | IActionCallbackQueryDataInsert
  //       | IActionEditMessageText
  //       | IActionSendMessage
  //       | IActionYoutubeSearchList
  //     > = epic.youtubeSearchList(action$, state$, dependencies);
  //     expectObservable(output$).toBe("---a", {
  //       a: actions.youtubeSearchList.error({
  //         error: new Error(texts.state$ValueYoutubeSearchListQueryUndefined)
  //       })
  //     });
  //   });
  // });

  // test("should handle error inline state$ValueYoutubeSearchListQueryQ undefined", (): void => {
  //   testScheduler.run((runHelpers: RunHelpers): void => {
  //     const { cold, expectObservable } = runHelpers;
  //     const action$: ColdObservable<IActionYoutubeSearchList> = cold("-a", {
  //       a: actions.youtubeSearchList.query({ query })
  //     });
  //     const state$: StateObservable<IState> | undefined = new StateObservable(
  //       new Subject(),
  //       state$ValueYoutubeSearchListQueryQUndefined
  //     );
  //     const dependencies: IDependencies = {
  //       requestsObservable: (): ColdObservable<any> =>
  //         cold("--a", { a: result })
  //     };
  //     const output$: Observable<
  //       | IActionAnswerInlineQuery
  //       | IActionCallbackQueryDataInsert
  //       | IActionEditMessageText
  //       | IActionSendMessage
  //       | IActionYoutubeSearchList
  //     > = epic.youtubeSearchList(action$, state$, dependencies);
  //     expectObservable(output$).toBe("---a", {
  //       a: actions.youtubeSearchList.error({
  //         error: new Error(texts.state$ValueYoutubeSearchListQueryQUndefined)
  //       })
  //     });
  //   });
  // });

  // test("should handle result inline", (): void => {
  //   testScheduler.run((runHelpers: RunHelpers): void => {
  //     const { cold, expectObservable } = runHelpers;
  //     const action$: ColdObservable<IActionYoutubeSearchList> = cold("-a", {
  //       a: actions.youtubeSearchList.query({ query })
  //     });
  //     const state$: StateObservable<IState> | undefined = new StateObservable(
  //       new Subject(),
  //       state$Value
  //     );
  //     const dependencies: IDependencies = {
  //       requestsObservable: (): ColdObservable<any> =>
  //         cold("--a", { a: result })
  //     };
  //     const output$: Observable<
  //       | IActionAnswerInlineQuery
  //       | IActionCallbackQueryDataInsert
  //       | IActionEditMessageText
  //       | IActionSendMessage
  //       | IActionYoutubeSearchList
  //     > = epic.youtubeSearchList(action$, state$, dependencies);
  //     expectObservable(output$).toBe("---a", {
  //       a: actions.answerInlineQuery.query({
  //         query: {
  //           inline_query_id: (state$Value.inlineQuery
  //             .query as IStateInlineQueryQuery).id,
  //           is_personal: true,
  //           results: transformSearchListInlineQueryResultArticle(
  //             result.items as youtube_v3.Schema$SearchResult[]
  //           ),
  //           switch_pm_parameter: "string",
  //           switch_pm_text: texts.actionAnswerInlineQueryQuerySwitchPMText
  //         }
  //       })
  //     });
  //   });
  // });

  // test("should handle error message state$ValueMessageQuery undefined", (): void => {
  //   testScheduler.run((runHelpers: RunHelpers): void => {
  //     const { cold, expectObservable } = runHelpers;
  //     const action$: ColdObservable<IActionYoutubeSearchList> = cold("-a", {
  //       a: actions.youtubeSearchList.query({ query })
  //     });
  //     const state$: StateObservable<IState> | undefined = new StateObservable(
  //       new Subject(),
  //       state$ValueMessageQueryUndefined
  //     );
  //     const dependencies: IDependencies = {
  //       requestsObservable: (): ColdObservable<any> =>
  //         cold("--a", { a: result })
  //     };
  //     const output$: Observable<
  //       | IActionAnswerInlineQuery
  //       | IActionCallbackQueryDataInsert
  //       | IActionEditMessageText
  //       | IActionSendMessage
  //       | IActionYoutubeSearchList
  //     > = epic.youtubeSearchList(action$, state$, dependencies);
  //     expectObservable(output$).toBe("---a", {
  //       a: actions.youtubeSearchList.error({
  //         error: new Error(texts.state$ValueMessageQueryUndefined)
  //       })
  //     });
  //   });
  // });

  // test("should handle error message state$ValueMessageQueryMessage undefined", (): void => {
  //   testScheduler.run((runHelpers: RunHelpers): void => {
  //     const { cold, expectObservable } = runHelpers;
  //     const action$: ColdObservable<IActionYoutubeSearchList> = cold("-a", {
  //       a: actions.youtubeSearchList.query({ query })
  //     });
  //     const state$: StateObservable<IState> | undefined = new StateObservable(
  //       new Subject(),
  //       state$ValueMessageQueryMessageUndefined
  //     );
  //     const dependencies: IDependencies = {
  //       requestsObservable: (): ColdObservable<any> =>
  //         cold("--a", { a: result })
  //     };
  //     const output$: Observable<
  //       | IActionAnswerInlineQuery
  //       | IActionCallbackQueryDataInsert
  //       | IActionEditMessageText
  //       | IActionSendMessage
  //       | IActionYoutubeSearchList
  //     > = epic.youtubeSearchList(action$, state$, dependencies);
  //     expectObservable(output$).toBe("---a", {
  //       a: actions.youtubeSearchList.error({
  //         error: new Error(texts.state$ValueMessageQueryMessageUndefined)
  //       })
  //     });
  //   });
  // });

  // test("should handle error message state$ValueYoutubeSearchListQuery undefined", (): void => {
  //   testScheduler.run((runHelpers: RunHelpers): void => {
  //     const { cold, expectObservable } = runHelpers;
  //     const action$: ColdObservable<IActionYoutubeSearchList> = cold("-a", {
  //       a: actions.youtubeSearchList.query({ query })
  //     });
  //     const state$: StateObservable<IState> | undefined = new StateObservable(
  //       new Subject(),
  //       state$ValueYoutubeSearchListQueryUndefined
  //     );
  //     const dependencies: IDependencies = {
  //       requestsObservable: (): ColdObservable<any> =>
  //         cold("--a", { a: result })
  //     };
  //     const output$: Observable<
  //       | IActionAnswerInlineQuery
  //       | IActionCallbackQueryDataInsert
  //       | IActionEditMessageText
  //       | IActionSendMessage
  //       | IActionYoutubeSearchList
  //     > = epic.youtubeSearchList(action$, state$, dependencies);
  //     expectObservable(output$).toBe("---a", {
  //       a: actions.youtubeSearchList.error({
  //         error: new Error(texts.state$ValueYoutubeSearchListQueryUndefined)
  //       })
  //     });
  //   });
  // });

  // test("should handle error message state$ValueYoutubeSearchListQueryQ undefined", (): void => {
  //   testScheduler.run((runHelpers: RunHelpers): void => {
  //     const { cold, expectObservable } = runHelpers;
  //     const action$: ColdObservable<IActionYoutubeSearchList> = cold("-a", {
  //       a: actions.youtubeSearchList.query({ query })
  //     });
  //     const state$: StateObservable<IState> | undefined = new StateObservable(
  //       new Subject(),
  //       state$ValueYoutubeSearchListQueryQUndefined
  //     );
  //     const dependencies: IDependencies = {
  //       requestsObservable: (): ColdObservable<any> =>
  //         cold("--a", { a: result })
  //     };
  //     const output$: Observable<
  //       | IActionAnswerInlineQuery
  //       | IActionCallbackQueryDataInsert
  //       | IActionEditMessageText
  //       | IActionSendMessage
  //       | IActionYoutubeSearchList
  //     > = epic.youtubeSearchList(action$, state$, dependencies);
  //     expectObservable(output$).toBe("---a", {
  //       a: actions.youtubeSearchList.error({
  //         error: new Error(texts.state$ValueYoutubeSearchListQueryQUndefined)
  //       })
  //     });
  //   });
  // });

  test("should handle result message", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionYoutubeSearchList> = cold("-a", {
        a: actions.youtubeSearchList.query({ query })
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        state$Value
      );
      const dependencies: IDependencies = {
        ...initialDependencies,
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: result })
      };
      const output$: Observable<
        | IActionAnswerInlineQuery
        | IActionCallbackQueryDataInsert
        | IActionEditMessageText
        | IActionSendMessage
        | IActionYoutubeSearchList
      > = epic.youtubeSearchList(action$, state$, dependencies);
      expectObservable(output$).toBe("---a", {
        a: actions.sendMessage.query({
          query: {
            chat_id: 0,
            disable_notification: true,
            disable_web_page_preview: true,
            parse_mode: "HTML",
            reply_to_message_id: 0,
            text: transformSearchListString(
              result.items as youtube_v3.Schema$SearchResult[],
              (state$Value.youtubeSearchList
                .query as IStateYoutubeSearchListQuery).q
            )
          }
        })
      });
    });
  });
});
