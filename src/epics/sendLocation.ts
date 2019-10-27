import { ofType, StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { IActionSendLocation } from "../../types/iActionSendLocation";
import { IDependencies } from "../../types/iDependencies";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import * as actions from "../actions";
import * as texts from "../configs/texts";

const sendLocation: (
  action$: Observable<IActionSendLocation>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => Observable<IActionSendLocation> = (
  action$: Observable<IActionSendLocation>,
  _state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
): Observable<IActionSendLocation> => {
  const { botToken, requestsObservable } = dependencies;

  const actionObservable: (
    action: IActionSendLocation
  ) => Observable<IActionSendLocation> = (
    action: IActionSendLocation
  ): Observable<IActionSendLocation> => {
    if (botToken === undefined) {
      return of(
        actions.sendLocation.error({
          error: new Error(texts.epicDependencyBotTokenUndefined)
        })
      );
    }
    if (requestsObservable === undefined) {
      return of(
        actions.sendLocation.error({
          error: new Error(texts.epicDependencyRequestsObservableUndefined)
        })
      );
    }
    if (action.sendLocation.query === undefined) {
      return of(
        actions.sendLocation.error({
          error: new Error(texts.actionSendLocationQueryUndefined)
        })
      );
    }

    return requestsObservable(
      {
        host: "api.telegram.org",
        method: "POST",
        path: `/bot${botToken}/sendLocation`
      },
      action.sendLocation.query
    ).pipe(
      map(
        (response: IResponse): IActionSendLocation => {
          if (response.ok) {
            return actions.sendLocation.result({
              // TODO: check it
              result: response.result as boolean
            });
          }

          return actions.sendLocation.error({
            error: response
          });
        }
      ),
      catchError((error: any) =>
        of(
          actions.sendLocation.error({
            error
          })
        )
      )
    );
  };

  return action$.pipe(
    ofType(actions.sendLocation.SEND_LOCATION_QUERY),
    switchMap(actionObservable)
  );
};

export { sendLocation };
