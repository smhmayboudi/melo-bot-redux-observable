import { ofType, StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { IActionSetPassportDataErrors } from "../../types/iActionSetPassportDataErrors";
import { IDependencies } from "../../types/iDependencies";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import * as actions from "../actions";
import * as texts from "../configs/texts";

const setPassportDataErrors: (
  action$: Observable<IActionSetPassportDataErrors>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => Observable<IActionSetPassportDataErrors> = (
  action$: Observable<IActionSetPassportDataErrors>,
  _state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
): Observable<IActionSetPassportDataErrors> => {
  const { botToken, requestsObservable } = dependencies;

  const actionObservable: (
    action: IActionSetPassportDataErrors
  ) => Observable<IActionSetPassportDataErrors> = (
    action: IActionSetPassportDataErrors
  ): Observable<IActionSetPassportDataErrors> => {
    if (botToken === undefined) {
      return of(
        actions.setPassportDataErrors.error({
          error: new Error(texts.epicDependencyBotTokenUndefined)
        })
      );
    }
    if (requestsObservable === undefined) {
      return of(
        actions.setPassportDataErrors.error({
          error: new Error(texts.epicDependencyRequestsObservableUndefined)
        })
      );
    }
    if (action.setPassportDataErrors.query === undefined) {
      return of(
        actions.setPassportDataErrors.error({
          error: new Error(texts.actionSetPassportDataErrorsQueryUndefined)
        })
      );
    }

    return requestsObservable(
      {
        host: "api.telegram.org",
        method: "POST",
        path: `/bot${botToken}/setPassportDataErrors`
      },
      action.setPassportDataErrors.query
    ).pipe(
      map(
        (response: IResponse): IActionSetPassportDataErrors => {
          if (response.ok) {
            return actions.setPassportDataErrors.result({
              // TODO: check it
              result: response.result as boolean
            });
          }

          return actions.setPassportDataErrors.error({
            error: response
          });
        }
      ),
      catchError((error: any) =>
        of(
          actions.setPassportDataErrors.error({
            error
          })
        )
      )
    );
  };

  return action$.pipe(
    ofType(actions.setPassportDataErrors.SET_PASSPORT_DATA_ERRORS_QUERY),
    switchMap(actionObservable)
  );
};

export { setPassportDataErrors };
