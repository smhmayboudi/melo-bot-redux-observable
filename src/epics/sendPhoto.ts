import { ofType, StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { IActionSendPhoto } from "../../types/iActionSendPhoto";
import { IDependencies } from "../../types/iDependencies";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import * as actions from "../actions";
import * as texts from "../configs/texts";

const sendPhoto: (
  action$: Observable<IActionSendPhoto>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => Observable<IActionSendPhoto> = (
  action$: Observable<IActionSendPhoto>,
  _state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
): Observable<IActionSendPhoto> => {
  const { botToken, requestsObservable } = dependencies;

  const actionObservable: (
    action: IActionSendPhoto
  ) => Observable<IActionSendPhoto> = (
    action: IActionSendPhoto
  ): Observable<IActionSendPhoto> => {
    if (botToken === undefined) {
      return of(
        actions.sendPhoto.error({
          error: new Error(texts.epicDependencyBotTokenUndefined)
        })
      );
    }
    if (requestsObservable === undefined) {
      return of(
        actions.sendPhoto.error({
          error: new Error(texts.epicDependencyRequestsObservableUndefined)
        })
      );
    }
    if (action.sendPhoto.query === undefined) {
      return of(
        actions.sendPhoto.error({
          error: new Error(texts.actionSendPhotoQueryUndefined)
        })
      );
    }

    return requestsObservable(
      {
        host: "api.telegram.org",
        method: "POST",
        path: `/bot${botToken}/sendPhoto`
      },
      action.sendPhoto.query
    ).pipe(
      map(
        (response: IResponse): IActionSendPhoto => {
          if (response.ok) {
            return actions.sendPhoto.result({
              // TODO: check it
              result: response.result as boolean
            });
          }

          return actions.sendPhoto.error({
            error: response
          });
        }
      ),
      catchError((error: any) =>
        of(
          actions.sendPhoto.error({
            error
          })
        )
      )
    );
  };

  return action$.pipe(
    ofType(actions.sendPhoto.SEND_PHOTO_QUERY),
    switchMap(actionObservable)
  );
};

export { sendPhoto };
