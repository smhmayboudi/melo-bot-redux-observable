import { ofType, StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { IActionGetMe } from "../../types/iActionGetMe";
import { IDependencies } from "../../types/iDependencies";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import { IUser } from "../../types/telegramBot/types/iUser";
import * as actions from "../actions";

const getMe: (
  action$: Observable<IActionGetMe>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => Observable<IActionGetMe> = (
  action$: Observable<IActionGetMe>,
  _state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
): Observable<IActionGetMe> => {
  const { botToken, locales, requestsObservable } = dependencies;

  const actionObservable: (action: IActionGetMe) => Observable<IActionGetMe> = (
    action: IActionGetMe
  ): Observable<IActionGetMe> => {
    if (action.getMe.query === undefined) {
      return of(
        actions.getMe.error({
          error: new Error(locales.find("actionGetMeQueryUndefined"))
        })
      );
    }

    return requestsObservable<IResponse>(
      {
        host: "api.telegram.org",
        method: "POST",
        path: `/bot${botToken}/getMe`
      },
      action.getMe.query
    ).pipe(
      map(
        (response: IResponse): IActionGetMe => {
          if (response.ok) {
            return actions.getMe.result({
              result: response.result as IUser
            });
          }

          return actions.getMe.error({
            error: response
          });
        }
      ),
      catchError((error: any) =>
        of(
          actions.getMe.error({
            error
          })
        )
      )
    );
  };

  return action$.pipe(
    ofType(actions.getMe.GET_ME_QUERY),
    switchMap(actionObservable)
  );
};

export { getMe };
