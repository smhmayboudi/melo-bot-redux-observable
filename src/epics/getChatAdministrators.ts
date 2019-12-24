import { ofType, StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { IActionGetChatAdministrators } from "../../types/iActionGetChatAdministrators";
import { IDependencies } from "../../types/iDependencies";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import { IChatMember } from "../../types/telegramBot/types/iChatMember";
import * as actions from "../actions";
import { filterAsync } from "../libs/filterAsync";

const getChatAdministrators: (
  action$: Observable<IActionGetChatAdministrators>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => Observable<IActionGetChatAdministrators> = (
  action$: Observable<IActionGetChatAdministrators>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
): Observable<IActionGetChatAdministrators> => {
  const { authorization, botToken, locales, requestsObservable } = dependencies;

  const actionObservable: (
    action: IActionGetChatAdministrators
  ) => Observable<IActionGetChatAdministrators> = (
    action: IActionGetChatAdministrators
  ): Observable<IActionGetChatAdministrators> => {
    if (action.getChatAdministrators.query === undefined) {
      return of(
        actions.getChatAdministrators.error({
          error: new Error(
            locales.find("actionGetChatAdministratorsQueryUndefined")
          )
        })
      );
    }

    return requestsObservable<IResponse>(
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
              result: response.result as IChatMember[]
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
    filterAsync((action: IActionGetChatAdministrators, index: number) =>
      authorization(action, state$, index)
    ),
    switchMap(actionObservable)
  );
};

export { getChatAdministrators };
