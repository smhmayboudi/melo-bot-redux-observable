import { youtube_v3 } from "googleapis";
import * as querystring from "querystring";
import { ofType, StateObservable } from "redux-observable";
import { Observable, ObservableInput, of } from "rxjs";
import { catchError, map, startWith, switchMap, take } from "rxjs/operators";

import { IActionAnswerInlineQuery } from "../../types/iActionAnswerInlineQuery";
import { IActionCallbackDataInsert } from "../../types/iActionCallbackDataInsert";
import { IActionEditMessageText } from "../../types/iActionEditMessageText";
import { IActionSendMessage } from "../../types/iActionSendMessage";
import { IActionYoutubeSearchList } from "../../types/iActionYoutubeSearchList";
import { IDependencies } from "../../types/iDependencies";
import { IState } from "../../types/iState";
import * as actions from "../actions";
import * as texts from "../configs/texts";

import { transformObservable as transformObservableToAnswerInlineQuery } from "./youtubeSearchListToAnswerInlineQuery";
import { transformObservable as transformObservableToEditMessageText } from "./youtubeSearchListToEditMessageText";
import { transformObservable as transformObservableToSendMessage } from "./youtubeSearchListToSendMessage";

const youtubeSearchList: (
  action$: Observable<IActionYoutubeSearchList>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => Observable<
  | IActionAnswerInlineQuery
  | IActionCallbackDataInsert
  | IActionEditMessageText
  | IActionSendMessage
  | IActionYoutubeSearchList
> = (
  action$: Observable<IActionYoutubeSearchList>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
): Observable<
  | IActionAnswerInlineQuery
  | IActionCallbackDataInsert
  | IActionEditMessageText
  | IActionSendMessage
  | IActionYoutubeSearchList
> => {
  const { requestsObservable, testAction$ } = dependencies;

  const actionObservable: (
    action: IActionYoutubeSearchList
  ) => Observable<IActionYoutubeSearchList> = (
    action: IActionYoutubeSearchList
  ): Observable<IActionYoutubeSearchList> => {
    if (requestsObservable === undefined) {
      return of(
        actions.youtubeSearchList.error({
          error: new Error(texts.epicDependencyRequestsObservableUndefined)
        })
      );
    }
    if (action.youtubeSearchList.query === undefined) {
      return of(
        actions.youtubeSearchList.error({
          error: new Error(texts.actionYoutubeSearchListQueryUndefined)
        })
      );
    }

    return requestsObservable({
      host: "www.googleapis.com",
      path: `/youtube/v3/search?${querystring.stringify(
        action.youtubeSearchList.query
      )}`
    }).pipe(
      map(
        (
          result: youtube_v3.Schema$SearchListResponse
        ): IActionYoutubeSearchList =>
          actions.youtubeSearchList.result({
            result
          })
      ),
      catchError((error: any) =>
        of(
          actions.youtubeSearchList.error({
            error
          })
        )
      )
    );
  };

  const transformObservable: (
    action: IActionYoutubeSearchList
  ) => (
    action2: IActionCallbackDataInsert
  ) => Observable<
    | IActionAnswerInlineQuery
    | IActionCallbackDataInsert
    | IActionEditMessageText
    | IActionSendMessage
    | IActionYoutubeSearchList
  > = (action: IActionYoutubeSearchList) => (
    action2: IActionCallbackDataInsert
  ): Observable<
    | IActionAnswerInlineQuery
    | IActionCallbackDataInsert
    | IActionEditMessageText
    | IActionSendMessage
    | IActionYoutubeSearchList
  > => {
    if (state$ !== undefined && state$.value.inlineQuery.query !== undefined) {
      return transformObservableToAnswerInlineQuery(action, state$)(action2);
    } else {
      if (
        state$ !== undefined &&
        state$.value.message.query !== undefined &&
        state$.value.message.query.message !== undefined
      ) {
        return transformObservableToSendMessage(action, state$)(action2);
      }
      return transformObservableToEditMessageText(action, state$)(action2);
    }
  };

  const startAction: (
    action: IActionYoutubeSearchList
  ) => IActionCallbackDataInsert | IActionYoutubeSearchList = (
    action: IActionYoutubeSearchList
  ): IActionCallbackDataInsert | IActionYoutubeSearchList => {
    if (state$ === undefined) {
      return actions.youtubeSearchList.error({
        error: new Error(texts.state$Undefined)
      });
    }
    if (state$.value.message.query === undefined) {
      return actions.youtubeSearchList.error({
        error: new Error(texts.state$ValueMessageQueryUndefined)
      });
    }
    if (action.youtubeSearchList.result === undefined) {
      return actions.youtubeSearchList.error({
        error: new Error(texts.actionYoutubeSearchListResultUndefined)
      });
    }
    if (action.youtubeSearchList.result.pageInfo === undefined) {
      return actions.youtubeSearchList.error({
        error: new Error(texts.actionYoutubeSearchListResultPageInfoUndefined)
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
          texts.actionYoutubeSearchListResultPageInfoResultsPerPageUndefined
        )
      });
    }
    if (
      action.youtubeSearchList.result.pageInfo.totalResults === null ||
      action.youtubeSearchList.result.pageInfo.totalResults === undefined
    ) {
      return actions.youtubeSearchList.error({
        error: new Error(
          texts.actionYoutubeSearchListResultPageInfoTotalResultsUndefined
        )
      });
    }

    return actions.callbackDataInsert.query({
      query: {
        nextPageToken: action.youtubeSearchList.result.nextPageToken,
        pageInfo: action.youtubeSearchList.result.pageInfo,
        prevPageToken: action.youtubeSearchList.result.prevPageToken,
        q
      }
    });
  };

  return action$.pipe(
    ofType(actions.youtubeSearchList.YOUTUBE_SEARCH_LIST_QUERY),
    switchMap(actionObservable),
    switchMap(
      (
        action: IActionYoutubeSearchList
      ): ObservableInput<
        | IActionAnswerInlineQuery
        | IActionCallbackDataInsert
        | IActionEditMessageText
        | IActionSendMessage
        | IActionYoutubeSearchList
      > =>
        ((): Observable<any> =>
          testAction$ !== undefined ? testAction$ : action$)().pipe(
          ofType(actions.callbackDataInsert.CALLBACK_DATA_INSERT_RESULT),
          take(1),
          switchMap(transformObservable(action)),
          startWith(startAction(action))
        )
    )
  );
};

export { youtubeSearchList };
