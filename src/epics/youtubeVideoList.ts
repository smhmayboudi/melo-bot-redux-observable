import { youtube_v3 } from "googleapis";
import * as querystring from "querystring";
import { ofType, StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { IActionYoutubeVideoList } from "../../types/iActionYoutubeVideoList";
import { IDependencies } from "../../types/iDependencies";
import { IError } from "../../types/iError";
import { IState } from "../../types/iState";
import * as actions from "../actions";
import * as texts from "../configs/texts";

const youtubeVideoList: (
  action$: Observable<IActionYoutubeVideoList>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => Observable<IActionYoutubeVideoList> = (
  action$: Observable<IActionYoutubeVideoList>,
  _state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
): Observable<IActionYoutubeVideoList> => {
  const { requestsObservable } = dependencies;

  const actionObservable: (
    action: IActionYoutubeVideoList
  ) => Observable<IActionYoutubeVideoList> = (
    action: IActionYoutubeVideoList
  ): Observable<IActionYoutubeVideoList> => {
    if (action.youtubeVideoList.query === undefined) {
      return of(
        actions.youtubeVideoList.error({
          error: new Error(texts.actionYoutubeVideoListQueryUndefined)
        })
      );
    }

    return requestsObservable<youtube_v3.Schema$VideoListResponse>({
      host: "www.googleapis.com",
      path: `/youtube/v3/videos?${querystring.stringify(
        action.youtubeVideoList.query
      )}`
    }).pipe(
      map(
        (
          result: youtube_v3.Schema$VideoListResponse | IError
        ): IActionYoutubeVideoList => {
          if ((result as IError).error === undefined) {
            return actions.youtubeVideoList.result({
              result: result as youtube_v3.Schema$VideoListResponse
            });
          }

          return actions.youtubeVideoList.error({
            error: result
          });
        }
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
    switchMap(actionObservable)
  );
};

export { youtubeVideoList };
