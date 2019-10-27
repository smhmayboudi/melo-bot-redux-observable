import { ofType, StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { IActionGetChat } from "../../types/iActionGetChat";
import { IDependencies } from "../../types/iDependencies";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import * as actions from "../actions";
import * as texts from "../configs/texts";

const getChat: (
  action$: Observable<IActionGetChat>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => Observable<IActionGetChat> = (
  action$: Observable<IActionGetChat>,
  _state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
): Observable<IActionGetChat> => {
  const { botToken, requestsObservable } = dependencies;

  const actionObservable: (
    action: IActionGetChat
  ) => Observable<IActionGetChat> = (
    action: IActionGetChat
  ): Observable<IActionGetChat> => {
    if (botToken === undefined) {
      return of(
        actions.getChat.error({
          error: new Error(texts.epicDependencyBotTokenUndefined)
        })
      );
    }
    if (requestsObservable === undefined) {
      return of(
        actions.getChat.error({
          error: new Error(texts.epicDependencyRequestsObservableUndefined)
        })
      );
    }
    if (action.getChat.query === undefined) {
      return of(
        actions.getChat.error({
          error: new Error(texts.actionGetChatQueryUndefined)
        })
      );
    }

    return requestsObservable(
      {
        host: "api.telegram.org",
        method: "POST",
        path: `/bot${botToken}/getChat`
      },
      action.getChat.query
    ).pipe(
      map(
        (response: IResponse): IActionGetChat => {
          if (response.ok) {
            return actions.getChat.result({
              // TODO: check it
              result: response.result as boolean
            });
          }

          return actions.getChat.error({
            error: response
          });
        }
      ),
      catchError((error: any) =>
        of(
          actions.getChat.error({
            error
          })
        )
      )
    );
  };

  return action$.pipe(
    ofType(actions.getChat.GET_CHAT_QUERY),
    switchMap(actionObservable)
  );
};

export { getChat };
