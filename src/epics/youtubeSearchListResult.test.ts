declare global {
  namespace NodeJS {
    interface Global {
      __MONGO_DB_NAME__: string;
      __MONGO_URI__: string;
    }
  }
}

import { youtube_v3 } from "googleapis";
import { Connection, createConnection } from "mariadb";
import { MongoClient } from "mongodb";
import { StateObservable } from "redux-observable";
import { Observable, of, Subject } from "rxjs";
import { ColdObservable } from "rxjs/internal/testing/ColdObservable";
import { RunHelpers } from "rxjs/internal/testing/TestScheduler";
import { TestScheduler } from "rxjs/testing";

import { IActionAnswerInlineQuery } from "../../types/iActionAnswerInlineQuery";
import { IActionCallbackQueryDataInsert } from "../../types/iActionCallbackQueryDataInsert";
import { IActionEditMessageText } from "../../types/iActionEditMessageText";
import { IActionSendMessage } from "../../types/iActionSendMessage";
import { IActionYoutubeSearchList } from "../../types/iActionYoutubeSearchList";
import { IDependencies } from "../../types/iDependencies";
import { ILocale } from "../../types/iLocale";
import { IState } from "../../types/iState";
import { IStateInlineQueryQuery } from "../../types/iStateInlineQueryQuery";
import { IStateMessageQuery } from "../../types/iStateMessageQuery";
import { IStateYoutubeSearchListQuery } from "../../types/iStateYoutubeSearchListQuery";
import * as actions from "../actions";
import * as env from "../configs/env";
import { init as initDependencies } from "../utils/dependencies";
import { transformSearchResults as transformSearchListInlineQueryResultArticle } from "../utils/inlineQueryResultArticle";
import { initialState } from "../utils/store";
import {
  locale,
  transformSearchResults as transformSearchListString
} from "../utils/string";
import * as epic from "./youtubeSearchListResult";

