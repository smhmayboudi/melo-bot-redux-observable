import { ofType, StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { IActionStopPoll } from "../../types/iActionStopPoll";
import { IDependencies } from "../../types/iDependencies";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import * as actions from "../actions";
import { filterAsync } from "../libs/filterAsync";

const stopPoll: (
  action$: Observable<IActionStopPoll>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => Observable<IActionStopPoll> = (
  action$: Observable<IActionStopPoll>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
): Observable<IActionStopPoll> => {
  const { authorization, botToken, locales, requestsObservable } = dependencies;

  const actionObservable: (
    action: IActionStopPoll
  ) => Observable<IActionStopPoll> = (
    action: IActionStopPoll
  ): Observable<IActionStopPoll> => {
    if (action.stopPoll.query === undefined) {
      return of(
        actions.stopPoll.error({
          error: new Error(locales.find("actionStopPollQueryUndefined"))
        })
      );
    }

    return requestsObservable<IResponse>(
      {
        host: "api.telegram.org",
        method: "POST",
        path: `/bot${botToken}/stopPoll`
      },
      action.stopPoll.query
    ).pipe(
      map(
        (response: IResponse): IActionStopPoll => {
          if (response.ok) {
            return actions.stopPoll.result({
              result: response.result as boolean
            });
          }

          return actions.stopPoll.error({
            error: response
          });
        }
      ),
      catchError((error: any) =>
        of(
          actions.stopPoll.error({
            error
          })
        )
      )
    );
  };

  return action$.pipe(
    ofType(actions.stopPoll.STOP_POLL_QUERY),
    filterAsync((action: IActionStopPoll, index: number) =>
      authorization(state$, dependencies, action, index)
    ),
    switchMap(actionObservable)
  );
};

export { stopPoll };
