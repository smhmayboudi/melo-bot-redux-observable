import { ofType, StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { IActionGetUserProfilePhotos } from "../../types/iActionGetUserProfilePhotos";
import { IDependencies } from "../../types/iDependencies";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import { IUserProfilePhotos } from "../../types/telegramBot/types/iUserProfilePhotos";
import * as actions from "../actions";
import { filterAsync } from "../libs/filterAsync";

const getUserProfilePhotos: (
  action$: Observable<IActionGetUserProfilePhotos>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => Observable<IActionGetUserProfilePhotos> = (
  action$: Observable<IActionGetUserProfilePhotos>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
): Observable<IActionGetUserProfilePhotos> => {
  const { authorization, botToken, locales, requestsObservable } = dependencies;

  const actionObservable: (
    action: IActionGetUserProfilePhotos
  ) => Observable<IActionGetUserProfilePhotos> = (
    action: IActionGetUserProfilePhotos
  ): Observable<IActionGetUserProfilePhotos> => {
    if (action.getUserProfilePhotos.query === undefined) {
      return of(
        actions.getUserProfilePhotos.error({
          error: new Error(
            locales.find("actionGetUserProfilePhotosQueryUndefined")
          )
        })
      );
    }

    return requestsObservable<IResponse>(
      {
        host: "api.telegram.org",
        method: "POST",
        path: `/bot${botToken}/getUserProfilePhotos`
      },
      action.getUserProfilePhotos.query
    ).pipe(
      map(
        (response: IResponse): IActionGetUserProfilePhotos => {
          if (response.ok) {
            return actions.getUserProfilePhotos.result({
              result: response.result as IUserProfilePhotos
            });
          }

          return actions.getUserProfilePhotos.error({
            error: response
          });
        }
      ),
      catchError((error: any) =>
        of(
          actions.getUserProfilePhotos.error({
            error
          })
        )
      )
    );
  };

  return action$.pipe(
    ofType(actions.getUserProfilePhotos.GET_USER_PROFILE_PHOTOS_QUERY),
    filterAsync((action: IActionGetUserProfilePhotos, index: number) =>
      authorization(action, state$, index)
    ),
    switchMap(actionObservable)
  );
};

export { getUserProfilePhotos };
