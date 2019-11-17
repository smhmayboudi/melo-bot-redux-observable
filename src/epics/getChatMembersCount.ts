import { ofType, StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { IActionGetChatMembersCount } from "../../types/iActionGetChatMembersCount";
import { IDependencies } from "../../types/iDependencies";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import * as actions from "../actions";
import * as texts from "../configs/texts";

const getChatMembersCount: (
  action$: Observable<IActionGetChatMembersCount>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => Observable<IActionGetChatMembersCount> = (
  action$: Observable<IActionGetChatMembersCount>,
  _state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
): Observable<IActionGetChatMembersCount> => {
  const { botToken, requestsObservable } = dependencies;

  const actionObservable: (
    action: IActionGetChatMembersCount
  ) => Observable<IActionGetChatMembersCount> = (
    action: IActionGetChatMembersCount
  ): Observable<IActionGetChatMembersCount> => {
    if (botToken === undefined) {
      return of(
        actions.getChatMembersCount.error({
          error: new Error(texts.epicDependencyBotTokenUndefined)
        })
      );
    }
    if (requestsObservable === undefined) {
      return of(
        actions.getChatMembersCount.error({
          error: new Error(texts.epicDependencyRequestsObservableUndefined)
        })
      );
    }
    if (action.getChatMembersCount.query === undefined) {
      return of(
        actions.getChatMembersCount.error({
          error: new Error(texts.actionGetChatMembersCountQueryUndefined)
        })
      );
    }

    return requestsObservable<IResponse>(
      {
        host: "api.telegram.org",
        method: "POST",
        path: `/bot${botToken}/getChatMembersCount`
      },
      action.getChatMembersCount.query
    ).pipe(
      map(
        (response: IResponse): IActionGetChatMembersCount => {
          if (response.ok) {
            return actions.getChatMembersCount.result({
              result: response.result as number
            });
          }

          return actions.getChatMembersCount.error({
            error: response
          });
        }
      ),
      catchError((error: any) =>
        of(
          actions.getChatMembersCount.error({
            error
          })
        )
      )
    );
  };

  return action$.pipe(
    ofType(actions.getChatMembersCount.GET_CHAT_MEMBERS_COUNT_QUERY),
    switchMap(actionObservable)
  );
};

export { getChatMembersCount };
