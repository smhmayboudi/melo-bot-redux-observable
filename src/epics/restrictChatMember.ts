import { ofType, StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { IActionRestrictChatMember } from "../../types/iActionRestrictChatMember";
import { IDependencies } from "../../types/iDependencies";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import * as actions from "../actions";
import { filterAsync } from "../libs/filterAsync";

const restrictChatMember: (
  action$: Observable<IActionRestrictChatMember>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => Observable<IActionRestrictChatMember> = (
  action$: Observable<IActionRestrictChatMember>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
): Observable<IActionRestrictChatMember> => {
  const { authorization, botToken, locales, requestsObservable } = dependencies;

  const actionObservable: (
    action: IActionRestrictChatMember
  ) => Observable<IActionRestrictChatMember> = (
    action: IActionRestrictChatMember
  ): Observable<IActionRestrictChatMember> => {
    if (action.restrictChatMember.query === undefined) {
      return of(
        actions.restrictChatMember.error({
          error: new Error(
            locales.find("actionRestrictChatMemberQueryUndefined")
          )
        })
      );
    }

    return requestsObservable<IResponse>(
      {
        host: "api.telegram.org",
        method: "POST",
        path: `/bot${botToken}/restrictChatMember`
      },
      action.restrictChatMember.query
    ).pipe(
      map(
        (response: IResponse): IActionRestrictChatMember => {
          if (response.ok) {
            return actions.restrictChatMember.result({
              result: response.result as boolean
            });
          }

          return actions.restrictChatMember.error({
            error: response
          });
        }
      ),
      catchError((error: any) =>
        of(
          actions.restrictChatMember.error({
            error
          })
        )
      )
    );
  };

  return action$.pipe(
    ofType(actions.restrictChatMember.RESTRICT_CHAT_MEMBER_QUERY),
    filterAsync((action: IActionRestrictChatMember, index: number) =>
      authorization(action, state$, index)
    ),
    switchMap(actionObservable)
  );
};

export { restrictChatMember };
