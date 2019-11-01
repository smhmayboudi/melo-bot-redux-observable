import { youtube_v3 } from "googleapis";
import * as querystring from "querystring";
import { ofType, StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { IActionAnswerInlineQuery } from "../../types/iActionAnswerInlineQuery";
import { IActionEditMessageText } from "../../types/iActionEditMessageText";
import { IActionSendMessage } from "../../types/iActionSendMessage";
import { IActionYoutubeVideoList } from "../../types/iActionYoutubeVideoList";
import { IDependencies } from "../../types/iDependencies";
import { IState } from "../../types/iState";
import * as actions from "../actions";
import * as texts from "../configs/texts";

import { transformObservable as transformObservableToAnswerInlineQuery } from "./youtubeVideoListToAnswerInlineQuery";
import { transformObservable as transformObservableToEditMessageText } from "./youtubeVideoListToEditMessageText";
import { transformObservable as transformObservableToSendMessage } from "./youtubeVideoListToSendMessage";

const youtubeVideoList: (
  action$: Observable<IActionYoutubeVideoList>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => Observable<
  | IActionAnswerInlineQuery
  | IActionEditMessageText
  | IActionSendMessage
  | IActionYoutubeVideoList
> = (
  action$: Observable<IActionYoutubeVideoList>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
): Observable<
  | IActionAnswerInlineQuery
  | IActionEditMessageText
  | IActionSendMessage
  | IActionYoutubeVideoList
> => {
  const { requestsObservable } = dependencies;

  const actionObservable: (
    action: IActionYoutubeVideoList
  ) => Observable<IActionYoutubeVideoList> = (
    action: IActionYoutubeVideoList
  ): Observable<IActionYoutubeVideoList> => {
    if (requestsObservable === undefined) {
      return of(
        actions.youtubeVideoList.error({
          error: new Error(texts.epicDependencyRequestsObservableUndefined)
        })
      );
    }
    if (action.youtubeVideoList.query === undefined) {
      return of(
        actions.youtubeVideoList.error({
          error: new Error(texts.actionYoutubeVideoListQueryUndefined)
        })
      );
    }

    return requestsObservable({
      host: "www.googleapis.com",
      path: `/youtube/v3/videos?${querystring.stringify(
        action.youtubeVideoList.query
      )}`
    }).pipe(
      map(
        (
          result: youtube_v3.Schema$VideoListResponse
        ): IActionYoutubeVideoList =>
          actions.youtubeVideoList.result({
            result
          })
      ),
      catchError((error: any) =>
        of(
          actions.youtubeVideoList.error({
            error
          })
        )
      )
    );
  };

  return action$.pipe(
    ofType(actions.youtubeVideoList.YOUTUBE_VIDEO_LIST_QUERY),
    switchMap(actionObservable),
    switchMap((value: IActionYoutubeVideoList) => {
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

export { youtubeVideoList };
