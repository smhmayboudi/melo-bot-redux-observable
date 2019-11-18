import { ofType, StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { IActionLeaveChat } from "../../types/iActionLeaveChat";
import { IDependencies } from "../../types/iDependencies";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import * as actions from "../actions";
import * as texts from "../configs/texts";

const leaveChat: (
  action$: Observable<IActionLeaveChat>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => Observable<IActionLeaveChat> = (
  action$: Observable<IActionLeaveChat>,
  _state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
): Observable<IActionLeaveChat> => {
  const { botToken, requestsObservable } = dependencies;

  const actionObservable: (
    action: IActionLeaveChat
  ) => Observable<IActionLeaveChat> = (
    action: IActionLeaveChat
  ): Observable<IActionLeaveChat> => {
    if (action.leaveChat.query === undefined) {
      return of(
        actions.leaveChat.error({
          error: new Error(texts.actionLeaveChatQueryUndefined)
        })
      );
    }

    return requestsObservable<IResponse>(
      {
        host: "api.telegram.org",
        method: "POST",
        path: `/bot${botToken}/leaveChat`
      },
      action.leaveChat.query
    ).pipe(
      map(
        (response: IResponse): IActionLeaveChat => {
          if (response.ok) {
            return actions.leaveChat.result({
              result: response.result as boolean
            });
          }

          return actions.leaveChat.error({
            error: response
          });
        }
      ),
      catchError((error: any) =>
        of(
          actions.leaveChat.error({
            error
          })
        )
      )
    );
  };

  return action$.pipe(
    ofType(actions.leaveChat.LEAVE_CHAT_QUERY),
    switchMap(actionObservable)
  );
};

export { leaveChat };
