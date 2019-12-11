import { ofType, StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { IActionDeleteWebhook } from "../../types/iActionDeleteWebhook";
import { IDependencies } from "../../types/iDependencies";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import * as actions from "../actions";

const deleteWebhook: (
  action$: Observable<IActionDeleteWebhook>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => Observable<IActionDeleteWebhook> = (
  action$: Observable<IActionDeleteWebhook>,
  _state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
): Observable<IActionDeleteWebhook> => {
  const { botToken, locales, requestsObservable } = dependencies;

  const actionObservable: (
    action: IActionDeleteWebhook
  ) => Observable<IActionDeleteWebhook> = (
    action: IActionDeleteWebhook
  ): Observable<IActionDeleteWebhook> => {
    if (action.deleteWebhook.query === undefined) {
      return of(
        actions.deleteWebhook.error({
          error: new Error(locales.find("actionDeleteWebhookQueryUndefined"))
        })
      );
    }

    return requestsObservable<IResponse>(
      {
        host: "api.telegram.org",
        method: "POST",
        path: `/bot${botToken}/deleteWebhook`
      },
      action.deleteWebhook.query
    ).pipe(
      map(
        (response: IResponse): IActionDeleteWebhook => {
          if (response.ok) {
            return actions.deleteWebhook.result({
              result: response.result as boolean
            });
          }

          return actions.deleteWebhook.error({
            error: response
          });
        }
      ),
      catchError((error: any) =>
        of(
          actions.deleteWebhook.error({
            error
          })
        )
      )
    );
  };

  return action$.pipe(
    ofType(actions.deleteWebhook.DELETE_WEBHOOK_QUERY),
    switchMap(actionObservable)
  );
};

export { deleteWebhook };
