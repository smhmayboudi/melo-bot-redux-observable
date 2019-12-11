import { ofType, StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { IActionPinChatMessage } from "../../types/iActionPinChatMessage";
import { IDependencies } from "../../types/iDependencies";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import * as actions from "../actions";

const pinChatMessage: (
  action$: Observable<IActionPinChatMessage>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => Observable<IActionPinChatMessage> = (
  action$: Observable<IActionPinChatMessage>,
  _state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
): Observable<IActionPinChatMessage> => {
  const { botToken, locales, requestsObservable } = dependencies;

  const actionObservable: (
    action: IActionPinChatMessage
  ) => Observable<IActionPinChatMessage> = (
    action: IActionPinChatMessage
  ): Observable<IActionPinChatMessage> => {
    if (action.pinChatMessage.query === undefined) {
      return of(
        actions.pinChatMessage.error({
          error: new Error(locales.find("actionPinChatMessageQueryUndefined"))
        })
      );
    }

    return requestsObservable<IResponse>(
      {
        host: "api.telegram.org",
        method: "POST",
        path: `/bot${botToken}/pinChatMessage`
      },
      action.pinChatMessage.query
    ).pipe(
      map(
        (response: IResponse): IActionPinChatMessage => {
          if (response.ok) {
            return actions.pinChatMessage.result({
              result: response.result as boolean
            });
          }

          return actions.pinChatMessage.error({
            error: response
          });
        }
      ),
      catchError((error: any) =>
        of(
          actions.pinChatMessage.error({
            error
          })
        )
      )
    );
  };

  return action$.pipe(
    ofType(actions.pinChatMessage.PIN_CHAT_MESSAGE_QUERY),
    switchMap(actionObservable)
  );
};

export { pinChatMessage };
