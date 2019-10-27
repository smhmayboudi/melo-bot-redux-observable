import { ofType, StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { IActionUnpinChatMessage } from "../../types/iActionUnpinChatMessage";
import { IDependencies } from "../../types/iDependencies";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import * as actions from "../actions";
import * as texts from "../configs/texts";

const unpinChatMessage: (
  action$: Observable<IActionUnpinChatMessage>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => Observable<IActionUnpinChatMessage> = (
  action$: Observable<IActionUnpinChatMessage>,
  _state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
): Observable<IActionUnpinChatMessage> => {
  const { botToken, requestsObservable } = dependencies;

  const actionObservable: (
    action: IActionUnpinChatMessage
  ) => Observable<IActionUnpinChatMessage> = (
    action: IActionUnpinChatMessage
  ): Observable<IActionUnpinChatMessage> => {
    if (botToken === undefined) {
      return of(
        actions.unpinChatMessage.error({
          error: new Error(texts.epicDependencyBotTokenUndefined)
        })
      );
    }
    if (requestsObservable === undefined) {
      return of(
        actions.unpinChatMessage.error({
          error: new Error(texts.epicDependencyRequestsObservableUndefined)
        })
      );
    }
    if (action.unpinChatMessage.query === undefined) {
      return of(
        actions.unpinChatMessage.error({
          error: new Error(texts.actionUnpinChatMessageQueryUndefined)
        })
      );
    }

    return requestsObservable(
      {
        host: "api.telegram.org",
        method: "POST",
        path: `/bot${botToken}/unpinChatMessage`
      },
      action.unpinChatMessage.query
    ).pipe(
      map(
        (response: IResponse): IActionUnpinChatMessage => {
          if (response.ok) {
            return actions.unpinChatMessage.result({
              // TODO: check it
              result: response.result as boolean
            });
          }

          return actions.unpinChatMessage.error({
            error: response
          });
        }
      ),
      catchError((error: any) =>
        of(
          actions.unpinChatMessage.error({
            error
          })
        )
      )
    );
  };

  return action$.pipe(
    ofType(actions.unpinChatMessage.UNPIN_CHAT_MESSAGE_QUERY),
    switchMap(actionObservable)
  );
};

export { unpinChatMessage };
