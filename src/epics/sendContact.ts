import { ofType, StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { IActionSendContact } from "../../types/iActionSendContact";
import { IDependencies } from "../../types/iDependencies";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import { IMessage } from "../../types/telegramBot/types/iMessage";
import * as actions from "../actions";
import { filterAsync } from "../libs/filterAsync";

const sendContact: (
  action$: Observable<IActionSendContact>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => Observable<IActionSendContact> = (
  action$: Observable<IActionSendContact>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
): Observable<IActionSendContact> => {
  const { authorization, botToken, locales, requestsObservable } = dependencies;

  const actionObservable: (
    action: IActionSendContact
  ) => Observable<IActionSendContact> = (
    action: IActionSendContact
  ): Observable<IActionSendContact> => {
    if (action.sendContact.query === undefined) {
      return of(
        actions.sendContact.error({
          error: new Error(locales.find("actionSendContactQueryUndefined"))
        })
      );
    }

    return requestsObservable<IResponse>(
      {
        host: "api.telegram.org",
        method: "POST",
        path: `/bot${botToken}/sendContact`
      },
      action.sendContact.query
    ).pipe(
      map(
        (response: IResponse): IActionSendContact => {
          if (response.ok) {
            return actions.sendContact.result({
              result: response.result as IMessage
            });
          }

          return actions.sendContact.error({
            error: response
          });
        }
      ),
      catchError((error: any) =>
        of(
          actions.sendContact.error({
            error
          })
        )
      )
    );
  };

  return action$.pipe(
    ofType(actions.sendContact.SEND_CONTACT_QUERY),
    filterAsync((action: IActionSendContact, index: number) =>
      authorization(action, state$, index)
    ),
    switchMap(actionObservable)
  );
};

export { sendContact };
