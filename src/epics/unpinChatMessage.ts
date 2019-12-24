import { ofType, StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { IActionUnpinChatMessage } from "../../types/iActionUnpinChatMessage";
import { IDependencies } from "../../types/iDependencies";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import * as actions from "../actions";
import { filterAsync } from "../libs/filterAsync";

const unpinChatMessage: (
  action$: Observable<IActionUnpinChatMessage>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => Observable<IActionUnpinChatMessage> = (
  action$: Observable<IActionUnpinChatMessage>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
): Observable<IActionUnpinChatMessage> => {
  const { authorization, botToken, locales, requestsObservable } = dependencies;

  const actionObservable: (
    action: IActionUnpinChatMessage
  ) => Observable<IActionUnpinChatMessage> = (
    action: IActionUnpinChatMessage
  ): Observable<IActionUnpinChatMessage> => {
    if (action.unpinChatMessage.query === undefined) {
      return of(
        actions.unpinChatMessage.error({
          error: new Error(locales.find("actionUnpinChatMessageQueryUndefined"))
        })
      );
    }

    return requestsObservable<IResponse>(
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
    filterAsync((action: IActionUnpinChatMessage, index: number) =>
      authorization(action, state$, index)
    ),
    switchMap(actionObservable)
  );
};

export { unpinChatMessage };
