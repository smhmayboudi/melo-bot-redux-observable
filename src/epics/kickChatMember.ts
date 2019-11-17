import { ofType, StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { IActionKickChatMember } from "../../types/iActionKickChatMember";
import { IDependencies } from "../../types/iDependencies";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import * as actions from "../actions";
import * as texts from "../configs/texts";

const kickChatMember: (
  action$: Observable<IActionKickChatMember>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => Observable<IActionKickChatMember> = (
  action$: Observable<IActionKickChatMember>,
  _state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
): Observable<IActionKickChatMember> => {
  const { botToken, requestsObservable } = dependencies;

  const actionObservable: (
    action: IActionKickChatMember
  ) => Observable<IActionKickChatMember> = (
    action: IActionKickChatMember
  ): Observable<IActionKickChatMember> => {
    if (botToken === undefined) {
      return of(
        actions.kickChatMember.error({
          error: new Error(texts.epicDependencyBotTokenUndefined)
        })
      );
    }
    if (requestsObservable === undefined) {
      return of(
        actions.kickChatMember.error({
          error: new Error(texts.epicDependencyRequestsObservableUndefined)
        })
      );
    }
    if (action.kickChatMember.query === undefined) {
      return of(
        actions.kickChatMember.error({
          error: new Error(texts.actionKickChatMemberQueryUndefined)
        })
      );
    }

    return requestsObservable<IResponse>(
      {
        host: "api.telegram.org",
        method: "POST",
        path: `/bot${botToken}/kickChatMember`
      },
      action.kickChatMember.query
    ).pipe(
      map(
        (response: IResponse): IActionKickChatMember => {
          if (response.ok) {
            return actions.kickChatMember.result({
              result: response.result as boolean
            });
          }

          return actions.kickChatMember.error({
            error: response
          });
        }
      ),
      catchError((error: any) =>
        of(
          actions.kickChatMember.error({
            error
          })
        )
      )
    );
  };

  return action$.pipe(
    ofType(actions.kickChatMember.KICK_CHAT_MEMBER_QUERY),
    switchMap(actionObservable)
  );
};

export { kickChatMember };
