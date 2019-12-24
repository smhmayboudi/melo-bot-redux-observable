import { ofType, StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { IActionGetChatMembersCount } from "../../types/iActionGetChatMembersCount";
import { IDependencies } from "../../types/iDependencies";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import * as actions from "../actions";
import { filterAsync } from "../libs/filterAsync";

const getChatMembersCount: (
  action$: Observable<IActionGetChatMembersCount>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => Observable<IActionGetChatMembersCount> = (
  action$: Observable<IActionGetChatMembersCount>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
): Observable<IActionGetChatMembersCount> => {
  const { authorization, botToken, locales, requestsObservable } = dependencies;

  const actionObservable: (
    action: IActionGetChatMembersCount
  ) => Observable<IActionGetChatMembersCount> = (
    action: IActionGetChatMembersCount
  ): Observable<IActionGetChatMembersCount> => {
    if (action.getChatMembersCount.query === undefined) {
      return of(
        actions.getChatMembersCount.error({
          error: new Error(
            locales.find("actionGetChatMembersCountQueryUndefined")
          )
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
    filterAsync((action: IActionGetChatMembersCount, index: number) =>
      authorization(action, state$, index)
    ),
    switchMap(actionObservable)
  );
};

export { getChatMembersCount };
