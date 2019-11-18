import { youtube_v3 } from "googleapis";

import { StateObservable } from "redux-observable";
import { of, Subject } from "rxjs";

import { initialState } from "../utils/store";
import * as actions from "../actions";
import * as texts from "../configs/texts";
import { IActionYoutubeSearchList } from "../../types/iActionYoutubeSearchList";
import { IState } from "../../types/iState";
import { IStateYoutubeSearchListQuery } from "../../types/iStateYoutubeSearchListQuery";
import { transformObservable } from "./youtubeSearchListToAnswerInlineQuery";

describe("youtubeSearchList epic", (): void => {
  describe("youtubeSearchListToAnswerInlineQuery", (): void => {
    const error: Error = new Error("");
    const query: IStateYoutubeSearchListQuery = {
      key: "",
      q: "",
      relatedToVideoId: undefined
    };
    // const result: youtube_v3.Schema$SearchListResponse = {};
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
      items: [],
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

    test("should handle error", (): void => {
      const action: IActionYoutubeSearchList = actions.youtubeSearchList.error({
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
      const action: IActionYoutubeSearchList = actions.youtubeSearchList.query({
        query
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const action2 = actions.callbackQueryDataInsert.result({ result: "" });
      expect(transformObservable(action, state$)(action2)).toEqual(
        of(
          actions.youtubeSearchList.error({
            error: new Error(texts.state$Undefined)
          })
        )
      );
    });

    test("should handle error state$ValueInlineQueryQuery undefined", (): void => {
      const action: IActionYoutubeSearchList = actions.youtubeSearchList.query({
        query
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        state$ValueInlineQueryQueryUndefined
      );
      const action2 = actions.callbackQueryDataInsert.result({ result: "" });
      expect(transformObservable(action, state$)(action2)).toEqual(
        of(
          actions.youtubeSearchList.error({
            error: new Error(texts.state$ValueInlineQueryQueryUndefined)
          })
        )
      );
    });

    test("should handle error state$ValueYoutubeSearchListQuery undefined", (): void => {
      const action: IActionYoutubeSearchList = actions.youtubeSearchList.query({
        query: undefined
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        state$ValueYoutubeSearchListQueryUndefined
      );
      const action2 = actions.callbackQueryDataInsert.result({ result: "" });
      expect(transformObservable(action, state$)(action2)).toEqual(
        of(
          actions.youtubeSearchList.error({
            error: new Error(texts.state$ValueYoutubeSearchListQueryUndefined)
          })
        )
      );
    });

    test("should handle error actionYoutubeSearchListResult undefined", (): void => {
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
      expect(transformObservable(action, state$)(action2)).toEqual(
        of(
          actions.youtubeSearchList.error({
            error: new Error(texts.actionYoutubeSearchListResultUndefined)
          })
        )
      );
    });

    test("should handle error actionYoutubeSearchListResultItems undefined", (): void => {
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
      expect(transformObservable(action, state$)(action2)).toEqual(
        of(
          actions.youtubeSearchList.error({
            error: new Error(texts.actionYoutubeSearchListResultItemsUndefined)
          })
        )
      );
    });

    test("should handle error action2CallbackQueryDataInsertResult undefined", (): void => {
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
      expect(transformObservable(action, state$)(action2)).toEqual(
        of(
          actions.youtubeSearchList.error({
            error: new Error(texts.actionCallbackQueryDataInsertResultUndefined)
          })
        )
      );
    });

    test("should handle error state$ValueYoutubeSearchListQueryQRelatedToVideoId undefined", (): void => {
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
      expect(transformObservable(action, state$)(action2)).toEqual(
        of(
          actions.youtubeSearchList.error({
            error: new Error(
              texts.state$ValueYoutubeSearchListQueryQRelatedToVideoIdUndefined
            )
          })
        )
      );
    });

    test("should handle result actionYoutubeSearchListResultNextPageToken undefined", (): void => {
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
      expect(transformObservable(action, state$)(action2)).toEqual(
        of(
          actions.youtubeSearchList.error({
            error: new Error(
              texts.state$ValueYoutubeSearchListQueryQRelatedToVideoIdUndefined
            )
          })
        )
      );
    });

    test("should handle result", (): void => {
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
      expect(transformObservable(action, state$)(action2)).toEqual(
        of(
          actions.youtubeSearchList.error({
            error: new Error(
              texts.state$ValueYoutubeSearchListQueryQRelatedToVideoIdUndefined
            )
          })
        )
      );
    });
  });
});
