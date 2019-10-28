import { ofType, StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { IActionPromoteChatMember } from "../../types/iActionPromoteChatMember";
import { IDependencies } from "../../types/iDependencies";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import * as actions from "../actions";
import * as texts from "../configs/texts";

const promoteChatMember: (
  action$: Observable<IActionPromoteChatMember>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => Observable<IActionPromoteChatMember> = (
  action$: Observable<IActionPromoteChatMember>,
  _state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
): Observable<IActionPromoteChatMember> => {
  const { botToken, requestsObservable } = dependencies;

  const actionObservable: (
    action: IActionPromoteChatMember
  ) => Observable<IActionPromoteChatMember> = (
    action: IActionPromoteChatMember
  ): Observable<IActionPromoteChatMember> => {
    if (botToken === undefined) {
      return of(
        actions.promoteChatMember.error({
          error: new Error(texts.epicDependencyBotTokenUndefined)
        })
      );
    }
    if (requestsObservable === undefined) {
      return of(
        actions.promoteChatMember.error({
          error: new Error(texts.epicDependencyRequestsObservableUndefined)
        })
      );
    }
    if (action.promoteChatMember.query === undefined) {
      return of(
        actions.promoteChatMember.error({
          error: new Error(texts.actionPromoteChatMemberQueryUndefined)
        })
      );
    }

    return requestsObservable(
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
    switchMap(actionObservable)
  );
};

export { promoteChatMember };
