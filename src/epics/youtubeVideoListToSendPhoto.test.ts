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
import { RunHelpers } from "rxjs/internal/testing/TestScheduler";
import { TestScheduler } from "rxjs/testing";

import { IActionYoutubeVideoList } from "../../types/iActionYoutubeVideoList";
import { IDependencies } from "../../types/iDependencies";
import { ILocale } from "../../types/iLocale";
import { IState } from "../../types/iState";
import { IStateMessageQuery } from "../../types/iStateMessageQuery";
import { IStateYoutubeVideoListQuery } from "../../types/iStateYoutubeVideoListQuery";
import { IMessage } from "../../types/telegramBot/types/iMessage";
import * as actions from "../actions";
import * as env from "../configs/env";
import { init as initDependencies } from "../utils/dependencies";
import { initialState } from "../utils/store";
import {
  encode,
  locale,
  transformVideoCaption,
  transformVideoThumbnailUrl
} from "../utils/string";
import { transformObservable } from "./youtubeVideoListToSendPhoto";

describe("youtubeVideoList epic", (): void => {
  describe("youtubeVideoListToSendMessage", (): void => {
    const error: Error = new Error("");
    const query: IStateYoutubeVideoListQuery = {
      chart: "",
      key: ""
    };
    const state$Value: IState = {
      ...initialState,
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
      youtubeVideoList: {
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
    const state$ValueYoutubeVideoListQueryUndefined: IState = {
      ...state$Value,
      youtubeVideoList: {
        query: undefined
      }
    };
    const state$ValueYoutubeVideoListQueryChartUndefined: IState = {
      ...state$Value,
      youtubeVideoList: {
        ...state$Value.youtubeVideoList,
        query: {
          ...(state$Value.youtubeVideoList
            .query as IStateYoutubeVideoListQuery),
          chart: undefined
        }
      }
    };
    const actionYoutubeVideoListResult: youtube_v3.Schema$VideoListResponse = {
      items: [{}],
      nextPageToken: "",
      prevPageToken: ""
    };
    const actionYoutubeVideoListResultItemsUndefined: youtube_v3.Schema$VideoListResponse = {
      ...actionYoutubeVideoListResult,
      items: undefined
    };
    const actionYoutubeVideoListResultNextPageTokenUndefined: youtube_v3.Schema$VideoListResponse = {
      ...actionYoutubeVideoListResult,
      nextPageToken: undefined
    };
    const actionYoutubeVideoListResultPrevPageTokenUndefined: youtube_v3.Schema$VideoListResponse = {
      ...actionYoutubeVideoListResult,
      prevPageToken: undefined
    };

    let mariaClient: Connection;
    let mongoClient: MongoClient;
    let locales: ILocale;

    afterAll(
      async (): Promise<void> => {
        await mongoClient.close();
      }
    );

    beforeAll(
      async (): Promise<void> => {
        mariaClient = await createConnection(env.MARIA_CLIENT_URI);
        mongoClient = await MongoClient.connect(global.__MONGO_URI__, {
          useNewUrlParser: true,
          useUnifiedTopology: true
        });
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
        const action: IActionYoutubeVideoList = actions.youtubeVideoList.error({
          error
        });
        const state$: StateObservable<IState> | undefined = new StateObservable(
          new Subject(),
          state$Value
        );
        const dependencies: IDependencies = {
          ...initDependencies(locales, mariaClient, mongoClient),
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
        const action: IActionYoutubeVideoList = actions.youtubeVideoList.query({
          query
        });
        const state$: StateObservable<IState> | undefined = undefined;
        const dependencies: IDependencies = {
          ...initDependencies(locales, mariaClient, mongoClient),
          authorization: (): Observable<boolean> => of(true)
        };
        const action2 = actions.callbackQueryDataInsert.result({
          result: ""
        });
        expectObservable(
          transformObservable(action, state$, dependencies)(action2)
        ).toBe("(a|)", {
          a: actions.youtubeVideoList.error({
            error: new Error(locales.find("state$Undefined"))
          })
        });
      });
    });

    test("should handle error state$ValueMessageQuery undefined", (): void => {
      testScheduler.run((runHelpers: RunHelpers): void => {
        const { expectObservable } = runHelpers;
        const action: IActionYoutubeVideoList = actions.youtubeVideoList.query({
          query
        });
        const state$: StateObservable<IState> | undefined = new StateObservable(
          new Subject(),
          state$ValueMessageQueryUndefined
        );
        const dependencies: IDependencies = {
          ...initDependencies(locales, mariaClient, mongoClient),
          authorization: (): Observable<boolean> => of(true)
        };
        const action2 = actions.callbackQueryDataInsert.result({
          result: ""
        });
        expectObservable(
          transformObservable(action, state$, dependencies)(action2)
        ).toBe("(a|)", {
          a: actions.youtubeVideoList.error({
            error: new Error(locales.find("state$ValueMessageQueryUndefined"))
          })
        });
      });
    });

    test("should handle error state$ValueMessageQueryMessage undefined", (): void => {
      testScheduler.run((runHelpers: RunHelpers): void => {
        const { expectObservable } = runHelpers;
        const action: IActionYoutubeVideoList = actions.youtubeVideoList.query({
          query
        });
        const state$: StateObservable<IState> | undefined = new StateObservable(
          new Subject(),
          state$ValueMessageQueryMessageUndefined
        );
        const dependencies: IDependencies = {
          ...initDependencies(locales, mariaClient, mongoClient),
          authorization: (): Observable<boolean> => of(true)
        };
        const action2 = actions.callbackQueryDataInsert.result({
          result: ""
        });
        expectObservable(
          transformObservable(action, state$, dependencies)(action2)
        ).toBe("(a|)", {
          a: actions.youtubeVideoList.error({
            error: new Error(
              locales.find("state$ValueMessageQueryMessageUndefined")
            )
          })
        });
      });
    });

    test("should handle error state$ValueYoutubeVideoListQuery undefined", (): void => {
      testScheduler.run((runHelpers: RunHelpers): void => {
        const { expectObservable } = runHelpers;
        const action: IActionYoutubeVideoList = actions.youtubeVideoList.query({
          query
        });
        const state$: StateObservable<IState> | undefined = new StateObservable(
          new Subject(),
          state$ValueYoutubeVideoListQueryUndefined
        );
        const dependencies: IDependencies = {
          ...initDependencies(locales, mariaClient, mongoClient),
          authorization: (): Observable<boolean> => of(true)
        };
        const action2 = actions.callbackQueryDataInsert.result({
          result: ""
        });
        expectObservable(
          transformObservable(action, state$, dependencies)(action2)
        ).toBe("(a|)", {
          a: actions.youtubeVideoList.error({
            error: new Error(
              locales.find("state$ValueYoutubeVideoListQueryUndefined")
            )
          })
        });
      });
    });

    test("should handle error state$ValueYoutubeVideoListQueryChart undefined", (): void => {
      testScheduler.run((runHelpers: RunHelpers): void => {
        const { expectObservable } = runHelpers;
        const action: IActionYoutubeVideoList = actions.youtubeVideoList.query({
          query: undefined
        });
        const state$: StateObservable<IState> | undefined = new StateObservable(
          new Subject(),
          state$ValueYoutubeVideoListQueryChartUndefined
        );
        const dependencies: IDependencies = {
          ...initDependencies(locales, mariaClient, mongoClient),
          authorization: (): Observable<boolean> => of(true)
        };
        const action2 = actions.callbackQueryDataInsert.result({
          result: ""
        });
        expectObservable(
          transformObservable(action, state$, dependencies)(action2)
        ).toBe("(a|)", {
          a: actions.youtubeVideoList.error({
            error: new Error(
              locales.find("state$ValueYoutubeVideoListQueryChartUndefined")
            )
          })
        });
      });
    });

    test("should handle error actionYoutubeVideoListResult undefined", (): void => {
      testScheduler.run((runHelpers: RunHelpers): void => {
        const { expectObservable } = runHelpers;
        const action: IActionYoutubeVideoList = actions.youtubeVideoList.result(
          {
            result: undefined
          }
        );
        const state$: StateObservable<IState> | undefined = new StateObservable(
          new Subject(),
          state$Value
        );
        const dependencies: IDependencies = {
          ...initDependencies(locales, mariaClient, mongoClient),
          authorization: (): Observable<boolean> => of(true)
        };
        const action2 = actions.callbackQueryDataInsert.result({
          result: ""
        });
        expectObservable(
          transformObservable(action, state$, dependencies)(action2)
        ).toBe("(a|)", {
          a: actions.youtubeVideoList.error({
            error: new Error(
              locales.find("actionYoutubeVideoListResultUndefined")
            )
          })
        });
      });
    });

    test("should handle error actionYoutubeVideoListResultItems undefined", (): void => {
      testScheduler.run((runHelpers: RunHelpers): void => {
        const { expectObservable } = runHelpers;
        const action: IActionYoutubeVideoList = actions.youtubeVideoList.result(
          {
            result: actionYoutubeVideoListResultItemsUndefined
          }
        );
        const state$: StateObservable<IState> | undefined = new StateObservable(
          new Subject(),
          state$Value
        );
        const dependencies: IDependencies = {
          ...initDependencies(locales, mariaClient, mongoClient),
          authorization: (): Observable<boolean> => of(true)
        };
        const action2 = actions.callbackQueryDataInsert.result({
          result: ""
        });
        expectObservable(
          transformObservable(action, state$, dependencies)(action2)
        ).toBe("(a|)", {
          a: actions.youtubeVideoList.error({
            error: new Error(
              locales.find("actionYoutubeVideoListResultItemsUndefined")
            )
          })
        });
      });
    });

    test("should handle error action2CallbackQueryDataInsertResult undefined", (): void => {
      testScheduler.run((runHelpers: RunHelpers): void => {
        const { expectObservable } = runHelpers;
        const action: IActionYoutubeVideoList = actions.youtubeVideoList.result(
          {
            result: actionYoutubeVideoListResult
          }
        );
        const state$: StateObservable<IState> | undefined = new StateObservable(
          new Subject(),
          state$Value
        );
        const dependencies: IDependencies = {
          ...initDependencies(locales, mariaClient, mongoClient),
          authorization: (): Observable<boolean> => of(true)
        };
        const action2 = actions.callbackQueryDataInsert.result({
          result: undefined
        });
        expectObservable(
          transformObservable(action, state$, dependencies)(action2)
        ).toBe("(a|)", {
          a: actions.youtubeVideoList.error({
            error: new Error(
              locales.find("actionCallbackQueryDataInsertResultUndefined")
            )
          })
        });
      });
    });

    test("should handle result actionYoutubeVideoListResultPrevPageToken undefined", (): void => {
      testScheduler.run((runHelpers: RunHelpers): void => {
        const { expectObservable } = runHelpers;
        const action: IActionYoutubeVideoList = actions.youtubeVideoList.result(
          {
            result: actionYoutubeVideoListResultPrevPageTokenUndefined
          }
        );
        const state$: StateObservable<IState> | undefined = new StateObservable(
          new Subject(),
          state$Value
        );
        const dependencies: IDependencies = {
          ...initDependencies(locales, mariaClient, mongoClient),
          authorization: (): Observable<boolean> => of(true)
        };
        const action2 = actions.callbackQueryDataInsert.result({
          result: ""
        });
        expectObservable(
          transformObservable(action, state$, dependencies)(action2)
        ).toBe("(a|)", {
          a: actions.sendPhoto.query({
            query: {
              caption: transformVideoCaption(
                ((action.youtubeVideoList
                  .result as youtube_v3.Schema$VideoListResponse)
                  .items as youtube_v3.Schema$Video[])[0]
              ),
              chat_id: ((state$.value.message.query as IStateMessageQuery)
                .message as IMessage).chat.id,
              disable_notification: true,
              parse_mode: "HTML",
              photo: transformVideoThumbnailUrl(
                ((action.youtubeVideoList
                  .result as youtube_v3.Schema$VideoListResponse)
                  .items as youtube_v3.Schema$Video[])[0]
              ),
              reply_markup: {
                inline_keyboard: [
                  [
                    {
                      callback_data: encode(
                        {
                          id: action2.callbackQueryDataInsert.result as string,
                          pageToken: (action.youtubeVideoList
                            .result as youtube_v3.Schema$VideoListResponse)
                            .nextPageToken as string
                        },
                        "iStateCallbackQueryDataFindQuery"
                      ),
                      text: locales.find("messageWithPaginationNext")
                    }
                  ]
                ]
              },
              reply_to_message_id: ((state$.value.message
                .query as IStateMessageQuery).message as IMessage).message_id
            }
          })
        });
      });
    });

    test("should handle result actionYoutubeVideoListResultNextPageToken undefined", (): void => {
      testScheduler.run((runHelpers: RunHelpers): void => {
        const { expectObservable } = runHelpers;
        const action: IActionYoutubeVideoList = actions.youtubeVideoList.result(
          {
            result: actionYoutubeVideoListResultNextPageTokenUndefined
          }
        );
        const state$: StateObservable<IState> | undefined = new StateObservable(
          new Subject(),
          state$Value
        );
        const dependencies: IDependencies = {
          ...initDependencies(locales, mariaClient, mongoClient),
          authorization: (): Observable<boolean> => of(true)
        };
        const action2 = actions.callbackQueryDataInsert.result({
          result: ""
        });
        expectObservable(
          transformObservable(action, state$, dependencies)(action2)
        ).toBe("(a|)", {
          a: actions.sendPhoto.query({
            query: {
              caption: transformVideoCaption(
                ((action.youtubeVideoList
                  .result as youtube_v3.Schema$VideoListResponse)
                  .items as youtube_v3.Schema$Video[])[0]
              ),
              chat_id: ((state$.value.message.query as IStateMessageQuery)
                .message as IMessage).chat.id,
              disable_notification: true,
              parse_mode: "HTML",
              photo: transformVideoThumbnailUrl(
                ((action.youtubeVideoList
                  .result as youtube_v3.Schema$VideoListResponse)
                  .items as youtube_v3.Schema$Video[])[0]
              ),
              reply_markup: {
                inline_keyboard: [
                  [
                    {
                      callback_data: encode(
                        {
                          id: action2.callbackQueryDataInsert.result as string,
                          pageToken: (action.youtubeVideoList
                            .result as youtube_v3.Schema$VideoListResponse)
                            .prevPageToken as string
                        },
                        "iStateCallbackQueryDataFindQuery"
                      ),
                      text: locales.find("messageWithPaginationPrev")
                    }
                  ]
                ]
              },
              reply_to_message_id: ((state$.value.message
                .query as IStateMessageQuery).message as IMessage).message_id
            }
          })
        });
      });
    });

    test("should handle result", (): void => {
      testScheduler.run((runHelpers: RunHelpers): void => {
        const { expectObservable } = runHelpers;
        const action: IActionYoutubeVideoList = actions.youtubeVideoList.result(
          {
            result: actionYoutubeVideoListResult
          }
        );
        const state$: StateObservable<IState> | undefined = new StateObservable(
          new Subject(),
          state$Value
        );
        const dependencies: IDependencies = {
          ...initDependencies(locales, mariaClient, mongoClient),
          authorization: (): Observable<boolean> => of(true)
        };
        const action2 = actions.callbackQueryDataInsert.result({
          result: ""
        });
        expectObservable(
          transformObservable(action, state$, dependencies)(action2)
        ).toBe("(a|)", {
          a: actions.sendPhoto.query({
            query: {
              caption: transformVideoCaption(
                ((action.youtubeVideoList
                  .result as youtube_v3.Schema$VideoListResponse)
                  .items as youtube_v3.Schema$Video[])[0]
              ),
              chat_id: ((state$.value.message.query as IStateMessageQuery)
                .message as IMessage).chat.id,
              disable_notification: true,
              parse_mode: "HTML",
              photo: transformVideoThumbnailUrl(
                ((action.youtubeVideoList
                  .result as youtube_v3.Schema$VideoListResponse)
                  .items as youtube_v3.Schema$Video[])[0]
              ),
              reply_markup: {
                inline_keyboard: [
                  [
                    {
                      callback_data: encode(
                        {
                          id: action2.callbackQueryDataInsert.result as string,
                          pageToken: (action.youtubeVideoList
                            .result as youtube_v3.Schema$VideoListResponse)
                            .prevPageToken as string
                        },
                        "iStateCallbackQueryDataFindQuery"
                      ),
                      text: locales.find("messageWithPaginationPrev")
                    },
                    {
                      callback_data: encode(
                        {
                          id: action2.callbackQueryDataInsert.result as string,
                          pageToken: (action.youtubeVideoList
                            .result as youtube_v3.Schema$VideoListResponse)
                            .nextPageToken as string
                        },
                        "iStateCallbackQueryDataFindQuery"
                      ),
                      text: locales.find("messageWithPaginationNext")
                    }
                  ]
                ]
              },
              reply_to_message_id: ((state$.value.message
                .query as IStateMessageQuery).message as IMessage).message_id
            }
          })
        });
      });
    });
  });
});
