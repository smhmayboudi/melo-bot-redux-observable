import { ofType, StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { IActionSetChatPhoto } from "../../types/iActionSetChatPhoto";
import { IDependencies } from "../../types/iDependencies";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import * as actions from "../actions";
import { filterAsync } from "../libs/filterAsync";

const setChatPhoto: (
  action$: Observable<IActionSetChatPhoto>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => Observable<IActionSetChatPhoto> = (
  action$: Observable<IActionSetChatPhoto>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
): Observable<IActionSetChatPhoto> => {
  const { authorization, botToken, locales, requestsObservable } = dependencies;

  const actionObservable: (
    action: IActionSetChatPhoto
  ) => Observable<IActionSetChatPhoto> = (
    action: IActionSetChatPhoto
  ): Observable<IActionSetChatPhoto> => {
    if (action.setChatPhoto.query === undefined) {
      return of(
        actions.setChatPhoto.error({
          error: new Error(locales.find("actionSetChatPhotoQueryUndefined"))
        })
      );
    }

    return requestsObservable<IResponse>(
      {
        host: "api.telegram.org",
        method: "POST",
        path: `/bot${botToken}/setChatPhoto`
      },
      action.setChatPhoto.query
    ).pipe(
      map(
        (response: IResponse): IActionSetChatPhoto => {
          if (response.ok) {
            return actions.setChatPhoto.result({
              result: response.result as boolean
            });
          }

          return actions.setChatPhoto.error({
            error: response
          });
        }
      ),
      catchError((error: any) =>
        of(
          actions.setChatPhoto.error({
            error
          })
        )
      )
    );
  };

  return action$.pipe(
    ofType(actions.setChatPhoto.SET_CHAT_PHOTO_QUERY),
    filterAsync((action: IActionSetChatPhoto, index: number) =>
      authorization(state$, dependencies, action, index)
    ),
    switchMap(actionObservable)
  );
};

export { setChatPhoto };
