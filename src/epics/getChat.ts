import { ofType, StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { IActionGetChat } from "../../types/iActionGetChat";
import { IDependencies } from "../../types/iDependencies";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import { IChat } from "../../types/telegramBot/types/iChat";
import * as actions from "../actions";
import { filterAsync } from "../libs/filterAsync";

const getChat: (
  action$: Observable<IActionGetChat>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => Observable<IActionGetChat> = (
  action$: Observable<IActionGetChat>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
): Observable<IActionGetChat> => {
  const { authorization, botToken, locales, requestsObservable } = dependencies;

  const actionObservable: (
    action: IActionGetChat
  ) => Observable<IActionGetChat> = (
    action: IActionGetChat
  ): Observable<IActionGetChat> => {
    if (action.getChat.query === undefined) {
      return of(
        actions.getChat.error({
          error: new Error(locales.find("actionGetChatQueryUndefined"))
        })
      );
    }

    return requestsObservable<IResponse>(
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
              result: response.result as IChat
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
    filterAsync((action: IActionGetChat, index: number) =>
      authorization(state$, dependencies, action, index)
    ),
    switchMap(actionObservable)
  );
};

export { getChat };