describe("youtubeSearchListResult epic", (): void => {
  const error: Error = new Error("");
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
        callback_query: {
          chat_instance: "",
          from: {
            first_name: "",
            id: 0,
            is_bot: false,
            language_code: "en"
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
  const state$ValueMessageQueryUndefined: IState = {
    ...state$Value,
    message: {
      ...state$Value.message,
      query: undefined
    }
  };
  const state$ValueMessageQueryMessageUndefined: IState = {
    ...state$Value,
    message: {
      ...state$Value.message,
      query: {
        ...(state$Value.message.query as IStateMessageQuery),
        message: undefined
      }
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
  const state$ValueYoutubeSearchListQueryQUndefined: IState = {
    ...state$Value,
    youtubeSearchList: {
      ...state$Value.youtubeSearchList,
      query: {
        ...(state$Value.youtubeSearchList
          .query as IStateYoutubeSearchListQuery),
        q: undefined
      }
    }
  };

  let locales: ILocale;
  let mariaClient: Connection;
  let mongoClient: MongoClient;

  afterAll(
    async (): Promise<void> => {
      await mongoClient.close();
    }
  );

  beforeAll(
    async (): Promise<void> => {
      locales = await locale("en");
      mariaClient = await createConnection(env.MARIA_CLIENT_URI);
      mongoClient = await MongoClient.connect(global.__MONGO_URI__, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
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
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        state$Value
      );
      const dependencies: IDependencies = {
        ...initDependencies(locales, mariaClient, mongoClient),
        authorization: (): Observable<boolean> => of(true),
        requestsObservable: (): ColdObservable<any> => cold("--#", {}, error)
      };
      const output$: Observable<
        | IActionAnswerInlineQuery
        | IActionCallbackQueryDataInsert
        | IActionEditMessageText
        | IActionSendMessage
        | IActionYoutubeSearchList
      > = epic.youtubeSearchListResult(action$, state$, dependencies);
      expectObservable(output$).toBe("---a", {
        a: actions.youtubeSearchList.error({ error })
      });
    });
  });

  test("should handle error actionYoutubeSearchListQuery undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionYoutubeSearchList> = cold("-a", {
        a: actions.youtubeSearchList.query({ query: undefined })
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        state$Value
      );
      const dependencies: IDependencies = {
        ...initDependencies(locales, mariaClient, mongoClient),
        authorization: (): Observable<boolean> => of(true),
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: { items: undefined } })
      };
      const output$: Observable<
        | IActionAnswerInlineQuery
        | IActionCallbackQueryDataInsert
        | IActionEditMessageText
        | IActionSendMessage
        | IActionYoutubeSearchList
      > = epic.youtubeSearchListResult(action$, state$, dependencies);
      expectObservable(output$).toBe("-a", {
        a: actions.youtubeSearchList.error({
          error: new Error(
            locales.find("actionYoutubeSearchListQueryUndefined")
          )
        })
      });
    });
  });

  test("should handle error actionYoutubeSearchListResult undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionYoutubeSearchList> = cold("-a", {
        a: actions.youtubeSearchList.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initDependencies(locales, mariaClient, mongoClient),
        authorization: (): Observable<boolean> => of(true),
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: undefined })
      };
      const output$: Observable<
        | IActionAnswerInlineQuery
        | IActionCallbackQueryDataInsert
        | IActionEditMessageText
        | IActionSendMessage
        | IActionYoutubeSearchList
      > = epic.youtubeSearchListResult(action$, state$, dependencies);
      expectObservable(output$).toBe("---a", {
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
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionYoutubeSearchList> = cold("-a", {
        a: actions.youtubeSearchList.query({ query })
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        state$Value
      );
      const dependencies: IDependencies = {
        ...initDependencies(locales, mariaClient, mongoClient),
        authorization: (): Observable<boolean> => of(true),
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: { items: undefined } })
      };
      const output$: Observable<
        | IActionAnswerInlineQuery
        | IActionCallbackQueryDataInsert
        | IActionEditMessageText
        | IActionSendMessage
        | IActionYoutubeSearchList
      > = epic.youtubeSearchListResult(action$, state$, dependencies);
      expectObservable(output$).toBe("---a", {
        a: actions.youtubeSearchList.error({
          error: new Error(
            locales.find("actionYoutubeSearchListResultItemsUndefined")
          )
        })
      });
    });
  });

  test("should handle error state$ undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionYoutubeSearchList> = cold("-a", {
        a: actions.youtubeSearchList.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initDependencies(locales, mariaClient, mongoClient),
        authorization: (): Observable<boolean> => of(true),
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: result })
      };
      const output$: Observable<
        | IActionAnswerInlineQuery
        | IActionCallbackQueryDataInsert
        | IActionEditMessageText
        | IActionSendMessage
        | IActionYoutubeSearchList
      > = epic.youtubeSearchListResult(action$, state$, dependencies);
      expectObservable(output$).toBe("---a", {
        a: actions.youtubeSearchList.error({
          error: new Error(locales.find("state$Undefined"))
        })
      });
    });
  });

  test("should handle error inline state$ValueInlineQueryQuery undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionYoutubeSearchList> = cold("-a", {
        a: actions.youtubeSearchList.query({ query })
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        state$ValueInlineQueryQueryUndefined
      );
      const dependencies: IDependencies = {
        ...initDependencies(locales, mariaClient, mongoClient),
        authorization: (): Observable<boolean> => of(true),
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: result })
      };
      const output$: Observable<
        | IActionAnswerInlineQuery
        | IActionCallbackQueryDataInsert
        | IActionEditMessageText
        | IActionSendMessage
        | IActionYoutubeSearchList
      > = epic.youtubeSearchListResult(action$, state$, dependencies);
      expectObservable(output$).toBe("---a", {
        a: actions.youtubeSearchList.error({
          error: new Error(locales.find("state$ValueInlineQueryQueryUndefined"))
        })
      });
    });
  });

  test("should handle error inline state$ValueYoutubeSearchListQuery undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionYoutubeSearchList> = cold("-a", {
        a: actions.youtubeSearchList.query({ query })
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        state$ValueYoutubeSearchListQueryUndefined
      );
      const dependencies: IDependencies = {
        ...initDependencies(locales, mariaClient, mongoClient),
        authorization: (): Observable<boolean> => of(true),
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: result })
      };
      const output$: Observable<
        | IActionAnswerInlineQuery
        | IActionCallbackQueryDataInsert
        | IActionEditMessageText
        | IActionSendMessage
        | IActionYoutubeSearchList
      > = epic.youtubeSearchListResult(action$, state$, dependencies);
      expectObservable(output$).toBe("---a", {
        a: actions.youtubeSearchList.error({
          error: new Error(
            locales.find("state$ValueYoutubeSearchListQueryUndefined")
          )
        })
      });
    });
  });

  test("should handle error inline state$ValueYoutubeSearchListQueryQ undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionYoutubeSearchList> = cold("-a", {
        a: actions.youtubeSearchList.query({ query })
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        state$ValueYoutubeSearchListQueryQUndefined
      );
      const dependencies: IDependencies = {
        ...initDependencies(locales, mariaClient, mongoClient),
        authorization: (): Observable<boolean> => of(true),
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: result })
      };
      const output$: Observable<
        | IActionAnswerInlineQuery
        | IActionCallbackQueryDataInsert
        | IActionEditMessageText
        | IActionSendMessage
        | IActionYoutubeSearchList
      > = epic.youtubeSearchListResult(action$, state$, dependencies);
      expectObservable(output$).toBe("---a", {
        a: actions.youtubeSearchList.error({
          error: new Error(
            locales.find("state$ValueYoutubeSearchListQueryQUndefined")
          )
        })
      });
    });
  });

  test("should handle result inline", (): void => {
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
        ...initDependencies(locales, mariaClient, mongoClient),
        authorization: (): Observable<boolean> => of(true),
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: result })
      };
      const output$: Observable<
        | IActionAnswerInlineQuery
        | IActionCallbackQueryDataInsert
        | IActionEditMessageText
        | IActionSendMessage
        | IActionYoutubeSearchList
      > = epic.youtubeSearchListResult(action$, state$, dependencies);
      expectObservable(output$).toBe("---a", {
        a: actions.answerInlineQuery.query({
          query: {
            inline_query_id: (state$Value.inlineQuery
              .query as IStateInlineQueryQuery).id,
            is_personal: true,
            results: transformSearchListInlineQueryResultArticle(
              result.items as youtube_v3.Schema$SearchResult[]
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

  test("should handle error message state$ValueMessageQuery undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionYoutubeSearchList> = cold("-a", {
        a: actions.youtubeSearchList.query({ query })
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        state$ValueMessageQueryUndefined
      );
      const dependencies: IDependencies = {
        ...initDependencies(locales, mariaClient, mongoClient),
        authorization: (): Observable<boolean> => of(true),
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: result })
      };
      const output$: Observable<
        | IActionAnswerInlineQuery
        | IActionCallbackQueryDataInsert
        | IActionEditMessageText
        | IActionSendMessage
        | IActionYoutubeSearchList
      > = epic.youtubeSearchListResult(action$, state$, dependencies);
      expectObservable(output$).toBe("---a", {
        a: actions.youtubeSearchList.error({
          error: new Error(locales.find("state$ValueMessageQueryUndefined"))
        })
      });
    });
  });

  test("should handle error message state$ValueMessageQueryMessage undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionYoutubeSearchList> = cold("-a", {
        a: actions.youtubeSearchList.query({ query })
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        state$ValueMessageQueryMessageUndefined
      );
      const dependencies: IDependencies = {
        ...initDependencies(locales, mariaClient, mongoClient),
        authorization: (): Observable<boolean> => of(true),
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: result })
      };
      const output$: Observable<
        | IActionAnswerInlineQuery
        | IActionCallbackQueryDataInsert
        | IActionEditMessageText
        | IActionSendMessage
        | IActionYoutubeSearchList
      > = epic.youtubeSearchListResult(action$, state$, dependencies);
      expectObservable(output$).toBe("---a", {
        a: actions.youtubeSearchList.error({
          error: new Error(
            locales.find("state$ValueMessageQueryMessageUndefined")
          )
        })
      });
    });
  });

  test("should handle error message state$ValueYoutubeSearchListQuery undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionYoutubeSearchList> = cold("-a", {
        a: actions.youtubeSearchList.query({ query })
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        state$ValueYoutubeSearchListQueryUndefined
      );
      const dependencies: IDependencies = {
        ...initDependencies(locales, mariaClient, mongoClient),
        authorization: (): Observable<boolean> => of(true),
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: result })
      };
      const output$: Observable<
        | IActionAnswerInlineQuery
        | IActionCallbackQueryDataInsert
        | IActionEditMessageText
        | IActionSendMessage
        | IActionYoutubeSearchList
      > = epic.youtubeSearchListResult(action$, state$, dependencies);
      expectObservable(output$).toBe("---a", {
        a: actions.youtubeSearchList.error({
          error: new Error(
            locales.find("state$ValueYoutubeSearchListQueryUndefined")
          )
        })
      });
    });
  });

  test("should handle error message state$ValueYoutubeSearchListQueryQ undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionYoutubeSearchList> = cold("-a", {
        a: actions.youtubeSearchList.query({ query })
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        state$ValueYoutubeSearchListQueryQUndefined
      );
      const dependencies: IDependencies = {
        ...initDependencies(locales, mariaClient, mongoClient),
        authorization: (): Observable<boolean> => of(true),
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: result })
      };
      const output$: Observable<
        | IActionAnswerInlineQuery
        | IActionCallbackQueryDataInsert
        | IActionEditMessageText
        | IActionSendMessage
        | IActionYoutubeSearchList
      > = epic.youtubeSearchListResult(action$, state$, dependencies);
      expectObservable(output$).toBe("---a", {
        a: actions.youtubeSearchList.error({
          error: new Error(
            locales.find("state$ValueYoutubeSearchListQueryQUndefined")
          )
        })
      });
    });
  });

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
        ...initDependencies(locales, mariaClient, mongoClient),
        ...initDependencies(locales, mariaClient, mongoClient),
        authorization: (): Observable<boolean> => of(true),
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: result })
      };
      const q = (state$Value.youtubeSearchList
        .query as IStateYoutubeSearchListQuery).q as string;
      const output$: Observable<
        | IActionAnswerInlineQuery
        | IActionCallbackQueryDataInsert
        | IActionEditMessageText
        | IActionSendMessage
        | IActionYoutubeSearchList
      > = epic.youtubeSearchListResult(action$, state$, dependencies);
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
              locales.find("messageNoResult"),
              locales.find("messageSeparator"),
              locales.fill("messageResultQ", { q })
            )
          }
        })
      });
    });
  });
});
