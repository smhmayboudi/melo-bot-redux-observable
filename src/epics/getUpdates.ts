import { ofType, StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { IActionGetUpdates } from "../../types/iActionGetUpdates";
import { IDependencies } from "../../types/iDependencies";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import { IUpdate } from "../../types/telegramBot/updates/iUpdate";
import * as actions from "../actions";

const getUpdates: (
  action$: Observable<IActionGetUpdates>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => Observable<IActionGetUpdates> = (
  action$: Observable<IActionGetUpdates>,
  _state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
): Observable<IActionGetUpdates> => {
  const { botToken, locales, requestsObservable } = dependencies;

  const actionObservable: (
    action: IActionGetUpdates
  ) => Observable<IActionGetUpdates> = (
    action: IActionGetUpdates
  ): Observable<IActionGetUpdates> => {
    if (action.getUpdates.query === undefined) {
      return of(
        actions.getUpdates.error({
          error: new Error(locales.find("actionGetUpdatesQueryUndefined"))
        })
      );
    }

    return requestsObservable<IResponse>(
      {
        host: "api.telegram.org",
        method: "POST",
        path: `/bot${botToken}/getUpdates`
      },
      action.getUpdates.query
    ).pipe(
      map(
        (response: IResponse): IActionGetUpdates => {
          if (response.ok) {
            return actions.getUpdates.result({
              result: response.result as IUpdate[]
            });
          }

          return actions.getUpdates.error({
            error: response
          });
        }
      ),
      catchError((error: any) =>
        of(
          actions.getUpdates.error({
            error
          })
        )
      )
    );
  };

  return action$.pipe(
    ofType(actions.getUpdates.GET_UPDATES_QUERY),
    switchMap(actionObservable)
  );
};

export { getUpdates };
