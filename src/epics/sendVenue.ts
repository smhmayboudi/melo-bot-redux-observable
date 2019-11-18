import { ofType, StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { IActionSendVenue } from "../../types/iActionSendVenue";
import { IDependencies } from "../../types/iDependencies";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import { IMessage } from "../../types/telegramBot/types/iMessage";
import * as actions from "../actions";
import * as texts from "../configs/texts";

const sendVenue: (
  action$: Observable<IActionSendVenue>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => Observable<IActionSendVenue> = (
  action$: Observable<IActionSendVenue>,
  _state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
): Observable<IActionSendVenue> => {
  const { botToken, requestsObservable } = dependencies;

  const actionObservable: (
    action: IActionSendVenue
  ) => Observable<IActionSendVenue> = (
    action: IActionSendVenue
  ): Observable<IActionSendVenue> => {
    if (action.sendVenue.query === undefined) {
      return of(
        actions.sendVenue.error({
          error: new Error(texts.actionSendVenueQueryUndefined)
        })
      );
    }

    return requestsObservable<IResponse>(
      {
        host: "api.telegram.org",
        method: "POST",
        path: `/bot${botToken}/sendVenue`
      },
      action.sendVenue.query
    ).pipe(
      map(
        (response: IResponse): IActionSendVenue => {
          if (response.ok) {
            return actions.sendVenue.result({
              result: response.result as IMessage
            });
          }

          return actions.sendVenue.error({
            error: response
          });
        }
      ),
      catchError((error: any) =>
        of(
          actions.sendVenue.error({
            error
          })
        )
      )
    );
  };

  return action$.pipe(
    ofType(actions.sendVenue.SEND_VENUE_QUERY),
    switchMap(actionObservable)
  );
};

export { sendVenue };
