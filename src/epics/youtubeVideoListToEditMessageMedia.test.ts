import { youtube_v3 } from "googleapis";

import { StateObservable } from "redux-observable";
import { Subject } from "rxjs";
import { RunHelpers } from "rxjs/internal/testing/TestScheduler";
import { TestScheduler } from "rxjs/testing";

import { initialState } from "../utils/store";
import * as actions from "../actions";
import * as texts from "../configs/texts";
import { IActionYoutubeVideoList } from "../../types/iActionYoutubeVideoList";
import { ICallbackQuery } from "../../types/telegramBot/types/iCallbackQuery";
import { IState } from "../../types/iState";
import { IStateMessageQuery } from "../../types/iStateMessageQuery";
import { IStateYoutubeVideoListQuery } from "../../types/iStateYoutubeVideoListQuery";
import { transformObservable } from "./youtubeVideoListToEditMessageMedia";

describe("youtubeVideoList epic", (): void => {
  describe("youtubeVideoListToEditMessageText", (): void => {
    const error: Error = new Error("");
    const query: IStateYoutubeVideoListQuery = {
      chart: "",
      key: ""
    };
    // const result: youtube_v3.Schema$VideoListResponse = {};
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
      items: [],
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
        expectObservable(transformObservable(action, state$)(action2)).toBe(
          "a",
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
        expectObservable(transformObservable(action, state$)(action2)).toBe(
          "a",
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
        expectObservable(transformObservable(action, state$)(action2)).toBe(
          "a",
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
        expectObservable(transformObservable(action, state$)(action2)).toBe(
          "a",
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
        expectObservable(transformObservable(action, state$)(action2)).toBe(
          "a",
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
        expectObservable(transformObservable(action, state$)(action2)).toBe(
          "a",
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
        expectObservable(transformObservable(action, state$)(action2)).toBe(
          "a",
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
        expectObservable(transformObservable(action, state$)(action2)).toBe(
          "a",
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
        expectObservable(transformObservable(action, state$)(action2)).toBe(
          "a",
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
        expectObservable(transformObservable(action, state$)(action2)).toBe(
          "a",
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
        expectObservable(transformObservable(action, state$)(action2)).toBe(
          "a",
          {
            a: actions.youtubeVideoList.error({
              error: new Error("")
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
        expectObservable(transformObservable(action, state$)(action2)).toBe(
          "a",
          {
            a: actions.youtubeVideoList.error({
              error: new Error("")
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
        expectObservable(transformObservable(action, state$)(action2)).toBe(
          "a",
          {
            a: actions.youtubeVideoList.error({
              error: new Error("")
            })
          }
        );
      });
    });
  });
});
