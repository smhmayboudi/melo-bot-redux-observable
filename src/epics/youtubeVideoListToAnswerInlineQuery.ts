import { StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";

import { IActionAnswerInlineQuery } from "../../types/iActionAnswerInlineQuery";
import { IActionCallbackQueryDataInsert } from "../../types/iActionCallbackQueryDataInsert";
import { IActionYoutubeVideoList } from "../../types/iActionYoutubeVideoList";
import { IState } from "../../types/iState";
import * as actions from "../actions";
import * as texts from "../configs/texts";
import { transformVideos } from "../utils/inlineQueryResultArticle";
import { encode } from "../utils/string";

const transformObservable: (
  state$: StateObservable<IState> | undefined
) => (
  action: IActionYoutubeVideoList
) => (
  action2: IActionCallbackQueryDataInsert
) => Observable<IActionAnswerInlineQuery | IActionYoutubeVideoList> = (
  state$: StateObservable<IState> | undefined
) => (action: IActionYoutubeVideoList) => (
  action2: IActionCallbackQueryDataInsert
): Observable<IActionAnswerInlineQuery | IActionYoutubeVideoList> => {
  if (action.type === actions.youtubeVideoList.YOUTUBE_VIDEO_LIST_ERROR) {
    return of(action);
  }
  if (state$ === undefined) {
    return of(
      actions.youtubeVideoList.error({
        error: new Error(texts.state$Undefined)
      })
    );
  }
  if (state$.value.inlineQuery.query === undefined) {
    return of(
      actions.youtubeVideoList.error({
        error: new Error(texts.state$ValueInlineQueryQueryUndefined)
      })
    );
  }
  if (state$.value.youtubeVideoList.query === undefined) {
    return of(
      actions.youtubeVideoList.error({
        error: new Error(texts.state$ValueYoutubeVideoListQueryUndefined)
      })
    );
  }
  if (state$.value.youtubeVideoList.query.chart === undefined) {
    return of(
      actions.youtubeVideoList.error({
        error: new Error(texts.state$ValueYoutubeVideoListQueryChartUndefined)
      })
    );
  }
  if (action.youtubeVideoList.result === undefined) {
    return of(
      actions.youtubeVideoList.error({
        error: new Error(texts.actionYoutubeVideoListResultUndefined)
      })
    );
  }
  if (action.youtubeVideoList.result.items === undefined) {
    return of(
      actions.youtubeVideoList.error({
        error: new Error(texts.actionYoutubeVideoListResultItemsUndefined)
      })
    );
  }
  if (action2.callbackQueryDataInsert.result === undefined) {
    return of(
      actions.youtubeVideoList.error({
        error: new Error(texts.actionCallbackQueryDataInsertResultUndefined)
      })
    );
  }

  let nextOffset = "";
  if (
    action.youtubeVideoList.result.nextPageToken !== null &&
    action.youtubeVideoList.result.nextPageToken !== undefined
  ) {
    nextOffset = encode(
      {
        id: action2.callbackQueryDataInsert.result,
        pageToken: action.youtubeVideoList.result.nextPageToken
      },
      "iStateCallbackQueryDataFindQuery"
    );
  }

  return of(
    actions.answerInlineQuery.query({
      query: {
        inline_query_id: state$.value.inlineQuery.query.id,
        is_personal: true,
        next_offset: nextOffset,
        results: transformVideos(action.youtubeVideoList.result.items),
        switch_pm_parameter: "string",
        switch_pm_text: texts.actionAnswerInlineQueryQuerySwitchPMText
      }
    })
  );
};

export { transformObservable };
