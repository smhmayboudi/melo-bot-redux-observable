import { StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";

import { IActionAnswerInlineQuery } from "../../types/iActionAnswerInlineQuery";
import { IActionCallbackQueryDataInsert } from "../../types/iActionCallbackQueryDataInsert";
import { IActionYoutubeSearchList } from "../../types/iActionYoutubeSearchList";
import { IDependencies } from "../../types/iDependencies";
import { IState } from "../../types/iState";
import * as actions from "../actions";
import { transformSearchResults } from "../utils/inlineQueryResultArticle";
import { encode } from "../utils/string";

const transformObservable: (
  action: IActionYoutubeSearchList,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => (
  action2: IActionCallbackQueryDataInsert
) => Observable<IActionAnswerInlineQuery | IActionYoutubeSearchList> = (
  action: IActionYoutubeSearchList,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => (
  action2: IActionCallbackQueryDataInsert
): Observable<IActionAnswerInlineQuery | IActionYoutubeSearchList> => {
  const { locales } = dependencies;

  if (action.type === actions.youtubeSearchList.YOUTUBE_SEARCH_LIST_ERROR) {
    return of(action);
  }
  if (state$ === undefined) {
    return of(
      actions.youtubeSearchList.error({
        error: new Error(locales.find("state$Undefined"))
      })
    );
  }
  if (state$.value.inlineQuery.query === undefined) {
    return of(
      actions.youtubeSearchList.error({
        error: new Error(locales.find("state$ValueInlineQueryQueryUndefined"))
      })
    );
  }
  if (state$.value.youtubeSearchList.query === undefined) {
    return of(
      actions.youtubeSearchList.error({
        error: new Error(
          locales.find("state$ValueYoutubeSearchListQueryUndefined")
        )
      })
    );
  }
  if (action.youtubeSearchList.result === undefined) {
    return of(
      actions.youtubeSearchList.error({
        error: new Error(locales.find("actionYoutubeSearchListResultUndefined"))
      })
    );
  }
  if (action.youtubeSearchList.result.items === undefined) {
    return of(
      actions.youtubeSearchList.error({
        error: new Error(
          locales.find("actionYoutubeSearchListResultItemsUndefined")
        )
      })
    );
  }
  if (action2.callbackQueryDataInsert.result === undefined) {
    return of(
      actions.youtubeSearchList.error({
        error: new Error(
          locales.find("actionCallbackQueryDataInsertResultUndefined")
        )
      })
    );
  }

  const qUndefined = state$.value.youtubeSearchList.query.q === undefined;
  const relatedToVideoIdUndefined =
    state$.value.youtubeSearchList.query.relatedToVideoId === undefined;
  if (
    (!qUndefined || relatedToVideoIdUndefined) &&
    (qUndefined || !relatedToVideoIdUndefined)
  ) {
    return of(
      actions.youtubeSearchList.error({
        error: new Error(
          locales.find(
            "state$ValueYoutubeSearchListQueryQRelatedToVideoIdUndefined"
          )
        )
      })
    );
  }

  let nextOffset = "";
  if (
    action.youtubeSearchList.result.nextPageToken !== null &&
    action.youtubeSearchList.result.nextPageToken !== undefined
  ) {
    nextOffset = encode(
      {
        id: action2.callbackQueryDataInsert.result,
        pageToken: action.youtubeSearchList.result.nextPageToken
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
        results: transformSearchResults(action.youtubeSearchList.result.items),
        switch_pm_parameter: "string",
        switch_pm_text: locales.find("actionAnswerInlineQueryQuerySwitchPMText")
      }
    })
  );
};

export { transformObservable };
