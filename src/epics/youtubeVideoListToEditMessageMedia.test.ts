import { youtube_v3 } from "googleapis";
import { StateObservable } from "redux-observable";
import { Subject } from "rxjs";
import { RunHelpers } from "rxjs/internal/testing/TestScheduler";
import { TestScheduler } from "rxjs/testing";
import { IActionYoutubeVideoList } from "../../types/iActionYoutubeVideoList";
import { IState } from "../../types/iState";
import { IStateMessageQuery } from "../../types/iStateMessageQuery";
import { IStateYoutubeVideoListQuery } from "../../types/iStateYoutubeVideoListQuery";
import { ICallbackQuery } from "../../types/telegramBot/types/iCallbackQuery";
import * as actions from "../actions";
import * as texts from "../configs/texts";
import { encode } from "../utils/string";
import { initialState } from "../utils/store";
import {
  transformVideoCaption,
  transformVideoThumbnailUrl
} from "../utils/string";
import { transformObservable } from "./youtubeVideoListToEditMessageMedia";
import { IMessage } from "../../types/telegramBot/types/iMessage";

describe("youtubeVideoList epic", (): void => {
  describe("youtubeVideoListToEditMessageMedia", (): void => {
    const error: Error = new Error("");
    const query: IStateYoutubeVideoListQuery = {
      chart: "",
      key: ""
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
    const state$ValueYoutubeVideoListQueryUndefined: IState = {
      ...state$Value,
      youtubeVideoList: {
        ...state$Value.youtubeVideoList,
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
        const action2 = actions.callbackQueryDataInsert.result({ result: "" });
        expectObservable(transformObservable(state$)(action)(action2)).toBe(
          "(a|)",
          {
            a: action
          }
        );
      });
    });

    test("should handle error state$ undefined", (): void => {
      testScheduler.run((runHelpers: RunHelpers): void => {
        const { expectObservable } = runHelpers;
        const action: IActionYoutubeVideoList = actions.youtubeVideoList.query({
          query
        });
        const state$: StateObservable<IState> | undefined = undefined;
        const action2 = actions.callbackQueryDataInsert.result({ result: "" });
        expectObservable(transformObservable(state$)(action)(action2)).toBe(
          "(a|)",
          {
            a: actions.youtubeVideoList.error({
              error: new Error(texts.state$Undefined)
            })
          }
        );
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
        const action2 = actions.callbackQueryDataInsert.result({ result: "" });
        expectObservable(transformObservable(state$)(action)(action2)).toBe(
          "(a|)",
          {
            a: actions.youtubeVideoList.error({
              error: new Error(texts.state$ValueMessageQueryUndefined)
            })
          }
        );
      });
    });

    test("should handle error state$ValueMessageQueryCallbackQuery undefined", (): void => {
      testScheduler.run((runHelpers: RunHelpers): void => {
        const { expectObservable } = runHelpers;
        const action: IActionYoutubeVideoList = actions.youtubeVideoList.query({
          query
        });
        const state$: StateObservable<IState> | undefined = new StateObservable(
          new Subject(),
          state$ValueMessageQueryCallbackQueryUndefined
        );
        const action2 = actions.callbackQueryDataInsert.result({ result: "" });
        expectObservable(transformObservable(state$)(action)(action2)).toBe(
          "(a|)",
          {
            a: actions.youtubeVideoList.error({
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
        const action: IActionYoutubeVideoList = actions.youtubeVideoList.query({
          query
        });
        const state$: StateObservable<IState> | undefined = new StateObservable(
          new Subject(),
          state$ValueMessageQueryCallbackQueryMessageUndefined
        );
        const action2 = actions.callbackQueryDataInsert.result({ result: "" });
        expectObservable(transformObservable(state$)(action)(action2)).toBe(
          "(a|)",
          {
            a: actions.youtubeVideoList.error({
              error: new Error(
                texts.state$ValueMessageQueryCallbackQueryMessageUndefined
              )
            })
          }
        );
      });
    });

    test("should handle error state$ValueYoutubeVideoListQuery undefined", (): void => {
      testScheduler.run((runHelpers: RunHelpers): void => {
        const { expectObservable } = runHelpers;
        const action: IActionYoutubeVideoList = actions.youtubeVideoList.query({
          query: undefined
        });
        const state$: StateObservable<IState> | undefined = new StateObservable(
          new Subject(),
          state$ValueYoutubeVideoListQueryUndefined
        );
        const action2 = actions.callbackQueryDataInsert.result({ result: "" });
        expectObservable(transformObservable(state$)(action)(action2)).toBe(
          "(a|)",
          {
            a: actions.youtubeVideoList.error({
              error: new Error(texts.state$ValueYoutubeVideoListQueryUndefined)
            })
          }
        );
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
        const action2 = actions.callbackQueryDataInsert.result({ result: "" });
        expectObservable(transformObservable(state$)(action)(action2)).toBe(
          "(a|)",
          {
            a: actions.youtubeVideoList.error({
              error: new Error(
                texts.state$ValueYoutubeVideoListQueryChartUndefined
              )
            })
          }
        );
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
        const action2 = actions.callbackQueryDataInsert.result({ result: "" });
        expectObservable(transformObservable(state$)(action)(action2)).toBe(
          "(a|)",
          {
            a: actions.youtubeVideoList.error({
              error: new Error(texts.actionYoutubeVideoListResultUndefined)
            })
          }
        );
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
        const action2 = actions.callbackQueryDataInsert.result({ result: "" });
        expectObservable(transformObservable(state$)(action)(action2)).toBe(
          "(a|)",
          {
            a: actions.youtubeVideoList.error({
              error: new Error(texts.actionYoutubeVideoListResultItemsUndefined)
            })
          }
        );
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
        const action2 = actions.callbackQueryDataInsert.result({
          result: undefined
        });
        expectObservable(transformObservable(state$)(action)(action2)).toBe(
          "(a|)",
          {
            a: actions.youtubeVideoList.error({
              error: new Error(
                texts.actionCallbackQueryDataInsertResultUndefined
              )
            })
          }
        );
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
        const action2 = actions.callbackQueryDataInsert.result({ result: "" });
        expectObservable(transformObservable(state$)(action)(action2)).toBe(
          "(a|)",
          {
            a: actions.editMessageMedia.query({
              query: {
                chat_id: (((state$.value.message.query as IStateMessageQuery)
                  .callback_query as ICallbackQuery).message as IMessage).chat
                  .id,
                message_id: (((state$.value.message.query as IStateMessageQuery)
                  .callback_query as ICallbackQuery).message as IMessage)
                  .message_id,
                media: {
                  caption: transformVideoCaption(
                    ((action.youtubeVideoList
                      .result as youtube_v3.Schema$VideoListResponse)
                      .items as youtube_v3.Schema$Video[])[0]
                  ),
                  media: transformVideoThumbnailUrl(
                    ((action.youtubeVideoList
                      .result as youtube_v3.Schema$VideoListResponse)
                      .items as youtube_v3.Schema$Video[])[0]
                  ),
                  parse_mode: "HTML",
                  type: "photo"
                },
                reply_markup: {
                  inline_keyboard: [
                    [
                      {
                        callback_data: encode(
                          {
                            id: action2.callbackQueryDataInsert
                              .result as string,
                            pageToken: (action.youtubeVideoList
                              .result as youtube_v3.Schema$VideoListResponse)
                              .nextPageToken as string
                          },
                          "iStateCallbackQueryDataFindQuery"
                        ),
                        text: texts.messageWithPaginationNext
                      }
                    ]
                  ]
                }
              }
            })
          }
        );
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
        const action2 = actions.callbackQueryDataInsert.result({ result: "" });
        expectObservable(transformObservable(state$)(action)(action2)).toBe(
          "(a|)",
          {
            a: actions.editMessageMedia.query({
              query: {
                chat_id: (((state$.value.message.query as IStateMessageQuery)
                  .callback_query as ICallbackQuery).message as IMessage).chat
                  .id,
                message_id: (((state$.value.message.query as IStateMessageQuery)
                  .callback_query as ICallbackQuery).message as IMessage)
                  .message_id,
                media: {
                  caption: transformVideoCaption(
                    ((action.youtubeVideoList
                      .result as youtube_v3.Schema$VideoListResponse)
                      .items as youtube_v3.Schema$Video[])[0]
                  ),
                  media: transformVideoThumbnailUrl(
                    ((action.youtubeVideoList
                      .result as youtube_v3.Schema$VideoListResponse)
                      .items as youtube_v3.Schema$Video[])[0]
                  ),
                  parse_mode: "HTML",
                  type: "photo"
                },
                reply_markup: {
                  inline_keyboard: [
                    [
                      {
                        callback_data: encode(
                          {
                            id: action2.callbackQueryDataInsert
                              .result as string,
                            pageToken: (action.youtubeVideoList
                              .result as youtube_v3.Schema$VideoListResponse)
                              .prevPageToken as string
                          },
                          "iStateCallbackQueryDataFindQuery"
                        ),
                        text: texts.messageWithPaginationPrev
                      }
                    ]
                  ]
                }
              }
            })
          }
        );
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
        const action2 = actions.callbackQueryDataInsert.result({ result: "" });
        expectObservable(transformObservable(state$)(action)(action2)).toBe(
          "(a|)",
          {
            a: actions.editMessageMedia.query({
              query: {
                chat_id: (((state$.value.message.query as IStateMessageQuery)
                  .callback_query as ICallbackQuery).message as IMessage).chat
                  .id,
                message_id: (((state$.value.message.query as IStateMessageQuery)
                  .callback_query as ICallbackQuery).message as IMessage)
                  .message_id,
                media: {
                  caption: transformVideoCaption(
                    ((action.youtubeVideoList
                      .result as youtube_v3.Schema$VideoListResponse)
                      .items as youtube_v3.Schema$Video[])[0]
                  ),
                  media: transformVideoThumbnailUrl(
                    ((action.youtubeVideoList
                      .result as youtube_v3.Schema$VideoListResponse)
                      .items as youtube_v3.Schema$Video[])[0]
                  ),
                  parse_mode: "HTML",
                  type: "photo"
                },
                reply_markup: {
                  inline_keyboard: [
                    [
                      {
                        callback_data: encode(
                          {
                            id: action2.callbackQueryDataInsert
                              .result as string,
                            pageToken: (action.youtubeVideoList
                              .result as youtube_v3.Schema$VideoListResponse)
                              .nextPageToken as string
                          },
                          "iStateCallbackQueryDataFindQuery"
                        ),
                        text: texts.messageWithPaginationPrev
                      },
                      {
                        callback_data: encode(
                          {
                            id: action2.callbackQueryDataInsert
                              .result as string,
                            pageToken: (action.youtubeVideoList
                              .result as youtube_v3.Schema$VideoListResponse)
                              .prevPageToken as string
                          },
                          "iStateCallbackQueryDataFindQuery"
                        ),
                        text: texts.messageWithPaginationNext
                      }
                    ]
                  ]
                }
              }
            })
          }
        );
      });
    });
  });
});
