import { ofType, StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { IActionPinChatMessage } from "../../types/iActionPinChatMessage";
import { IDependencies } from "../../types/iDependencies";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import * as actions from "../actions";
import * as texts from "../configs/texts";

const pinChatMessage: (
  action$: Observable<IActionPinChatMessage>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => Observable<IActionPinChatMessage> = (
  action$: Observable<IActionPinChatMessage>,
  _state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
): Observable<IActionPinChatMessage> => {
  const { botToken, requestsObservable } = dependencies;

  const actionObservable: (
    action: IActionPinChatMessage
  ) => Observable<IActionPinChatMessage> = (
    action: IActionPinChatMessage
  ): Observable<IActionPinChatMessage> => {
    if (botToken === undefined) {
      return of(
        actions.pinChatMessage.error({
          error: new Error(texts.epicDependencyBotTokenUndefined)
        })
      );
    }
    if (requestsObservable === undefined) {
      return of(
        actions.pinChatMessage.error({
          error: new Error(texts.epicDependencyRequestsObservableUndefined)
        })
      );
    }
    if (action.pinChatMessage.query === undefined) {
      return of(
        actions.pinChatMessage.error({
          error: new Error(texts.actionPinChatMessageQueryUndefined)
        })
      );
    }

    return requestsObservable(
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
              // TODO: check it
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