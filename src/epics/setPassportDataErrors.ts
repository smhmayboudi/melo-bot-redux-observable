import { ofType, StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { IActionSetPassportDataErrors } from "../../types/iActionSetPassportDataErrors";
import { IDependencies } from "../../types/iDependencies";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import * as actions from "../actions";
import { filterAsync } from "../libs/filterAsync";

const setPassportDataErrors: (
  action$: Observable<IActionSetPassportDataErrors>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => Observable<IActionSetPassportDataErrors> = (
  action$: Observable<IActionSetPassportDataErrors>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
): Observable<IActionSetPassportDataErrors> => {
  const { authorization, botToken, locales, requestsObservable } = dependencies;

  const actionObservable: (
    action: IActionSetPassportDataErrors
  ) => Observable<IActionSetPassportDataErrors> = (
    action: IActionSetPassportDataErrors
  ): Observable<IActionSetPassportDataErrors> => {
    if (action.setPassportDataErrors.query === undefined) {
      return of(
        actions.setPassportDataErrors.error({
          error: new Error(
            locales.find("actionSetPassportDataErrorsQueryUndefined")
          )
        })
      );
    }

    return requestsObservable<IResponse>(
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
    filterAsync((action: IActionSetPassportDataErrors, index: number) =>
      authorization(action, state$, index)
    ),
    switchMap(actionObservable)
  );
};

export { setPassportDataErrors };
