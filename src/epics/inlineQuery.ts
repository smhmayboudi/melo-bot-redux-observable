import { ofType, StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { switchMap } from "rxjs/operators";

import { IActionInlineQuery } from "../../types/iActionInlineQuery";
import { IActionYoutubeSearchList } from "../../types/iActionYoutubeSearchList";
import { IDependencies } from "../../types/iDependencies";
import { IState } from "../../types/iState";
import * as actions from "../actions";
import * as env from "../config/env";
import * as texts from "../config/texts";

const inlineQuery: (
  action$: Observable<IActionInlineQuery>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => Observable<IActionInlineQuery | IActionYoutubeSearchList> = (
  action$: Observable<IActionInlineQuery>,
  _state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
): Observable<IActionInlineQuery | IActionYoutubeSearchList> => {
  const { botToken } = dependencies;

  const actionObservable: (
    action: IActionInlineQuery
  ) => Observable<IActionInlineQuery | IActionYoutubeSearchList> = (
    action: IActionInlineQuery
  ): Observable<IActionInlineQuery | IActionYoutubeSearchList> => {
    if (botToken === undefined) {
      return of(
        actions.inlineQuery.error({
          error: new Error(texts.epicDependencyBotTokenUndefined)
        })
      );
    }
    if (action.inlineQuery.query === undefined) {
      return of(
        actions.inlineQuery.error({
          error: new Error(texts.actionInlineQueryQueryUndefined)
        })
      );
    }

    return of(
      actions.youtubeSearchList.query({
        query: {
          key: env.GOOGLE_API_KEY,
          maxResults: env.GOOGLE_API_LIST_MAX_RESULTS,
          part: "id,snippet",
          q: action.inlineQuery.query.query.trim(),
          type: env.GOOGLE_API_SEARCH_LIST_TYPE
        }
      })
    );
  };

  return action$.pipe(
    ofType(actions.inlineQuery.INLINE_QUERY_QUERY),
    switchMap(actionObservable)
  );
};

export { inlineQuery };
