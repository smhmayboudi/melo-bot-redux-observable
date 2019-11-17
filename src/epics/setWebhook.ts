import { ofType, StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { IActionSetWebhook } from "../../types/iActionSetWebhook";
import { IDependencies } from "../../types/iDependencies";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import * as actions from "../actions";
import * as texts from "../configs/texts";

const setWebhook: (
  action$: Observable<IActionSetWebhook>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => Observable<IActionSetWebhook> = (
  action$: Observable<IActionSetWebhook>,
  _state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
): Observable<IActionSetWebhook> => {
  const { botToken, requestsObservable } = dependencies;

  const actionObservable: (
    action: IActionSetWebhook
  ) => Observable<IActionSetWebhook> = (
    action: IActionSetWebhook
  ): Observable<IActionSetWebhook> => {
    if (botToken === undefined) {
      return of(
        actions.setWebhook.error({
          error: new Error(texts.epicDependencyBotTokenUndefined)
        })
      );
    }
    if (requestsObservable === undefined) {
      return of(
        actions.setWebhook.error({
          error: new Error(texts.epicDependencyRequestsObservableUndefined)
        })
      );
    }
    if (action.setWebhook.query === undefined) {
      return of(
        actions.setWebhook.error({
          error: new Error(texts.actionSetWebhookQueryUndefined)
        })
      );
    }

    return requestsObservable<IResponse>(
      {
        host: "api.telegram.org",
        method: "POST",
        path: `/bot${botToken}/setWebhook`
      },
      action.setWebhook.query
    ).pipe(
      map(
        (response: IResponse): IActionSetWebhook => {
          if (response.ok) {
            return actions.setWebhook.result({
              result: response.result as boolean
            });
          }

          return actions.setWebhook.error({
            error: response
          });
        }
      ),
      catchError((error: any) =>
        of(
          actions.setWebhook.error({
            error
          })
        )
      )
    );
  };

  return action$.pipe(
    ofType(actions.setWebhook.SET_WEBHOOK_QUERY),
    switchMap(actionObservable)
  );
};

export { setWebhook };
