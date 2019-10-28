import { ofType, StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { IActionSendMediaGroup } from "../../types/iActionSendMediaGroup";
import { IDependencies } from "../../types/iDependencies";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import * as actions from "../actions";
import * as texts from "../configs/texts";

const sendMediaGroup: (
  action$: Observable<IActionSendMediaGroup>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => Observable<IActionSendMediaGroup> = (
  action$: Observable<IActionSendMediaGroup>,
  _state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
): Observable<IActionSendMediaGroup> => {
  const { botToken, requestsObservable } = dependencies;

  const actionObservable: (
    action: IActionSendMediaGroup
  ) => Observable<IActionSendMediaGroup> = (
    action: IActionSendMediaGroup
  ): Observable<IActionSendMediaGroup> => {
    if (botToken === undefined) {
      return of(
        actions.sendMediaGroup.error({
          error: new Error(texts.epicDependencyBotTokenUndefined)
        })
      );
    }
    if (requestsObservable === undefined) {
      return of(
        actions.sendMediaGroup.error({
          error: new Error(texts.epicDependencyRequestsObservableUndefined)
        })
      );
    }
    if (action.sendMediaGroup.query === undefined) {
      return of(
        actions.sendMediaGroup.error({
          error: new Error(texts.actionSendMediaGroupQueryUndefined)
        })
      );
    }

    return requestsObservable(
      {
        host: "api.telegram.org",
        method: "POST",
        path: `/bot${botToken}/sendMediaGroup`
      },
      action.sendMediaGroup.query
    ).pipe(
      map(
        (response: IResponse): IActionSendMediaGroup => {
          if (response.ok) {
            return actions.sendMediaGroup.result({
              // TODO: check it
              result: response.result as boolean
            });
          }

          return actions.sendMediaGroup.error({
            error: response
          });
        }
      ),
      catchError((error: any) =>
        of(
          actions.sendMediaGroup.error({
            error
          })
        )
      )
    );
  };

  return action$.pipe(
    ofType(actions.sendMediaGroup.SEND_MEDIA_GROUP_QUERY),
    switchMap(actionObservable)
  );
};

export { sendMediaGroup };