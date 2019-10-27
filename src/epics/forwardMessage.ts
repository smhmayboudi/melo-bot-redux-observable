import { ofType, StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { IActionForwardMessage } from "../../types/iActionForwardMessage";
import { IDependencies } from "../../types/iDependencies";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import * as actions from "../actions";
import * as texts from "../configs/texts";

const forwardMessage: (
  action$: Observable<IActionForwardMessage>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => Observable<IActionForwardMessage> = (
  action$: Observable<IActionForwardMessage>,
  _state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
): Observable<IActionForwardMessage> => {
  const { botToken, requestsObservable } = dependencies;

  const actionObservable: (
    action: IActionForwardMessage
  ) => Observable<IActionForwardMessage> = (
    action: IActionForwardMessage
  ): Observable<IActionForwardMessage> => {
    if (botToken === undefined) {
      return of(
        actions.forwardMessage.error({
          error: new Error(texts.epicDependencyBotTokenUndefined)
        })
      );
    }
    if (requestsObservable === undefined) {
      return of(
        actions.forwardMessage.error({
          error: new Error(texts.epicDependencyRequestsObservableUndefined)
        })
      );
    }
    if (action.forwardMessage.query === undefined) {
      return of(
        actions.forwardMessage.error({
          error: new Error(texts.actionForwardMessageQueryUndefined)
        })
      );
    }

    return requestsObservable(
      {
        host: "api.telegram.org",
        method: "POST",
        path: `/bot${botToken}/forwardMessage`
      },
      action.forwardMessage.query
    ).pipe(
      map(
        (response: IResponse): IActionForwardMessage => {
          if (response.ok) {
            return actions.forwardMessage.result({
              // TODO: check it
              result: response.result as boolean
            });
          }

          return actions.forwardMessage.error({
            error: response
          });
        }
      ),
      catchError((error: any) =>
        of(
          actions.forwardMessage.error({
            error
          })
        )
      )
    );
  };

  return action$.pipe(
    ofType(actions.forwardMessage.FORWARD_MESSAGE_QUERY),
    switchMap(actionObservable)
  );
};

export { forwardMessage };
