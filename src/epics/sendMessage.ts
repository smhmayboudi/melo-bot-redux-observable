import { ofType, StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { IActionSendMessage } from "../../types/iActionSendMessage";
import { IDependencies } from "../../types/iDependencies";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import { IMessage } from "../../types/telegramBot/types/iMessage";
import * as actions from "../actions";
import * as texts from "../configs/texts";

const sendMessage: (
  action$: Observable<IActionSendMessage>,
  _state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => Observable<IActionSendMessage> = (
  action$: Observable<IActionSendMessage>,
  _state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
): Observable<IActionSendMessage> => {
  const { botToken, requestsObservable } = dependencies;

  const actionObservable: (
    action: IActionSendMessage
  ) => Observable<IActionSendMessage> = (
    action: IActionSendMessage
  ): Observable<IActionSendMessage> => {
    if (botToken === undefined) {
      return of(
        actions.sendMessage.error({
          error: new Error(texts.epicDependencyBotTokenUndefined)
        })
      );
    }
    if (requestsObservable === undefined) {
      return of(
        actions.sendMessage.error({
          error: new Error(texts.epicDependencyRequestsObservableUndefined)
        })
      );
    }
    if (action.sendMessage.query === undefined) {
      return of(
        actions.sendMessage.error({
          error: new Error(texts.actionSendMessageQueryUndefined)
        })
      );
    }

    return requestsObservable(
      {
        host: "api.telegram.org",
        method: "POST",
        path: `/bot${botToken}/sendMessage`
      },
      action.sendMessage.query
    ).pipe(
      map(
        (response: IResponse): IActionSendMessage => {
          if (response.ok && response.result !== undefined) {
            return actions.sendMessage.result({
              result: response.result as IMessage
            });
          }

          return actions.sendMessage.error({
            error: response
          });
        }
      ),
      catchError((error: any) =>
        of(
          actions.sendMessage.error({
            error
          })
        )
      )
    );
  };

  return action$.pipe(
    ofType(actions.sendMessage.SEND_MESSAGE_QUERY),
    switchMap(actionObservable)
  );
};

export { sendMessage };
