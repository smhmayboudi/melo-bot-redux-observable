import { ofType, StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { IActionEditMessageLiveLocation } from "../../types/iActionEditMessageLiveLocation";
import { IDependencies } from "../../types/iDependencies";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import { IMessage } from "../../types/telegramBot/types/iMessage";
import * as actions from "../actions";
import { filterAsync } from "../libs/filterAsync";

const editMessageLiveLocation: (
  action$: Observable<IActionEditMessageLiveLocation>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => Observable<IActionEditMessageLiveLocation> = (
  action$: Observable<IActionEditMessageLiveLocation>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
): Observable<IActionEditMessageLiveLocation> => {
  const { authorization, botToken, locales, requestsObservable } = dependencies;

  const actionObservable: (
    action: IActionEditMessageLiveLocation
  ) => Observable<IActionEditMessageLiveLocation> = (
    action: IActionEditMessageLiveLocation
  ): Observable<IActionEditMessageLiveLocation> => {
    if (action.editMessageLiveLocation.query === undefined) {
      return of(
        actions.editMessageLiveLocation.error({
          error: new Error(
            locales.find("actionEditMessageLiveLocationQueryUndefined")
          )
        })
      );
    }

    return requestsObservable<IResponse>(
      {
        host: "api.telegram.org",
        method: "POST",
        path: `/bot${botToken}/editMessageLiveLocation`
      },
      action.editMessageLiveLocation.query
    ).pipe(
      map(
        (response: IResponse): IActionEditMessageLiveLocation => {
          if (response.ok) {
            return actions.editMessageLiveLocation.result({
              result: response.result as boolean | IMessage
            });
          }

          return actions.editMessageLiveLocation.error({
            error: response
          });
        }
      ),
      catchError((error: any) =>
        of(
          actions.editMessageLiveLocation.error({
            error
          })
        )
      )
    );
  };

  return action$.pipe(
    ofType(actions.editMessageLiveLocation.EDIT_MESSAGE_LIVE_LOCATION_QUERY),
    filterAsync((action: IActionEditMessageLiveLocation, index: number) =>
      authorization(state$, dependencies, action, index)
    ),
    switchMap(actionObservable)
  );
};

export { editMessageLiveLocation };
