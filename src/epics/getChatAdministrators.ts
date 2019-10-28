import { ofType, StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { IActionGetChatAdministrators } from "../../types/iActionGetChatAdministrators";
import { IDependencies } from "../../types/iDependencies";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import * as actions from "../actions";
import * as texts from "../configs/texts";

const getChatAdministrators: (
  action$: Observable<IActionGetChatAdministrators>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => Observable<IActionGetChatAdministrators> = (
  action$: Observable<IActionGetChatAdministrators>,
  _state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
): Observable<IActionGetChatAdministrators> => {
  const { botToken, requestsObservable } = dependencies;

  const actionObservable: (
    action: IActionGetChatAdministrators
  ) => Observable<IActionGetChatAdministrators> = (
    action: IActionGetChatAdministrators
  ): Observable<IActionGetChatAdministrators> => {
    if (botToken === undefined) {
      return of(
        actions.getChatAdministrators.error({
          error: new Error(texts.epicDependencyBotTokenUndefined)
        })
      );
    }
    if (requestsObservable === undefined) {
      return of(
        actions.getChatAdministrators.error({
          error: new Error(texts.epicDependencyRequestsObservableUndefined)
        })
      );
    }
    if (action.getChatAdministrators.query === undefined) {
      return of(
        actions.getChatAdministrators.error({
          error: new Error(texts.actionGetChatAdministratorsQueryUndefined)
        })
      );
    }

    return requestsObservable(
      {
        host: "api.telegram.org",
        method: "POST",
        path: `/bot${botToken}/getChatAdministrators`
      },
      action.getChatAdministrators.query
    ).pipe(
      map(
        (response: IResponse): IActionGetChatAdministrators => {
          if (response.ok) {
            return actions.getChatAdministrators.result({
              // TODO: check it
              result: response.result as boolean
            });
          }

          return actions.getChatAdministrators.error({
            error: response
          });
        }
      ),
      catchError((error: any) =>
        of(
          actions.getChatAdministrators.error({
            error
          })
        )
      )
    );
  };

  return action$.pipe(
    ofType(actions.getChatAdministrators.GET_CHAT_ADMINISTRATORS_QUERY),
    switchMap(actionObservable)
  );
};

export { getChatAdministrators };