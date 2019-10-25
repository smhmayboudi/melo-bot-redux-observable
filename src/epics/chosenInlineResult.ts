import { MongoClient } from "mongodb";
import { ofType, StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { catchError, switchMap, switchMapTo } from "rxjs/operators";

import { IActionChosenInlineResult } from "../../types/iActionChosenInlineResult";
import { IDependencies } from "../../types/iDependencies";
import { IState } from "../../types/iState";
import * as actions from "../actions";
import * as texts from "../configs/texts";

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
    mongoClientObservable
  } = dependencies;

  const actionObservable: (
    action: IActionChosenInlineResult
  ) => Observable<IActionChosenInlineResult> = (
    action: IActionChosenInlineResult
  ): Observable<IActionChosenInlineResult> => {
    if (mongoClientObservable === undefined) {
      return of(
        actions.chosenInlineResult.error({
          error: new Error(
            texts.epicDependencyMongoClientObservableObservableUndefined
          )
        })
      );
    }

    return mongoClientObservable().pipe(
      switchMap(
        (client: MongoClient): Observable<IActionChosenInlineResult> => {
          if (collectionObservable === undefined) {
            return of(
              actions.chosenInlineResult.error({
                error: new Error(
                  texts.epicDependencyCollectionObservableUndefined
                )
              })
            );
          }

          return collectionObservable(
            client.db("melodio"),
            "chosenInlineResult",
            {}
          ).pipe(
            switchMap(
              (collection: any): Observable<IActionChosenInlineResult> => {
                if (insertOneObservable === undefined) {
                  return of(
                    actions.chosenInlineResult.error({
                      error: new Error(
                        texts.epicDependencyInsertOneObservableUndefined
                      )
                    })
                  );
                }
                if (action.chosenInlineResult.query === undefined) {
                  return of(
                    actions.chosenInlineResult.error({
                      error: new Error(
                        texts.actionChosenInlineResultQueryUndefined
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
