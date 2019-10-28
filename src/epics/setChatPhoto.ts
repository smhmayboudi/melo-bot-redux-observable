import { ofType, StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { IActionSetChatPhoto } from "../../types/iActionSetChatPhoto";
import { IDependencies } from "../../types/iDependencies";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import * as actions from "../actions";
import * as texts from "../configs/texts";

const setChatPhoto: (
  action$: Observable<IActionSetChatPhoto>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => Observable<IActionSetChatPhoto> = (
  action$: Observable<IActionSetChatPhoto>,
  _state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
): Observable<IActionSetChatPhoto> => {
  const { botToken, requestsObservable } = dependencies;

  const actionObservable: (
    action: IActionSetChatPhoto
  ) => Observable<IActionSetChatPhoto> = (
    action: IActionSetChatPhoto
  ): Observable<IActionSetChatPhoto> => {
    if (botToken === undefined) {
      return of(
        actions.setChatPhoto.error({
          error: new Error(texts.epicDependencyBotTokenUndefined)
        })
      );
    }
    if (requestsObservable === undefined) {
      return of(
        actions.setChatPhoto.error({
          error: new Error(texts.epicDependencyRequestsObservableUndefined)
        })
      );
    }
    if (action.setChatPhoto.query === undefined) {
      return of(
        actions.setChatPhoto.error({
          error: new Error(texts.actionSetChatPhotoQueryUndefined)
        })
      );
    }

    return requestsObservable(
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
    switchMap(actionObservable)
  );
};

export { setChatPhoto };
