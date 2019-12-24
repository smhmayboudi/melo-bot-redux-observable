import { ofType, StateObservable } from "redux-observable";
import { Observable, ObservableInput } from "rxjs";
import { startWith, switchMap, take } from "rxjs/operators";

import { IActionAnswerInlineQuery } from "../../types/iActionAnswerInlineQuery";
import { IActionCallbackQueryDataInsert } from "../../types/iActionCallbackQueryDataInsert";
import { IActionEditMessageText } from "../../types/iActionEditMessageText";
import { IActionSendMessage } from "../../types/iActionSendMessage";
import { IActionYoutubeSearchList } from "../../types/iActionYoutubeSearchList";
import { IDependencies } from "../../types/iDependencies";
import { IState } from "../../types/iState";
import * as actions from "../actions";
import { filterAsync } from "../libs/filterAsync";
import { transformObservable as transformObservableToAnswerInlineQuery } from "./youtubeSearchListToAnswerInlineQuery";
import { transformObservable as transformObservableToEditMessageText } from "./youtubeSearchListToEditMessageText";
import { transformObservable as transformObservableToSendMessage } from "./youtubeSearchListToSendMessage";

const youtubeSearchListResult: (
  action$: Observable<IActionYoutubeSearchList>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => Observable<
  | IActionAnswerInlineQuery
  | IActionCallbackQueryDataInsert
  | IActionEditMessageText
  | IActionSendMessage
  | IActionYoutubeSearchList
> = (
  action$: Observable<IActionYoutubeSearchList>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
): Observable<
  | IActionAnswerInlineQuery
  | IActionCallbackQueryDataInsert
  | IActionEditMessageText
  | IActionSendMessage
  | IActionYoutubeSearchList
> => {
  const { authorization, locales, testAction$ } = dependencies;

  const transformObservable: (
    action: IActionYoutubeSearchList
  ) => (
    action2: IActionCallbackQueryDataInsert
  ) => Observable<
    | IActionAnswerInlineQuery
    | IActionCallbackQueryDataInsert
    | IActionEditMessageText
    | IActionSendMessage
    | IActionYoutubeSearchList
  > = (action: IActionYoutubeSearchList) => (
    action2: IActionCallbackQueryDataInsert
  ): Observable<
    | IActionAnswerInlineQuery
    | IActionCallbackQueryDataInsert
    | IActionEditMessageText
    | IActionSendMessage
    | IActionYoutubeSearchList
  > => {
    if (state$ !== undefined && state$.value.inlineQuery.query !== undefined) {
      return transformObservableToAnswerInlineQuery(
        action,
        state$,
        dependencies
      )(action2);
    } else {
      if (
        state$ !== undefined &&
        state$.value.message.query !== undefined &&
        state$.value.message.query.message !== undefined
      ) {
        return transformObservableToSendMessage(
          action,
          state$,
          dependencies
        )(action2);
      }
      return transformObservableToEditMessageText(
        action,
        state$,
        dependencies
      )(action2);
    }
  };

  const startAction: (
    action: IActionYoutubeSearchList
  ) => IActionCallbackQueryDataInsert | IActionYoutubeSearchList = (
    action: IActionYoutubeSearchList
  ): IActionCallbackQueryDataInsert | IActionYoutubeSearchList => {
    if (state$ === undefined) {
      return actions.youtubeSearchList.error({
        error: new Error(locales.find("state$Undefined"))
      });
    }
    if (state$.value.message.query === undefined) {
      return actions.youtubeSearchList.error({
        error: new Error(locales.find("state$ValueMessageQueryUndefined"))
      });
    }
    if (action.youtubeSearchList.result === undefined) {
      return actions.youtubeSearchList.error({
        error: new Error(locales.find("actionYoutubeSearchListResultUndefined"))
      });
    }
    if (action.youtubeSearchList.result.pageInfo === undefined) {
      return actions.youtubeSearchList.error({
        error: new Error(
          locales.find("actionYoutubeSearchListResultPageInfoUndefined")
        )
      });
    }

    let q = "";
    if (
      state$.value.message.query.message !== undefined &&
      state$.value.message.query.message.text !== undefined
    ) {
      q = state$.value.message.query.message.text;
    }
    if (
      state$.value.message.query.callback_query !== undefined &&
      state$.value.message.query.callback_query.message !== undefined &&
      state$.value.message.query.callback_query.message.reply_to_message !==
        undefined &&
      state$.value.message.query.callback_query.message.reply_to_message
        .text !== undefined
    ) {
      q =
        state$.value.message.query.callback_query.message.reply_to_message.text;
    }

    if (
      action.youtubeSearchList.result.pageInfo.resultsPerPage === null ||
      action.youtubeSearchList.result.pageInfo.resultsPerPage === undefined
    ) {
      return actions.youtubeSearchList.error({
        error: new Error(
          locales.find(
            "actionYoutubeSearchListResultPageInfoResultsPerPageUndefined"
          )
        )
      });
    }
    if (
      action.youtubeSearchList.result.pageInfo.totalResults === null ||
      action.youtubeSearchList.result.pageInfo.totalResults === undefined
    ) {
      return actions.youtubeSearchList.error({
        error: new Error(
          locales.find(
            "actionYoutubeSearchListResultPageInfoTotalResultsUndefined"
          )
        )
      });
    }

    return actions.callbackQueryDataInsert.query({
      query: {
        nextPageToken: action.youtubeSearchList.result.nextPageToken,
        pageInfo: action.youtubeSearchList.result.pageInfo,
        prevPageToken: action.youtubeSearchList.result.prevPageToken,
        q
      }
    });
  };

  return action$.pipe(
    ofType(actions.youtubeSearchList.YOUTUBE_SEARCH_LIST_RESULT),
    filterAsync((action: IActionYoutubeSearchList, index: number) =>
      authorization(action, state$, index)
    ),
    switchMap(
      (
        action: IActionYoutubeSearchList
      ): ObservableInput<
        | IActionAnswerInlineQuery
        | IActionCallbackQueryDataInsert
        | IActionEditMessageText
        | IActionSendMessage
        | IActionYoutubeSearchList
      > =>
        (testAction$ || action$).pipe(
          ofType(
            actions.callbackQueryDataInsert.CALLBACK_QUERY_DATA_INSERT_RESULT
          ),
          take<IActionCallbackQueryDataInsert & IActionYoutubeSearchList>(1),
          filterAsync((action: IActionCallbackQueryDataInsert, index: number) =>
            authorization(action, state$, index)
          ),
          switchMap(transformObservable(action)),
          startWith(startAction(action))
        )
    )
  );
};

export { youtubeSearchListResult };
