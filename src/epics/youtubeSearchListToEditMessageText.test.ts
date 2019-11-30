import { youtube_v3 } from "googleapis";
import { StateObservable } from "redux-observable";
import { Subject } from "rxjs";
import { RunHelpers } from "rxjs/internal/testing/TestScheduler";
import { TestScheduler } from "rxjs/testing";

import { IActionYoutubeSearchList } from "../../types/iActionYoutubeSearchList";
import { IState } from "../../types/iState";
import { IStateMessageQuery } from "../../types/iStateMessageQuery";
import { IStateYoutubeSearchListQuery } from "../../types/iStateYoutubeSearchListQuery";
import { ICallbackQuery } from "../../types/telegramBot/types/iCallbackQuery";
import * as actions from "../actions";
import * as texts from "../configs/texts";
import { stringify } from "../utils/queryString";
import { initialState } from "../utils/store";
import { transformSearchResults } from "../utils/string";
import { transformObservable } from "./youtubeSearchListToEditMessageText";
import { IMessage } from "../../types/telegramBot/types/iMessage";

describe("youtubeSearchList epic", (): void => {
  describe("youtubeSearchListToEditMessageText", (): void => {
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
              message_id: 0
            }
          },
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
    const state$ValueMessageQueryCallbackQueryUndefined: IState = {
      ...state$Value,
      message: {
        ...state$Value.message,
        query: {
          ...(state$Value.message.query as IStateMessageQuery),
          callback_query: undefined
        }
      }
    };
    const state$ValueMessageQueryCallbackQueryMessageUndefined: IState = {
      ...state$Value,
      message: {
        ...state$Value.message,
        query: {
          ...(state$Value.message.query as IStateMessageQuery),
          callback_query: {
            ...((state$Value.message.query as IStateMessageQuery)
              .callback_query as ICallbackQuery),
            message: undefined
          }
        }
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
        const action2 = actions.callbackQueryDataInsert.result({ result: "" });
        expectObservable(
          transformObservable(state$)(action)(action2)
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
        const action2 = actions.callbackQueryDataInsert.result({ result: "" });
        expectObservable(transformObservable(state$)(action)(action2)).toBe(
          "(a|)",
          {
            a: actions.youtubeSearchList.error({
              error: new Error(texts.state$Undefined)
            })
          }
        );
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
        const action2 = actions.callbackQueryDataInsert.result({ result: "" });
        expectObservable(transformObservable(state$)(action)(action2)).toBe(
          "(a|)",
          {
            a: actions.youtubeSearchList.error({
              error: new Error(texts.state$ValueMessageQueryUndefined)
            })
          }
        );
      });
    });

    test("should handle error state$ValueMessageQueryCallbackQuery undefined", (): void => {
      testScheduler.run((runHelpers: RunHelpers): void => {
        const { expectObservable } = runHelpers;
        const action: IActionYoutubeSearchList = actions.youtubeSearchList.query(
          {
            query
          }
        );
        const state$: StateObservable<IState> | undefined = new StateObservable(
          new Subject(),
          state$ValueMessageQueryCallbackQueryUndefined
        );
        const action2 = actions.callbackQueryDataInsert.result({ result: "" });
        expectObservable(transformObservable(state$)(action)(action2)).toBe(
          "(a|)",
          {
            a: actions.youtubeSearchList.error({
              error: new Error(
                texts.state$ValueMessageQueryCallbackQueryUndefined
              )
            })
          }
        );
      });
    });

    test("should handle error state$ValueMessageQueryCallbackQueryMessage undefined", (): void => {
      testScheduler.run((runHelpers: RunHelpers): void => {
        const { expectObservable } = runHelpers;
        const action: IActionYoutubeSearchList = actions.youtubeSearchList.query(
          {
            query
          }
        );
        const state$: StateObservable<IState> | undefined = new StateObservable(
          new Subject(),
          state$ValueMessageQueryCallbackQueryMessageUndefined
        );
        const action2 = actions.callbackQueryDataInsert.result({ result: "" });
        expectObservable(transformObservable(state$)(action)(action2)).toBe(
          "(a|)",
          {
            a: actions.youtubeSearchList.error({
              error: new Error(
                texts.state$ValueMessageQueryCallbackQueryMessageUndefined
              )
            })
          }
        );
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
        const action2 = actions.callbackQueryDataInsert.result({ result: "" });
        expectObservable(transformObservable(state$)(action)(action2)).toBe(
          "(a|)",
          {
            a: actions.youtubeSearchList.error({
              error: new Error(texts.state$ValueYoutubeSearchListQueryUndefined)
            })
          }
        );
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
        const action2 = actions.callbackQueryDataInsert.result({ result: "" });
        expectObservable(transformObservable(state$)(action)(action2)).toBe(
          "(a|)",
          {
            a: actions.youtubeSearchList.error({
              error: new Error(texts.actionYoutubeSearchListResultUndefined)
            })
          }
        );
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
        const action2 = actions.callbackQueryDataInsert.result({ result: "" });
        expectObservable(transformObservable(state$)(action)(action2)).toBe(
          "(a|)",
          {
            a: actions.youtubeSearchList.error({
              error: new Error(
                texts.actionYoutubeSearchListResultItemsUndefined
              )
            })
          }
        );
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
        const action2 = actions.callbackQueryDataInsert.result({
          result: undefined
        });
        expectObservable(transformObservable(state$)(action)(action2)).toBe(
          "(a|)",
          {
            a: actions.youtubeSearchList.error({
              error: new Error(
                texts.actionCallbackQueryDataInsertResultUndefined
              )
            })
          }
        );
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
        const action2 = actions.callbackQueryDataInsert.result({ result: "" });
        expectObservable(transformObservable(state$)(action)(action2)).toBe(
          "(a|)",
          {
            a: actions.youtubeSearchList.error({
              error: new Error(
                texts.state$ValueYoutubeSearchListQueryQRelatedToVideoIdUndefined
              )
            })
          }
        );
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
        const action2 = actions.callbackQueryDataInsert.result({ result: "" });
        expectObservable(transformObservable(state$)(action)(action2)).toBe(
          "(a|)",
          {
            a: actions.editMessageText.query({
              query: {
                chat_id: (((state$.value.message.query as IStateMessageQuery)
                  .callback_query as ICallbackQuery).message as IMessage).chat
                  .id,
                disable_web_page_preview: true,
                message_id: (((state$.value.message.query as IStateMessageQuery)
                  .callback_query as ICallbackQuery).message as IMessage)
                  .message_id,
                parse_mode: "HTML",
                reply_markup: {
                  inline_keyboard: [
                    [
                      {
                        callback_data: stringify({
                          id: action2.callbackQueryDataInsert.result as string,
                          pageToken: (action.youtubeSearchList
                            .result as youtube_v3.Schema$SearchListResponse)
                            .nextPageToken as string
                        }),
                        text: texts.messageWithPaginationNext
                      }
                    ]
                  ]
                },
                text: transformSearchResults(
                  (action.youtubeSearchList
                    .result as youtube_v3.Schema$SearchListResponse)
                    .items as youtube_v3.Schema$SearchResult[],
                  (state$.value.youtubeSearchList
                    .query as IStateYoutubeSearchListQuery).q,
                  (state$.value.youtubeSearchList
                    .query as IStateYoutubeSearchListQuery).relatedToVideoId
                )
              }
            })
          }
        );
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
        const action2 = actions.callbackQueryDataInsert.result({ result: "" });
        expectObservable(transformObservable(state$)(action)(action2)).toBe(
          "(a|)",
          {
            a: actions.editMessageText.query({
              query: {
                chat_id: (((state$.value.message.query as IStateMessageQuery)
                  .callback_query as ICallbackQuery).message as IMessage).chat
                  .id,
                disable_web_page_preview: true,
                message_id: (((state$.value.message.query as IStateMessageQuery)
                  .callback_query as ICallbackQuery).message as IMessage)
                  .message_id,
                parse_mode: "HTML",
                reply_markup: {
                  inline_keyboard: [
                    [
                      {
                        callback_data: stringify({
                          id: action2.callbackQueryDataInsert.result as string,
                          pageToken: (action.youtubeSearchList
                            .result as youtube_v3.Schema$SearchListResponse)
                            .prevPageToken as string
                        }),
                        text: texts.messageWithPaginationPrev
                      }
                    ]
                  ]
                },
                text: transformSearchResults(
                  (action.youtubeSearchList
                    .result as youtube_v3.Schema$SearchListResponse)
                    .items as youtube_v3.Schema$SearchResult[],
                  (state$.value.youtubeSearchList
                    .query as IStateYoutubeSearchListQuery).q,
                  (state$.value.youtubeSearchList
                    .query as IStateYoutubeSearchListQuery).relatedToVideoId
                )
              }
            })
          }
        );
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
        const action2 = actions.callbackQueryDataInsert.result({ result: "" });
        expectObservable(transformObservable(state$)(action)(action2)).toBe(
          "(a|)",
          {
            a: actions.editMessageText.query({
              query: {
                chat_id: (((state$.value.message.query as IStateMessageQuery)
                  .callback_query as ICallbackQuery).message as IMessage).chat
                  .id,
                disable_web_page_preview: true,
                message_id: (((state$.value.message.query as IStateMessageQuery)
                  .callback_query as ICallbackQuery).message as IMessage)
                  .message_id,
                parse_mode: "HTML",
                reply_markup: {
                  inline_keyboard: [
                    [
                      {
                        callback_data: stringify({
                          id: action2.callbackQueryDataInsert.result as string,
                          pageToken: (action.youtubeSearchList
                            .result as youtube_v3.Schema$SearchListResponse)
                            .prevPageToken as string
                        }),
                        text: texts.messageWithPaginationPrev
                      },
                      {
                        callback_data: stringify({
                          id: action2.callbackQueryDataInsert.result as string,
                          pageToken: (action.youtubeSearchList
                            .result as youtube_v3.Schema$SearchListResponse)
                            .nextPageToken as string
                        }),
                        text: texts.messageWithPaginationNext
                      }
                    ]
                  ]
                },
                text: transformSearchResults(
                  (action.youtubeSearchList
                    .result as youtube_v3.Schema$SearchListResponse)
                    .items as youtube_v3.Schema$SearchResult[],
                  (state$.value.youtubeSearchList
                    .query as IStateYoutubeSearchListQuery).q,
                  (state$.value.youtubeSearchList
                    .query as IStateYoutubeSearchListQuery).relatedToVideoId
                )
              }
            })
          }
        );
      });
    });
  });
});
