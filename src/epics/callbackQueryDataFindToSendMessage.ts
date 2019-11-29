import { StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";

import { IActionCallbackQueryDataFind } from "../../types/iActionCallbackQueryDataFind";
import { IActionYoutubeSearchList } from "../../types/iActionYoutubeSearchList";
import { IActionYoutubeVideoList } from "../../types/iActionYoutubeVideoList";
import { IState } from "../../types/iState";
import * as actions from "../actions";
import * as env from "../configs/env";
import * as texts from "../configs/texts";

const transformObservable: (
  state$: StateObservable<IState> | undefined
) => (
  action: IActionCallbackQueryDataFind
) => Observable<
  | IActionCallbackQueryDataFind
  | IActionYoutubeSearchList
  | IActionYoutubeVideoList
> = (state$: StateObservable<IState> | undefined) => (
  action: IActionCallbackQueryDataFind
): Observable<
  | IActionCallbackQueryDataFind
  | IActionYoutubeSearchList
  | IActionYoutubeVideoList
> => {
  if (
    action.type === actions.callbackQueryDataFind.CALLBACK_QUERY_DATA_FIND_ERROR
  ) {
    return of(action);
  }
  if (state$ === undefined) {
    return of(
      actions.callbackQueryDataFind.error({
        error: new Error(texts.state$Undefined)
      })
    );
  }
  if (state$.value.callbackQueryDataFind.query === undefined) {
    return of(
      actions.callbackQueryDataFind.error({
        error: new Error(texts.state$ValueCallbackQueryDataFindQueryUndefined)
      })
    );
  }
  if (
    action.callbackQueryDataFind.result === null ||
    action.callbackQueryDataFind.result === undefined
  ) {
    return of(
      actions.callbackQueryDataFind.error({
        error: new Error(texts.actionCallbackQueryDataFindResultUndefined)
      })
    );
  }
  if (action.callbackQueryDataFind.result.pageInfo === undefined) {
    return of(
      actions.callbackQueryDataFind.error({
        error: new Error(
          texts.actionCallbackQueryDataFindResultPageInfoUndefined
        )
      })
    );
  }
  if (
    action.callbackQueryDataFind.result.pageInfo.resultsPerPage === null ||
    action.callbackQueryDataFind.result.pageInfo.resultsPerPage === undefined
  ) {
    return of(
      actions.callbackQueryDataFind.error({
        error: new Error(
          texts.actionCallbackQueryDataFindResultPageInfoResultsPerPageUndefined
        )
      })
    );
  }
  if (action.callbackQueryDataFind.result.chart !== undefined) {
    return of(
      actions.youtubeVideoList.query({
        query: {
          chart: action.callbackQueryDataFind.result.chart,
          hl: env.GOOGLE_API_RELEVANCE_LANGUAGE,
          key: env.GOOGLE_API_KEY,
          maxResults:
            action.callbackQueryDataFind.result.pageInfo.resultsPerPage,
          part: "id,snippet",
          pageToken: state$.value.callbackQueryDataFind.query.pageToken,
          regionCode: env.GOOGLE_API_REGION_CODE
        }
      })
    );
  } else if (action.callbackQueryDataFind.result.q !== undefined) {
    return of(
      actions.youtubeSearchList.query({
        query: {
          key: env.GOOGLE_API_KEY,
          maxResults:
            action.callbackQueryDataFind.result.pageInfo.resultsPerPage,
          part: "id,snippet",
          pageToken: state$.value.callbackQueryDataFind.query.pageToken,
          q: action.callbackQueryDataFind.result.q,
          regionCode: env.GOOGLE_API_REGION_CODE,
          relevanceLanguage: env.GOOGLE_API_RELEVANCE_LANGUAGE,
          safeSearch: env.GOOGLE_API_SAFE_SEARCH,
          type: env.GOOGLE_API_SEARCH_LIST_TYPE
        }
      })
    );
  }

  return of(action);
};

export { transformObservable };
