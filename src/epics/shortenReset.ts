import { Connection, UpsertResult } from "mariadb";
import { ofType, StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { catchError, switchMap } from "rxjs/operators";

import { IActionShortenReset } from "../../types/iActionShortenReset";
import { IDependencies } from "../../types/iDependencies";
import { IState } from "../../types/iState";
import * as actions from "../actions";
import { filterAsync } from "../libs/filterAsync";
import { IActionSendMessage } from "../../types/iActionSendMessage";

const shortenReset: (
  action$: Observable<IActionShortenReset>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => Observable<IActionSendMessage | IActionShortenReset> = (
  action$: Observable<IActionShortenReset>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
): Observable<IActionSendMessage | IActionShortenReset> => {
  const {
    authorization,
    connectionObservable,
    locales,
    queryObservable
  } = dependencies;

  const actionObservable: (
    action: IActionShortenReset
  ) => Observable<IActionShortenReset> = (
    action: IActionShortenReset
  ): Observable<IActionShortenReset> =>
    connectionObservable().pipe(
      switchMap(
        (connection: Connection): Observable<IActionShortenReset> => {
          if (action.shortenReset.query === undefined) {
            return of(
              actions.shortenReset.error({
                error: new Error(
                  locales.find("actionShortenResetQueryUndefined")
                )
              })
            );
          }

          return queryObservable(
            connection,
            "UPDATE `shorten` SET `count`=0 WHERE `id`=?",
            [action.shortenReset.query.id]
          ).pipe(
            switchMap(
              (upsertResult: UpsertResult): Observable<IActionShortenReset> =>
                of(
                  actions.shortenReset.result({
                    result: upsertResult
                  })
                )
            ),
            catchError((error: any) =>
              of(
                actions.shortenReset.error({
                  error
                })
              )
            )
          );
        }
      ),
      catchError((error: any) =>
        of(
          actions.shortenReset.error({
            error
          })
        )
      )
    );

  return action$.pipe(
    ofType(actions.shortenReset.SHORTEN_RESET_QUERY),
    filterAsync((action: IActionShortenReset, index: number) =>
      authorization(state$, dependencies, action, index)
    ),
    switchMap(actionObservable)
  );
};

export { shortenReset };
