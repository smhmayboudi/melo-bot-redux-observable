import { ofType, StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { IActionForwardMessage } from "../../types/iActionForwardMessage";
import { IDependencies } from "../../types/iDependencies";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import { IMessage } from "../../types/telegramBot/types/iMessage";
import * as actions from "../actions";

const forwardMessage: (
  action$: Observable<IActionForwardMessage>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => Observable<IActionForwardMessage> = (
  action$: Observable<IActionForwardMessage>,
  _state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
): Observable<IActionForwardMessage> => {
  const { botToken, locales, requestsObservable } = dependencies;

  const actionObservable: (
    action: IActionForwardMessage
  ) => Observable<IActionForwardMessage> = (
    action: IActionForwardMessage
  ): Observable<IActionForwardMessage> => {
    if (action.forwardMessage.query === undefined) {
      return of(
        actions.forwardMessage.error({
          error: new Error(locales.find("actionForwardMessageQueryUndefined"))
        })
      );
    }

    return requestsObservable<IResponse>(
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
              result: response.result as IMessage
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
