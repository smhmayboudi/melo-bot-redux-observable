import { Collection, MongoClient } from "mongodb";
import { ofType, StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { catchError, switchMap, switchMapTo } from "rxjs/operators";

import { IActionChosenInlineResult } from "../../types/iActionChosenInlineResult";
import { IDependencies } from "../../types/iDependencies";
import { IState } from "../../types/iState";
import { IStateChosenInlineResultQuery } from "../../types/iStateChosenInlineResultQuery";
import * as actions from "../actions";
import * as env from "../configs/env";

const chosenInlineResult: (
  action$: Observable<IActionChosenInlineResult>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => Observable<IActionChosenInlineResult> = (
  action$: Observable<IActionChosenInlineResult>,
  _state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
): Observable<IActionChosenInlineResult> => {
  const {
    collectionObservable,
    insertOneObservable,
    locales,
    mongoClientObservable
  } = dependencies;

  const actionObservable: (
    action: IActionChosenInlineResult
  ) => Observable<IActionChosenInlineResult> = (
    action: IActionChosenInlineResult
  ): Observable<IActionChosenInlineResult> => {
    return mongoClientObservable().pipe(
      switchMap(
        (client: MongoClient): Observable<IActionChosenInlineResult> => {
          return collectionObservable<IStateChosenInlineResultQuery>(
            client.db(env.DB_NAME),
            "chosenInlineResult",
            {}
          ).pipe(
            switchMap(
              (
                collection: Collection<IStateChosenInlineResultQuery>
              ): Observable<IActionChosenInlineResult> => {
                if (action.chosenInlineResult.query === undefined) {
                  return of(
                    actions.chosenInlineResult.error({
                      error: new Error(
                        locales.find("actionChosenInlineResultQueryUndefined")
                      )
                    })
                  );
                }

                return insertOneObservable(
                  collection,
                  action.chosenInlineResult.query,
                  {}
                ).pipe(
                  switchMapTo(
                    of(actions.chosenInlineResult.result({ result: true }))
                  ),
                  catchError((error: any) =>
                    of(
                      actions.chosenInlineResult.error({
                        error
                      })
                    )
                  )
                );
              }
            ),
            catchError((error: any) =>
              of(
                actions.chosenInlineResult.error({
                  error
                })
              )
            )
          );
        }
      ),
      catchError((error: any) =>
        of(
          actions.chosenInlineResult.error({
            error
          })
        )
      )
    );
  };

  return action$.pipe(
    ofType(actions.chosenInlineResult.CHOSEN_INLINE_RESULT_QUERY),
    switchMap(actionObservable)
  );
};

export { chosenInlineResult };
