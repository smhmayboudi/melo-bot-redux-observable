import { ofType, StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { IActionSendLocation } from "../../types/iActionSendLocation";
import { IDependencies } from "../../types/iDependencies";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import { IMessage } from "../../types/telegramBot/types/iMessage";
import * as actions from "../actions";
import { filterAsync } from "../libs/filterAsync";

const sendLocation: (
  action$: Observable<IActionSendLocation>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => Observable<IActionSendLocation> = (
  action$: Observable<IActionSendLocation>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
): Observable<IActionSendLocation> => {
  const { authorization, botToken, locales, requestsObservable } = dependencies;

  const actionObservable: (
    action: IActionSendLocation
  ) => Observable<IActionSendLocation> = (
    action: IActionSendLocation
  ): Observable<IActionSendLocation> => {
    if (action.sendLocation.query === undefined) {
      return of(
        actions.sendLocation.error({
          error: new Error(locales.find("actionSendLocationQueryUndefined"))
        })
      );
    }

    return requestsObservable<IResponse>(
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
              result: response.result as IMessage
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
    filterAsync((action: IActionSendLocation, index: number) =>
      authorization(action, state$, index)
    ),
    switchMap(actionObservable)
  );
};

export { sendLocation };
