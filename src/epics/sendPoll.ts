import { ofType, StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { IActionSendPoll } from "../../types/iActionSendPoll";
import { IDependencies } from "../../types/iDependencies";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import * as actions from "../actions";
import * as texts from "../configs/texts";

const sendPoll: (
  action$: Observable<IActionSendPoll>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => Observable<IActionSendPoll> = (
  action$: Observable<IActionSendPoll>,
  _state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
): Observable<IActionSendPoll> => {
  const { botToken, requestsObservable } = dependencies;

  const actionObservable: (
    action: IActionSendPoll
  ) => Observable<IActionSendPoll> = (
    action: IActionSendPoll
  ): Observable<IActionSendPoll> => {
    if (botToken === undefined) {
      return of(
        actions.sendPoll.error({
          error: new Error(texts.epicDependencyBotTokenUndefined)
        })
      );
    }
    if (requestsObservable === undefined) {
      return of(
        actions.sendPoll.error({
          error: new Error(texts.epicDependencyRequestsObservableUndefined)
        })
      );
    }
    if (action.sendPoll.query === undefined) {
      return of(
        actions.sendPoll.error({
          error: new Error(texts.actionSendPollQueryUndefined)
        })
      );
    }

    return requestsObservable(
      {
        host: "api.telegram.org",
        method: "POST",
        path: `/bot${botToken}/sendPoll`
      },
      action.sendPoll.query
    ).pipe(
      map(
        (response: IResponse): IActionSendPoll => {
          if (response.ok) {
            return actions.sendPoll.result({
              // TODO: check it
              result: response.result as boolean
            });
          }

          return actions.sendPoll.error({
            error: response
          });
        }
      ),
      catchError((error: any) =>
        of(
          actions.sendPoll.error({
            error
          })
        )
      )
    );
  };

  return action$.pipe(
    ofType(actions.sendPoll.SEND_POLL_QUERY),
    switchMap(actionObservable)
  );
};

export { sendPoll };