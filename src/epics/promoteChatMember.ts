import { ofType, StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { IActionPromoteChatMember } from "../../types/iActionPromoteChatMember";
import { IDependencies } from "../../types/iDependencies";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import * as actions from "../actions";
import { filterAsync } from "../libs/filterAsync";

const promoteChatMember: (
  action$: Observable<IActionPromoteChatMember>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => Observable<IActionPromoteChatMember> = (
  action$: Observable<IActionPromoteChatMember>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
): Observable<IActionPromoteChatMember> => {
  const { authorization, botToken, locales, requestsObservable } = dependencies;

  const actionObservable: (
    action: IActionPromoteChatMember
  ) => Observable<IActionPromoteChatMember> = (
    action: IActionPromoteChatMember
  ): Observable<IActionPromoteChatMember> => {
    if (action.promoteChatMember.query === undefined) {
      return of(
        actions.promoteChatMember.error({
          error: new Error(
            locales.find("actionPromoteChatMemberQueryUndefined")
          )
        })
      );
    }

    return requestsObservable<IResponse>(
      {
        host: "api.telegram.org",
        method: "POST",
        path: `/bot${botToken}/promoteChatMember`
      },
      action.promoteChatMember.query
    ).pipe(
      map(
        (response: IResponse): IActionPromoteChatMember => {
          if (response.ok) {
            return actions.promoteChatMember.result({
              result: response.result as boolean
            });
          }

          return actions.promoteChatMember.error({
            error: response
          });
        }
      ),
      catchError((error: any) =>
        of(
          actions.promoteChatMember.error({
            error
          })
        )
      )
    );
  };

  return action$.pipe(
    ofType(actions.promoteChatMember.PROMOTE_CHAT_MEMBER_QUERY),
    filterAsync((action: IActionPromoteChatMember, index: number) =>
      authorization(state$, dependencies, action, index)
    ),
    switchMap(actionObservable)
  );
};

export { promoteChatMember };
