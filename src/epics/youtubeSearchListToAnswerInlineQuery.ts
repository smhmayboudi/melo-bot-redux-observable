import { Observable, of } from "rxjs";

import { IActionAnswerInlineQuery } from "../../types/iActionAnswerInlineQuery";
import { IActionYoutubeSearchList } from "../../types/iActionYoutubeSearchList";
import { IState } from "../../types/iState";
import { StateObservable } from "redux-observable";
import { transformSearchList } from "../utils/inlineQueryResultArticle";
import * as actions from "../actions";
import * as texts from "../configs/texts";

const transformObservable: (
  state$: StateObservable<IState> | undefined,
  action: IActionYoutubeSearchList
) => Observable<IActionAnswerInlineQuery | IActionYoutubeSearchList> = (
  state$: StateObservable<IState> | undefined,
  action: IActionYoutubeSearchList
): Observable<IActionAnswerInlineQuery | IActionYoutubeSearchList> => {
  if (action.type === actions.youtubeSearchList.YOUTUBE_SEARCH_LIST_ERROR) {
    return of(action);
  }
  if (action.youtubeSearchList.result === undefined) {
    return of(
      actions.youtubeSearchList.error({
        error: new Error(texts.actionYoutubeSearchListResultUndefined)
      })
    );
  }
  if (action.youtubeSearchList.result.items === undefined) {
    return of(
      actions.youtubeSearchList.error({
        error: new Error(texts.actionYoutubeSearchListResultItemsUndefined)
      })
    );
  }
  if (state$ === undefined) {
    return of(
      actions.youtubeSearchList.error({
        error: new Error(texts.state$Undefined)
      })
    );
  }
  if (state$.value.inlineQuery.query === undefined) {
    return of(
      actions.youtubeSearchList.error({
        error: new Error(texts.state$ValueInlineQueryQueryUndefined)
      })
    );
  }
  if (state$.value.youtubeSearchList.query === undefined) {
    return of(
      actions.youtubeSearchList.error({
        error: new Error(texts.state$ValueYoutubeSearchListQueryUndefined)
      })
    );
  }
  if (state$.value.youtubeSearchList.query.q === undefined) {
    return of(
      actions.youtubeSearchList.error({
        error: new Error(texts.state$ValueYoutubeSearchListQueryQUndefined)
      })
    );
  }

  return of(
    actions.answerInlineQuery.query({
      query: {
        inline_query_id: state$.value.inlineQuery.query.id,
        is_personal: true,
        next_offset: `${action.youtubeSearchList.result.nextPageToken}`,
        results: transformSearchList(
          action.youtubeSearchList.result.items,
          state$.value.youtubeSearchList.query.q
        ),
        switch_pm_parameter: "string",
        switch_pm_text: texts.epicInlineQueryConnectGoogleAccount
      }
    })
  );
};

export { transformObservable };
