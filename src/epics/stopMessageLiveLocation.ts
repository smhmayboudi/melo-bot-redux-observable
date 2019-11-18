import { ofType, StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { IActionStopMessageLiveLocation } from "../../types/iActionStopMessageLiveLocation";
import { IDependencies } from "../../types/iDependencies";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import { IMessage } from "../../types/telegramBot/types/iMessage";
import * as actions from "../actions";
import * as texts from "../configs/texts";

const stopMessageLiveLocation: (
  action$: Observable<IActionStopMessageLiveLocation>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => Observable<IActionStopMessageLiveLocation> = (
  action$: Observable<IActionStopMessageLiveLocation>,
  _state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
): Observable<IActionStopMessageLiveLocation> => {
  const { botToken, requestsObservable } = dependencies;

  const actionObservable: (
    action: IActionStopMessageLiveLocation
  ) => Observable<IActionStopMessageLiveLocation> = (
    action: IActionStopMessageLiveLocation
  ): Observable<IActionStopMessageLiveLocation> => {
    if (action.stopMessageLiveLocation.query === undefined) {
      return of(
        actions.stopMessageLiveLocation.error({
          error: new Error(texts.actionStopMessageLiveLocationQueryUndefined)
        })
      );
    }

    return requestsObservable<IResponse>(
      {
        host: "api.telegram.org",
        method: "POST",
        path: `/bot${botToken}/stopMessageLiveLocation`
      },
      action.stopMessageLiveLocation.query
    ).pipe(
      map(
        (response: IResponse): IActionStopMessageLiveLocation => {
          if (response.ok) {
            return actions.stopMessageLiveLocation.result({
              result: response.result as boolean | IMessage
            });
          }

          return actions.stopMessageLiveLocation.error({
            error: response
          });
        }
      ),
      catchError((error: any) =>
        of(
          actions.stopMessageLiveLocation.error({
            error
          })
        )
      )
    );
  };

  return action$.pipe(
    ofType(actions.stopMessageLiveLocation.STOP_MESSAGE_LIVE_LOCATION_QUERY),
    switchMap(actionObservable)
  );
};

export { stopMessageLiveLocation };
