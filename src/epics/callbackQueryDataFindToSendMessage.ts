import { ofType, StateObservable } from "redux-observable";
import { Observable, of, throwError } from "rxjs";
import { switchMap } from "rxjs/operators";

import { IActionCallbackQueryDataFind } from "../../types/iActionCallbackQueryDataFind";
import { IActionYoutubeSearchList } from "../../types/iActionYoutubeSearchList";
import { IActionYoutubeVideoList } from "../../types/iActionYoutubeVideoList";
import { IDependencies } from "../../types/iDependencies";
import { IState } from "../../types/iState";
import * as actions from "../actions";
import { filterAsync } from "../libs/filterAsync";
import * as env from "../configs/env";

const callbackQueryDataFindToSendMessage: (
  action$: Observable<IActionCallbackQueryDataFind>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => Observable<
  | IActionCallbackQueryDataFind
  | IActionYoutubeSearchList
  | IActionYoutubeVideoList
> = (
  action$: Observable<IActionCallbackQueryDataFind>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
): Observable<
  | IActionCallbackQueryDataFind
  | IActionYoutubeSearchList
  | IActionYoutubeVideoList
> => {
  const { authorization, locales } = dependencies;

  const actionObservable: (
    action: IActionCallbackQueryDataFind
  ) => Observable<
    | IActionCallbackQueryDataFind
    | IActionYoutubeSearchList
    | IActionYoutubeVideoList
  > = (
    action: IActionCallbackQueryDataFind
  ): Observable<
    | IActionCallbackQueryDataFind
    | IActionYoutubeSearchList
    | IActionYoutubeVideoList
  > => {
    if (state$ === undefined) {
      return of(
        actions.callbackQueryDataFind.error({
          error: new Error(locales.find("state$Undefined"))
        })
      );
    }
    if (state$.value.callbackQueryDataFind.query === undefined) {
      return of(
        actions.callbackQueryDataFind.error({
          error: new Error(
            locales.find("state$ValueCallbackQueryDataFindQueryUndefined")
          )
        })
      );
    }
    if (
      action.callbackQueryDataFind.result === null ||
      action.callbackQueryDataFind.result === undefined
    ) {
      return of(
        actions.callbackQueryDataFind.error({
          error: new Error(
            locales.find("actionCallbackQueryDataFindResultUndefined")
          )
        })
      );
    }
    if (action.callbackQueryDataFind.result.pageInfo === undefined) {
      return of(
        actions.callbackQueryDataFind.error({
          error: new Error(
            locales.find("actionCallbackQueryDataFindResultPageInfoUndefined")
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
            locales.find(
              "actionCallbackQueryDataFindResultPageInfoResultsPerPageUndefined"
            )
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

    return throwError(
      new Error(
        locales.find("actionCallbackQueryDataFindResultChartQUndefined")
      )
    );
  };

  return action$.pipe(
    ofType(actions.callbackQueryDataFind.CALLBACK_QUERY_DATA_FIND_RESULT),
    filterAsync((action: IActionCallbackQueryDataFind, index: number) =>
      authorization(action, state$, index)
    ),
    switchMap(actionObservable)
  );
};

export { callbackQueryDataFindToSendMessage };
