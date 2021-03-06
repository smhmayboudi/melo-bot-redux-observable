import { Connection } from "mariadb";
import { ofType, StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { catchError, switchMap } from "rxjs/operators";

import { IActionShortenList } from "../../types/iActionShortenList";
import { IDependencies } from "../../types/iDependencies";
import { IState } from "../../types/iState";
import * as actions from "../actions";
import { filterAsync } from "../libs/filterAsync";
import { IActionSendMessage } from "../../types/iActionSendMessage";
import { IStateShortenListResult } from "../../types/iStateShortenListResult";

const shortenList: (
  action$: Observable<IActionShortenList>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => Observable<IActionSendMessage | IActionShortenList> = (
  action$: Observable<IActionShortenList>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
): Observable<IActionSendMessage | IActionShortenList> => {
  const {
    authorization,
    connectionObservable,
    locales,
    queryObservable
  } = dependencies;

  const actionObservable: (
    action: IActionShortenList
  ) => Observable<IActionShortenList> = (
    action: IActionShortenList
  ): Observable<IActionShortenList> =>
    connectionObservable().pipe(
      switchMap(
        (connection: Connection): Observable<IActionShortenList> => {
          if (action.shortenList.query === undefined) {
            return of(
              actions.shortenList.error({
                error: new Error(
                  locales.find("actionShortenListQueryUndefined")
                )
              })
            );
          }

          return queryObservable(
            connection,
            action.shortenList.query.shortLink === undefined ||
              action.shortenList.query.shortLink === ""
              ? "SELECT * FROM `shorten` WHERE `long_link` LIKE '/start --tabligh%'"
              : "SELECT * FROM `shorten` WHERE `long_link` LIKE '/start --tabligh%' and `short_link`=?",
            [action.shortenList.query.shortLink]
          ).pipe(
            switchMap(
              (rows: any[]): Observable<IActionShortenList> =>
                of(
                  actions.shortenList.result({
                    result:
                      rows !== null
                        ? rows.map<IStateShortenListResult>((row: any) => ({
                            alphabet: row.alphabet,
                            count: row.count,
                            date: row.date,
                            id: row.id,
                            longLink: row.long_link,
                            longBase64: row.long_base64,
                            shortLink: row.short_link
                          }))
                        : undefined
                  })
                )
            ),
            catchError((error: any) =>
              of(
                actions.shortenList.error({
                  error
                })
              )
            )
          );
        }
      ),
      catchError((error: any) =>
        of(
          actions.shortenList.error({
            error
          })
        )
      )
    );

  return action$.pipe(
    ofType(actions.shortenList.SHORTEN_LIST_QUERY),
    filterAsync((action: IActionShortenList, index: number) =>
      authorization(state$, dependencies, action, index)
    ),
    switchMap(actionObservable)
  );
};

export { shortenList };
