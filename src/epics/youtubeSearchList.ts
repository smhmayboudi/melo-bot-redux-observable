import { youtube_v3 } from "googleapis";
import * as querystring from "querystring";
import { ofType, StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { IActionYoutubeSearchList } from "../../types/iActionYoutubeSearchList";
import { IDependencies } from "../../types/iDependencies";
import { IError } from "../../types/iError";
import { IState } from "../../types/iState";
import * as actions from "../actions";
import { filterAsync } from "../libs/filterAsync";

const youtubeSearchList: (
  action$: Observable<IActionYoutubeSearchList>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => Observable<IActionYoutubeSearchList> = (
  action$: Observable<IActionYoutubeSearchList>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
): Observable<IActionYoutubeSearchList> => {
  const { authorization, locales, requestsObservable } = dependencies;

  const actionObservable: (
    action: IActionYoutubeSearchList
  ) => Observable<IActionYoutubeSearchList> = (
    action: IActionYoutubeSearchList
  ): Observable<IActionYoutubeSearchList> => {
    if (action.youtubeSearchList.query === undefined) {
      return of(
        actions.youtubeSearchList.error({
          error: new Error(
            locales.find("actionYoutubeSearchListQueryUndefined")
          )
        })
      );
    }

    return requestsObservable<youtube_v3.Schema$SearchListResponse>({
      host: "www.googleapis.com",
      path: `/youtube/v3/search?${querystring.stringify(
        action.youtubeSearchList.query
      )}`
    }).pipe(
      map(
        (
          result: youtube_v3.Schema$SearchListResponse | IError
        ): IActionYoutubeSearchList => {
          if ((result as IError).error === undefined) {
            return actions.youtubeSearchList.result({
              result: result as youtube_v3.Schema$SearchListResponse
            });
          }

          return actions.youtubeSearchList.error({
            error: (result as IError).error
          });
        }
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
    filterAsync((action: IActionYoutubeSearchList, index: number) =>
      authorization(action, state$, index)
    ),
    switchMap(actionObservable)
  );
};

export { youtubeSearchList };
