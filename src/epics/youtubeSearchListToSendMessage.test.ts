import { youtube_v3 } from "googleapis";
import { StateObservable } from "redux-observable";
import { Subject } from "rxjs";
import { RunHelpers } from "rxjs/internal/testing/TestScheduler";
import { TestScheduler } from "rxjs/testing";

import { IActionYoutubeSearchList } from "../../types/iActionYoutubeSearchList";
import { IDependencies } from "../../types/iDependencies";
import { ILocale } from "../../types/iLocale";
import { IState } from "../../types/iState";
import { IStateMessageQuery } from "../../types/iStateMessageQuery";
import { IStateYoutubeSearchListQuery } from "../../types/iStateYoutubeSearchListQuery";
import { IMessage } from "../../types/telegramBot/types/iMessage";
import * as actions from "../actions";
import { init as initDependencies } from "../utils/dependencies";
import { initialState } from "../utils/store";
import { encode, locale, transformSearchResults } from "../utils/string";
import { transformObservable } from "./youtubeSearchListToSendMessage";

describe("youtubeSearchList epic", (): void => {
  describe("youtubeSearchListToSendMessage", (): void => {
    const locales: ILocale = locale("en");
    const error: Error = new Error("");
    const query: IStateYoutubeSearchListQuery = {
      key: "",
      q: "",
      relatedToVideoId: undefined
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
    const state$ValueYoutubeSearchListQueryUndefined: IState = {
      ...state$Value,
      youtubeSearchList: {
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
      nextPageToken: "",
      prevPageToken: ""
    };
    const actionYoutubeSearchListResultItemsUndefined: youtube_v3.Schema$SearchListResponse = {
      ...actionYoutubeSearchListResult,
      items: undefined
    };
    const actionYoutubeSearchListResultNextPageTokenUndefined: youtube_v3.Schema$SearchListResponse = {
      ...actionYoutubeSearchListResult,
      nextPageToken: undefined
    };
    const actionYoutubeSearchListResultPrevPageTokenUndefined: youtube_v3.Schema$SearchListResponse = {
      ...actionYoutubeSearchListResult,
      prevPageToken: undefined
    };

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
          ...initDependencies(locales).initDependencies
        };
        const action2 = actions.callbackQueryDataInsert.result({ result: "" });
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
          ...initDependencies(locales).initDependencies
        };
        const action2 = actions.callbackQueryDataInsert.result({ result: "" });
        expectObservable(
          transformObservable(action, state$, dependencies)(action2)
        ).toBe("(a|)", {
          a: actions.youtubeSearchList.error({
            error: new Error(locales.find("state$Undefined"))
          })
        });
      });
    });

    test("should handle error state$ValueMessageQuery undefined", (): void => {
      testScheduler.run((runHelpers: RunHelpers): void => {
        const { expectObservable } = runHelpers;
        const action: IActionYoutubeSearchList = actions.youtubeSearchList.query(
          {
            query
          }
        );
        const state$: StateObservable<IState> | undefined = new StateObservable(
          new Subject(),
          state$ValueMessageQueryUndefined
        );
        const dependencies: IDependencies = {
          ...initDependencies(locales).initDependencies
        };
        const action2 = actions.callbackQueryDataInsert.result({ result: "" });
        expectObservable(
          transformObservable(action, state$, dependencies)(action2)
        ).toBe("(a|)", {
          a: actions.youtubeSearchList.error({
            error: new Error(locales.find("state$ValueMessageQueryUndefined"))
          })
        });
      });
    });

    test("should handle error state$ValueMessageQueryMessage undefined", (): void => {
      testScheduler.run((runHelpers: RunHelpers): void => {
        const { expectObservable } = runHelpers;
        const action: IActionYoutubeSearchList = actions.youtubeSearchList.query(
          {
            query
          }
        );
        const state$: StateObservable<IState> | undefined = new StateObservable(
          new Subject(),
          state$ValueMessageQueryMessageUndefined
        );
        const dependencies: IDependencies = {
          ...initDependencies(locales).initDependencies
        };
        const action2 = actions.callbackQueryDataInsert.result({ result: "" });
        expectObservable(
          transformObservable(action, state$, dependencies)(action2)
        ).toBe("(a|)", {
          a: actions.youtubeSearchList.error({
            error: new Error(
              locales.find("state$ValueMessageQueryMessageUndefined")
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
            query
          }
        );
        const state$: StateObservable<IState> | undefined = new StateObservable(
          new Subject(),
          state$ValueYoutubeSearchListQueryUndefined
        );
        const dependencies: IDependencies = {
          ...initDependencies(locales).initDependencies
        };
        const action2 = actions.callbackQueryDataInsert.result({ result: "" });
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
          ...initDependencies(locales).initDependencies
        };
        const action2 = actions.callbackQueryDataInsert.result({ result: "" });
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
          ...initDependencies(locales).initDependencies
        };
        const action2 = actions.callbackQueryDataInsert.result({ result: "" });
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
          ...initDependencies(locales).initDependencies
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
          ...initDependencies(locales).initDependencies
        };
        const action2 = actions.callbackQueryDataInsert.result({ result: "" });
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

    test("should handle result actionYoutubeSearchListResultPrevPageToken undefined", (): void => {
      testScheduler.run((runHelpers: RunHelpers): void => {
        const { expectObservable } = runHelpers;
        const action: IActionYoutubeSearchList = actions.youtubeSearchList.result(
          {
            result: actionYoutubeSearchListResultPrevPageTokenUndefined
          }
        );
        const state$: StateObservable<IState> | undefined = new StateObservable(
          new Subject(),
          state$Value
        );
        const dependencies: IDependencies = {
          ...initDependencies(locales).initDependencies
        };
        const action2 = actions.callbackQueryDataInsert.result({ result: "" });
        const q = (state$.value.youtubeSearchList
          .query as IStateYoutubeSearchListQuery).q;
        const relatedToVideoId = (state$.value.youtubeSearchList
          .query as IStateYoutubeSearchListQuery).relatedToVideoId;
        expectObservable(
          transformObservable(action, state$, dependencies)(action2)
        ).toBe("(a|)", {
          a: actions.sendMessage.query({
            query: {
              chat_id: ((state$.value.message.query as IStateMessageQuery)
                .message as IMessage).chat.id,
              disable_notification: true,
              disable_web_page_preview: true,
              parse_mode: "HTML",
              reply_markup: {
                inline_keyboard: [
                  [
                    {
                      callback_data: encode(
                        {
                          id: action2.callbackQueryDataInsert.result as string,
                          pageToken: (action.youtubeSearchList
                            .result as youtube_v3.Schema$SearchListResponse)
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
                .query as IStateMessageQuery).message as IMessage).message_id,
              text: transformSearchResults(
                (action.youtubeSearchList
                  .result as youtube_v3.Schema$SearchListResponse)
                  .items as youtube_v3.Schema$SearchResult[],
                locales.find("messageNoResult"),
                locales.find("messageSeparator"),
                q !== undefined
                  ? locales.fill("messageResultQ", { q })
                  : relatedToVideoId !== undefined
                  ? locales.fill("messageResultRelatedToVideoId", {
                      relatedToVideoId
                    })
                  : ""
              )
            }
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
          ...initDependencies(locales).initDependencies
        };
        const action2 = actions.callbackQueryDataInsert.result({ result: "" });
        const q = (state$.value.youtubeSearchList
          .query as IStateYoutubeSearchListQuery).q;
        const relatedToVideoId = (state$.value.youtubeSearchList
          .query as IStateYoutubeSearchListQuery).relatedToVideoId;
        expectObservable(
          transformObservable(action, state$, dependencies)(action2)
        ).toBe("(a|)", {
          a: actions.sendMessage.query({
            query: {
              chat_id: ((state$.value.message.query as IStateMessageQuery)
                .message as IMessage).chat.id,
              disable_notification: true,
              disable_web_page_preview: true,
              parse_mode: "HTML",
              reply_markup: {
                inline_keyboard: [
                  [
                    {
                      callback_data: encode(
                        {
                          id: action2.callbackQueryDataInsert.result as string,
                          pageToken: (action.youtubeSearchList
                            .result as youtube_v3.Schema$SearchListResponse)
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
                .query as IStateMessageQuery).message as IMessage).message_id,
              text: transformSearchResults(
                (action.youtubeSearchList
                  .result as youtube_v3.Schema$SearchListResponse)
                  .items as youtube_v3.Schema$SearchResult[],
                locales.find("messageNoResult"),
                locales.find("messageSeparator"),
                q !== undefined
                  ? locales.fill("messageResultQ", { q })
                  : relatedToVideoId !== undefined
                  ? locales.fill("messageResultRelatedToVideoId", {
                      relatedToVideoId
                    })
                  : ""
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
          ...initDependencies(locales).initDependencies
        };
        const action2 = actions.callbackQueryDataInsert.result({ result: "" });
        const q = (state$.value.youtubeSearchList
          .query as IStateYoutubeSearchListQuery).q;
        const relatedToVideoId = (state$.value.youtubeSearchList
          .query as IStateYoutubeSearchListQuery).relatedToVideoId;
        expectObservable(
          transformObservable(action, state$, dependencies)(action2)
        ).toBe("(a|)", {
          a: actions.sendMessage.query({
            query: {
              chat_id: ((state$.value.message.query as IStateMessageQuery)
                .message as IMessage).chat.id,
              disable_notification: true,
              disable_web_page_preview: true,
              parse_mode: "HTML",
              reply_markup: {
                inline_keyboard: [
                  [
                    {
                      callback_data: encode(
                        {
                          id: action2.callbackQueryDataInsert.result as string,
                          pageToken: (action.youtubeSearchList
                            .result as youtube_v3.Schema$SearchListResponse)
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
                          pageToken: (action.youtubeSearchList
                            .result as youtube_v3.Schema$SearchListResponse)
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
                .query as IStateMessageQuery).message as IMessage).message_id,
              text: transformSearchResults(
                (action.youtubeSearchList
                  .result as youtube_v3.Schema$SearchListResponse)
                  .items as youtube_v3.Schema$SearchResult[],
                locales.find("messageNoResult"),
                locales.find("messageSeparator"),
                q !== undefined
                  ? locales.fill("messageResultQ", { q })
                  : relatedToVideoId !== undefined
                  ? locales.fill("messageResultRelatedToVideoId", {
                      relatedToVideoId
                    })
                  : ""
              )
            }
          })
        });
      });
    });
  });
});
