import { ofType, StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { IActionGetChatMember } from "../../types/iActionGetChatMember";
import { IDependencies } from "../../types/iDependencies";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import { IChatMember } from "../../types/telegramBot/types/iChatMember";
import * as actions from "../actions";

const getChatMember: (
  action$: Observable<IActionGetChatMember>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => Observable<IActionGetChatMember> = (
  action$: Observable<IActionGetChatMember>,
  _state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
): Observable<IActionGetChatMember> => {
  const { botToken, locales, requestsObservable } = dependencies;

  const actionObservable: (
    action: IActionGetChatMember
  ) => Observable<IActionGetChatMember> = (
    action: IActionGetChatMember
  ): Observable<IActionGetChatMember> => {
    if (action.getChatMember.query === undefined) {
      return of(
        actions.getChatMember.error({
          error: new Error(locales.find("actionGetChatMemberQueryUndefined"))
        })
      );
    }

    return requestsObservable<IResponse>(
      {
        host: "api.telegram.org",
        method: "POST",
        path: `/bot${botToken}/getChatMember`
      },
      action.getChatMember.query
    ).pipe(
      map(
        (response: IResponse): IActionGetChatMember => {
          if (response.ok) {
            return actions.getChatMember.result({
              result: response.result as IChatMember
            });
          }

          return actions.getChatMember.error({
            error: response
          });
        }
      ),
      catchError((error: any) =>
        of(
          actions.getChatMember.error({
            error
          })
        )
      )
    );
  };

  return action$.pipe(
    ofType(actions.getChatMember.GET_CHAT_MEMBER_QUERY),
    switchMap(actionObservable)
  );
};

export { getChatMember };
