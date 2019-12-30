import { ofType, StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { IActionUnbanChatMember } from "../../types/iActionUnbanChatMember";
import { IDependencies } from "../../types/iDependencies";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import * as actions from "../actions";
import { filterAsync } from "../libs/filterAsync";

const unbanChatMember: (
  action$: Observable<IActionUnbanChatMember>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => Observable<IActionUnbanChatMember> = (
  action$: Observable<IActionUnbanChatMember>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
): Observable<IActionUnbanChatMember> => {
  const { authorization, botToken, locales, requestsObservable } = dependencies;

  const actionObservable: (
    action: IActionUnbanChatMember
  ) => Observable<IActionUnbanChatMember> = (
    action: IActionUnbanChatMember
  ): Observable<IActionUnbanChatMember> => {
    if (action.unbanChatMember.query === undefined) {
      return of(
        actions.unbanChatMember.error({
          error: new Error(locales.find("actionUnbanChatMemberQueryUndefined"))
        })
      );
    }

    return requestsObservable<IResponse>(
      {
        host: "api.telegram.org",
        method: "POST",
        path: `/bot${botToken}/unbanChatMember`
      },
      action.unbanChatMember.query
    ).pipe(
      map(
        (response: IResponse): IActionUnbanChatMember => {
          if (response.ok) {
            return actions.unbanChatMember.result({
              result: response.result as boolean
            });
          }

          return actions.unbanChatMember.error({
            error: response
          });
        }
      ),
      catchError((error: any) =>
        of(
          actions.unbanChatMember.error({
            error
          })
        )
      )
    );
  };

  return action$.pipe(
    ofType(actions.unbanChatMember.UNBAN_CHAT_MEMBER_QUERY),
    filterAsync((action: IActionUnbanChatMember, index: number) =>
      authorization(state$, dependencies, action, index)
    ),
    switchMap(actionObservable)
  );
};

export { unbanChatMember };
