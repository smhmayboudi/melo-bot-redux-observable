import { StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";

import { IActionAnswerInlineQuery } from "../../types/iActionAnswerInlineQuery";
import { IActionCallbackQueryDataInsert } from "../../types/iActionCallbackQueryDataInsert";
import { IActionYoutubeVideoList } from "../../types/iActionYoutubeVideoList";
import { IDependencies } from "../../types/iDependencies";
import { IState } from "../../types/iState";
import * as actions from "../actions";
import { transformVideos } from "../utils/inlineQueryResultArticle";
import { encode } from "../utils/string";

const transformObservable: (
  action: IActionYoutubeVideoList,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => (
  action2: IActionCallbackQueryDataInsert
) => Observable<IActionAnswerInlineQuery | IActionYoutubeVideoList> = (
  action: IActionYoutubeVideoList,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => (
  action2: IActionCallbackQueryDataInsert
): Observable<IActionAnswerInlineQuery | IActionYoutubeVideoList> => {
  const { locales } = dependencies;

  if (action.type === actions.youtubeVideoList.YOUTUBE_VIDEO_LIST_ERROR) {
    return of(action);
  }
  if (state$ === undefined) {
    return of(
      actions.youtubeVideoList.error({
        error: new Error(locales.find("state$Undefined"))
      })
    );
  }
  if (state$.value.inlineQuery.query === undefined) {
    return of(
      actions.youtubeVideoList.error({
        error: new Error(locales.find("state$ValueInlineQueryQueryUndefined"))
      })
    );
  }
  if (state$.value.youtubeVideoList.query === undefined) {
    return of(
      actions.youtubeVideoList.error({
        error: new Error(
          locales.find("state$ValueYoutubeVideoListQueryUndefined")
        )
      })
    );
  }
  if (state$.value.youtubeVideoList.query.chart === undefined) {
    return of(
      actions.youtubeVideoList.error({
        error: new Error(
          locales.find("state$ValueYoutubeVideoListQueryChartUndefined")
        )
      })
    );
  }
  if (action.youtubeVideoList.result === undefined) {
    return of(
      actions.youtubeVideoList.error({
        error: new Error(locales.find("actionYoutubeVideoListResultUndefined"))
      })
    );
  }
  if (action.youtubeVideoList.result.items === undefined) {
    return of(
      actions.youtubeVideoList.error({
        error: new Error(
          locales.find("actionYoutubeVideoListResultItemsUndefined")
        )
      })
    );
  }
  if (action2.callbackQueryDataInsert.result === undefined) {
    return of(
      actions.youtubeVideoList.error({
        error: new Error(
          locales.find("actionCallbackQueryDataInsertResultUndefined")
        )
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
        switch_pm_text: locales.find("actionAnswerInlineQueryQuerySwitchPMText")
      }
    })
  );
};

export { transformObservable };
