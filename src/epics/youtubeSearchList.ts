import { youtube_v3 } from "googleapis";
import * as querystring from "querystring";
import { ofType, StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { IActionAnswerInlineQuery } from "../../types/iActionAnswerInlineQuery";
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
  | IActionEditMessageText
  | IActionSendMessage
  | IActionYoutubeSearchList
> = (
  action$: Observable<IActionYoutubeSearchList>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
): Observable<
  | IActionAnswerInlineQuery
  | IActionEditMessageText
  | IActionSendMessage
  | IActionYoutubeSearchList
> => {
  const { requestsObservable } = dependencies;

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

  return action$.pipe(
    ofType(actions.youtubeSearchList.YOUTUBE_SEARCH_LIST_QUERY),
    switchMap(actionObservable),
    switchMap((value: IActionYoutubeSearchList) => {
      if (
        state$ !== undefined &&
        state$.value.inlineQuery.query !== undefined
      ) {
        return transformObservableToAnswerInlineQuery(state$, value);
      } else {
        if (
          state$ !== undefined &&
          state$.value.message.query !== undefined &&
          state$.value.message.query.message !== undefined
        ) {
          return transformObservableToSendMessage(state$, value);
        }
        return transformObservableToEditMessageText(state$, value);
      }
    })
  );
};

export { youtubeSearchList };
