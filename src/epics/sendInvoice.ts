import { ofType, StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { IActionSendInvoice } from "../../types/iActionSendInvoice";
import { IDependencies } from "../../types/iDependencies";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import { IMessage } from "../../types/telegramBot/types/iMessage";
import * as actions from "../actions";
import { filterAsync } from "../libs/filterAsync";

const sendInvoice: (
  action$: Observable<IActionSendInvoice>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => Observable<IActionSendInvoice> = (
  action$: Observable<IActionSendInvoice>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
): Observable<IActionSendInvoice> => {
  const { authorization, botToken, locales, requestsObservable } = dependencies;

  const actionObservable: (
    action: IActionSendInvoice
  ) => Observable<IActionSendInvoice> = (
    action: IActionSendInvoice
  ): Observable<IActionSendInvoice> => {
    if (action.sendInvoice.query === undefined) {
      return of(
        actions.sendInvoice.error({
          error: new Error(locales.find("actionSendInvoiceQueryUndefined"))
        })
      );
    }

    return requestsObservable<IResponse>(
      {
        host: "api.telegram.org",
        method: "POST",
        path: `/bot${botToken}/sendInvoice`
      },
      action.sendInvoice.query
    ).pipe(
      map(
        (response: IResponse): IActionSendInvoice => {
          if (response.ok) {
            return actions.sendInvoice.result({
              result: response.result as IMessage
            });
          }

          return actions.sendInvoice.error({
            error: response
          });
        }
      ),
      catchError((error: any) =>
        of(
          actions.sendInvoice.error({
            error
          })
        )
      )
    );
  };

  return action$.pipe(
    ofType(actions.sendInvoice.SEND_INVOICE_QUERY),
    filterAsync((action: IActionSendInvoice, index: number) =>
      authorization(state$, dependencies, action, index)
    ),
    switchMap(actionObservable)
  );
};

export { sendInvoice };
