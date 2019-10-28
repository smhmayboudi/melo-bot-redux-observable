import { ofType, StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { IActionSendChatAction } from "../../types/iActionSendChatAction";
import { IDependencies } from "../../types/iDependencies";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import * as actions from "../actions";
import * as texts from "../configs/texts";

const sendChatAction: (
  action$: Observable<IActionSendChatAction>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => Observable<IActionSendChatAction> = (
  action$: Observable<IActionSendChatAction>,
  _state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
): Observable<IActionSendChatAction> => {
  const { botToken, requestsObservable } = dependencies;

  const actionObservable: (
    action: IActionSendChatAction
  ) => Observable<IActionSendChatAction> = (
    action: IActionSendChatAction
  ): Observable<IActionSendChatAction> => {
    if (botToken === undefined) {
      return of(
        actions.sendChatAction.error({
          error: new Error(texts.epicDependencyBotTokenUndefined)
        })
      );
    }
    if (requestsObservable === undefined) {
      return of(
        actions.sendChatAction.error({
          error: new Error(texts.epicDependencyRequestsObservableUndefined)
        })
      );
    }
    if (action.sendChatAction.query === undefined) {
      return of(
        actions.sendChatAction.error({
          error: new Error(texts.actionSendChatActionQueryUndefined)
        })
      );
    }

    return requestsObservable(
      {
        host: "api.telegram.org",
        method: "POST",
        path: `/bot${botToken}/sendChatAction`
      },
      action.sendChatAction.query
    ).pipe(
      map(
        (response: IResponse): IActionSendChatAction => {
          if (response.ok) {
            return actions.sendChatAction.result({
              // TODO: check it
              result: response.result as boolean
            });
          }

          return actions.sendChatAction.error({
            error: response
          });
        }
      ),
      catchError((error: any) =>
        of(
          actions.sendChatAction.error({
            error
          })
        )
      )
    );
  };

  return action$.pipe(
    ofType(actions.sendChatAction.SEND_CHAT_ACTION_QUERY),
    switchMap(actionObservable)
  );
};

export { sendChatAction };