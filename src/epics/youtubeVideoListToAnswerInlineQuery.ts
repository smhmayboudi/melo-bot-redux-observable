import { Observable, of } from "rxjs";

import { IActionAnswerInlineQuery } from "../../types/iActionAnswerInlineQuery";
import { IActionYoutubeVideoList } from "../../types/iActionYoutubeVideoList";
import { IState } from "../../types/iState";
import { StateObservable } from "redux-observable";
import { transformVideoList } from "../utils/inlineQueryResultArticle";
import * as actions from "../actions";
import * as texts from "../configs/texts";

const transformObservable: (
  state$: StateObservable<IState> | undefined,
  action: IActionYoutubeVideoList
) => Observable<IActionAnswerInlineQuery | IActionYoutubeVideoList> = (
  state$: StateObservable<IState> | undefined,
  action: IActionYoutubeVideoList
): Observable<IActionAnswerInlineQuery | IActionYoutubeVideoList> => {
  if (action.type === actions.youtubeVideoList.YOUTUBE_VIDEO_LIST_ERROR) {
    return of(action);
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

  return of(
    actions.answerInlineQuery.query({
      query: {
        inline_query_id: state$.value.inlineQuery.query.id,
        is_personal: true,
        next_offset: `${action.youtubeVideoList.result.nextPageToken}`,
        results: transformVideoList(
          action.youtubeVideoList.result.items,
          state$.value.youtubeVideoList.query.chart
        ),
        switch_pm_parameter: "string",
        switch_pm_text: texts.epicInlineQueryConnectGoogleAccount
      }
    })
  );
};

export { transformObservable };
