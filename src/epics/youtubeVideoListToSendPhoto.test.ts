import { youtube_v3 } from "googleapis";

import { StateObservable } from "redux-observable";
import { of, Subject } from "rxjs";

import { initialState } from "../utils/store";
import * as actions from "../actions";
import * as texts from "../configs/texts";
import { IActionYoutubeVideoList } from "../../types/iActionYoutubeVideoList";
import { IState } from "../../types/iState";
import { IStateMessageQuery } from "../../types/iStateMessageQuery";
import { IStateYoutubeVideoListQuery } from "../../types/iStateYoutubeVideoListQuery";
import { transformObservable } from "./youtubeVideoListToSendPhoto";

describe("youtubeVideoList epic", (): void => {
  describe("youtubeVideoListToSendMessage", (): void => {
    const error: Error = new Error("");
    const query: IStateYoutubeVideoListQuery = {
      chart: "",
      key: ""
    };
    // const result: youtube_v3.Schema$VideoListResponse = {};
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

    test("should handle error", (): void => {
      const action: IActionYoutubeVideoList = actions.youtubeVideoList.error({
        error
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        state$Value
      );
      const action2 = actions.callbackQueryDataInsert.result({ result: "" });
      expect(transformObservable(action, state$)(action2)).toEqual(of(action));
    });

    test("should handle error state$ undefined", (): void => {
      const action: IActionYoutubeVideoList = actions.youtubeVideoList.query({
        query
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const action2 = actions.callbackQueryDataInsert.result({ result: "" });
      expect(transformObservable(action, state$)(action2)).toEqual(
        of(
          actions.youtubeVideoList.error({
            error: new Error(texts.state$Undefined)
          })
        )
      );
    });

    test("should handle error state$ValueMessageQuery undefined", (): void => {
      const action: IActionYoutubeVideoList = actions.youtubeVideoList.query({
        query
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        state$ValueMessageQueryUndefined
      );
      const action2 = actions.callbackQueryDataInsert.result({ result: "" });
      expect(transformObservable(action, state$)(action2)).toEqual(
        of(
          actions.youtubeVideoList.error({
            error: new Error(texts.state$ValueMessageQueryUndefined)
          })
        )
      );
    });

    test("should handle error state$ValueMessageQueryMessage undefined", (): void => {
      const action: IActionYoutubeVideoList = actions.youtubeVideoList.query({
        query
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        state$ValueMessageQueryMessageUndefined
      );
      const action2 = actions.callbackQueryDataInsert.result({ result: "" });
      expect(transformObservable(action, state$)(action2)).toEqual(
        of(
          actions.youtubeVideoList.error({
            error: new Error(texts.state$ValueMessageQueryMessageUndefined)
          })
        )
      );
    });

    test("should handle error state$ValueYoutubeVideoListQuery undefined", (): void => {
      const action: IActionYoutubeVideoList = actions.youtubeVideoList.query({
        query
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        state$ValueYoutubeVideoListQueryUndefined
      );
      const action2 = actions.callbackQueryDataInsert.result({ result: "" });
      expect(transformObservable(action, state$)(action2)).toEqual(
        of(
          actions.youtubeVideoList.error({
            error: new Error(texts.state$ValueYoutubeVideoListQueryUndefined)
          })
        )
      );
    });

    test("should handle error state$ValueYoutubeVideoListQueryChart undefined", (): void => {
      const action: IActionYoutubeVideoList = actions.youtubeVideoList.query({
        query: undefined
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        state$ValueYoutubeVideoListQueryChartUndefined
      );
      const action2 = actions.callbackQueryDataInsert.result({ result: "" });
      expect(transformObservable(action, state$)(action2)).toEqual(
        of(
          actions.youtubeVideoList.error({
            error: new Error(
              texts.state$ValueYoutubeVideoListQueryChartUndefined
            )
          })
        )
      );
    });

    test("should handle error actionYoutubeVideoListResult undefined", (): void => {
      const action: IActionYoutubeVideoList = actions.youtubeVideoList.result({
        result: undefined
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        state$Value
      );
      const action2 = actions.callbackQueryDataInsert.result({ result: "" });
      expect(transformObservable(action, state$)(action2)).toEqual(
        of(
          actions.youtubeVideoList.error({
            error: new Error(texts.actionYoutubeVideoListResultUndefined)
          })
        )
      );
    });

    test("should handle error actionYoutubeVideoListResultItems undefined", (): void => {
      const action: IActionYoutubeVideoList = actions.youtubeVideoList.result({
        result: actionYoutubeVideoListResultItemsUndefined
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        state$Value
      );
      const action2 = actions.callbackQueryDataInsert.result({ result: "" });
      expect(transformObservable(action, state$)(action2)).toEqual(
        of(
          actions.youtubeVideoList.error({
            error: new Error(texts.actionYoutubeVideoListResultItemsUndefined)
          })
        )
      );
    });

    test("should handle error action2CallbackQueryDataInsertResult undefined", (): void => {
      const action: IActionYoutubeVideoList = actions.youtubeVideoList.result({
        result: actionYoutubeVideoListResult
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        state$Value
      );
      const action2 = actions.callbackQueryDataInsert.result({
        result: undefined
      });
      expect(transformObservable(action, state$)(action2)).toEqual(
        of(
          actions.youtubeVideoList.error({
            error: new Error(texts.actionCallbackQueryDataInsertResultUndefined)
          })
        )
      );
    });

    test("should handle result actionYoutubeVideoListResultNextPageToken undefined", (): void => {
      const action: IActionYoutubeVideoList = actions.youtubeVideoList.result({
        result: actionYoutubeVideoListResultNextPageTokenUndefined
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        state$Value
      );
      const action2 = actions.callbackQueryDataInsert.result({ result: "" });
      expect(transformObservable(action, state$)(action2)).toEqual(
        of(
          actions.youtubeVideoList.error({
            error: new Error("")
          })
        )
      );
    });

    test("should handle result actionYoutubeVideoListResultPrevPageToken undefined", (): void => {
      const action: IActionYoutubeVideoList = actions.youtubeVideoList.result({
        result: actionYoutubeVideoListResultPrevPageTokenUndefined
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        state$Value
      );
      const action2 = actions.callbackQueryDataInsert.result({ result: "" });
      expect(transformObservable(action, state$)(action2)).toEqual(
        of(
          actions.youtubeVideoList.error({
            error: new Error("")
          })
        )
      );
    });

    test("should handle result", (): void => {
      const action: IActionYoutubeVideoList = actions.youtubeVideoList.result({
        result: actionYoutubeVideoListResult
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        state$Value
      );
      const action2 = actions.callbackQueryDataInsert.result({ result: "" });
      expect(transformObservable(action, state$)(action2)).toEqual(
        of(
          actions.youtubeVideoList.error({
            error: new Error("")
          })
        )
      );
    });
  });
});
