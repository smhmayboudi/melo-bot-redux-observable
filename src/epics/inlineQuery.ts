import { ofType, StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { switchMap } from "rxjs/operators";

import { IActionInlineQuery } from "../../types/iActionInlineQuery";
import { IActionYoutubeSearchList } from "../../types/iActionYoutubeSearchList";
import { IDependencies } from "../../types/iDependencies";
import { IState } from "../../types/iState";
import * as actions from "../actions";
import { filterAsync } from "../libs/filterAsync";
import * as env from "../configs/env";
import { decode } from "../utils/string";

const inlineQuery: (
  action$: Observable<IActionInlineQuery>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => Observable<IActionInlineQuery | IActionYoutubeSearchList> = (
  action$: Observable<IActionInlineQuery>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
): Observable<IActionInlineQuery | IActionYoutubeSearchList> => {
  const { authorization, locales } = dependencies;

  const actionObservable: (
    action: IActionInlineQuery
  ) => Observable<IActionInlineQuery | IActionYoutubeSearchList> = (
    action: IActionInlineQuery
  ): Observable<IActionInlineQuery | IActionYoutubeSearchList> => {
    if (action.inlineQuery.query === undefined) {
      return of(
        actions.inlineQuery.error({
          error: new Error(locales.find("actionInlineQueryQueryUndefined"))
        })
      );
    }

    return of(
      actions.youtubeSearchList.query({
        query: {
          key: env.GOOGLE_API_KEY,
          maxResults: env.GOOGLE_API_LIST_MAX_RESULTS,
          part: "id,snippet",
          pageToken: decode(
            action.inlineQuery.query.offset,
            "iStateCallbackQueryDataFindQuery"
          ).pageToken,
          q: action.inlineQuery.query.query.trim(),
          regionCode: env.GOOGLE_API_REGION_CODE,
          relevanceLanguage: env.GOOGLE_API_RELEVANCE_LANGUAGE,
          safeSearch: env.GOOGLE_API_SAFE_SEARCH,
          type: env.GOOGLE_API_SEARCH_LIST_TYPE
        }
      })
    );
  };

  return action$.pipe(
    ofType(actions.inlineQuery.INLINE_QUERY_QUERY),
    filterAsync((action: IActionInlineQuery, index: number) =>
      authorization(state$, dependencies, action, index)
    ),
    switchMap(actionObservable)
  );
};

export { inlineQuery };
