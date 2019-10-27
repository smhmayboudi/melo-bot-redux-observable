import { ofType, StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { IActionDeleteMessage } from "../../types/iActionDeleteMessage";
import { IDependencies } from "../../types/iDependencies";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import * as actions from "../actions";
import * as texts from "../configs/texts";

const deleteMessage: (
  action$: Observable<IActionDeleteMessage>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => Observable<IActionDeleteMessage> = (
  action$: Observable<IActionDeleteMessage>,
  _state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
): Observable<IActionDeleteMessage> => {
  const { botToken, requestsObservable } = dependencies;

  const actionObservable: (
    action: IActionDeleteMessage
  ) => Observable<IActionDeleteMessage> = (
    action: IActionDeleteMessage
  ): Observable<IActionDeleteMessage> => {
    if (botToken === undefined) {
      return of(
        actions.deleteMessage.error({
          error: new Error(texts.epicDependencyBotTokenUndefined)
        })
      );
    }
    if (requestsObservable === undefined) {
      return of(
        actions.deleteMessage.error({
          error: new Error(texts.epicDependencyRequestsObservableUndefined)
        })
      );
    }
    if (action.deleteMessage.query === undefined) {
      return of(
        actions.deleteMessage.error({
          error: new Error(texts.actionDeleteMessageQueryUndefined)
        })
      );
    }

    return requestsObservable(
      {
        host: "api.telegram.org",
        method: "POST",
        path: `/bot${botToken}/deleteMessage`
      },
      action.deleteMessage.query
    ).pipe(
      map(
        (response: IResponse): IActionDeleteMessage => {
          if (response.ok) {
            return actions.deleteMessage.result({
              result: response.result as boolean
            });
          }

          return actions.deleteMessage.error({
            error: response
          });
        }
      ),
      catchError((error: any) =>
        of(
          actions.deleteMessage.error({
            error
          })
        )
      )
    );
  };

  return action$.pipe(
    ofType(actions.deleteMessage.DELETE_MESSAGE_QUERY),
    switchMap(actionObservable)
  );
};

export { deleteMessage };