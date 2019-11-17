import { ofType, StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { IActionGetWebhookInfo } from "../../types/iActionGetWebhookInfo";
import { IDependencies } from "../../types/iDependencies";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import { IWebhookInfo } from "../../types/telegramBot/updates/iWebhookInfo";
import * as actions from "../actions";
import * as texts from "../configs/texts";

const getWebhookInfo: (
  action$: Observable<IActionGetWebhookInfo>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => Observable<IActionGetWebhookInfo> = (
  action$: Observable<IActionGetWebhookInfo>,
  _state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
): Observable<IActionGetWebhookInfo> => {
  const { botToken, requestsObservable } = dependencies;

  const actionObservable: (
    action: IActionGetWebhookInfo
  ) => Observable<IActionGetWebhookInfo> = (
    action: IActionGetWebhookInfo
  ): Observable<IActionGetWebhookInfo> => {
    if (botToken === undefined) {
      return of(
        actions.getWebhookInfo.error({
          error: new Error(texts.epicDependencyBotTokenUndefined)
        })
      );
    }
    if (requestsObservable === undefined) {
      return of(
        actions.getWebhookInfo.error({
          error: new Error(texts.epicDependencyRequestsObservableUndefined)
        })
      );
    }
    if (action.getWebhookInfo.query === undefined) {
      return of(
        actions.getWebhookInfo.error({
          error: new Error(texts.actionGetWebhookInfoQueryUndefined)
        })
      );
    }

    return requestsObservable<IResponse>(
      {
        host: "api.telegram.org",
        method: "POST",
        path: `/bot${botToken}/getWebhookInfo`
      },
      action.getWebhookInfo.query
    ).pipe(
      map(
        (response: IResponse): IActionGetWebhookInfo => {
          if (response.ok) {
            return actions.getWebhookInfo.result({
              result: response.result as IWebhookInfo
            });
          }

          return actions.getWebhookInfo.error({
            error: response
          });
        }
      ),
      catchError((error: any) =>
        of(
          actions.getWebhookInfo.error({
            error
          })
        )
      )
    );
  };

  return action$.pipe(
    ofType(actions.getWebhookInfo.GET_WEBHOOK_INFO_QUERY),
    switchMap(actionObservable)
  );
};

export { getWebhookInfo };
