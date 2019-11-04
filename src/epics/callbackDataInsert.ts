import { InsertOneWriteOpResult, MongoClient } from "mongodb";
import { ofType, StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { catchError, switchMap } from "rxjs/operators";

import { IActionCallbackDataInsert } from "../../types/iActionCallbackDataInsert";
import { IDependencies } from "../../types/iDependencies";
import { IState } from "../../types/iState";
import * as actions from "../actions";
import * as texts from "../configs/texts";

const callbackDataInsert: (
  action$: Observable<IActionCallbackDataInsert>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => Observable<IActionCallbackDataInsert> = (
  action$: Observable<IActionCallbackDataInsert>,
  _state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
): Observable<IActionCallbackDataInsert> => {
  const {
    collectionObservable,
    insertOneObservable,
    mongoClientObservable
  } = dependencies;

  const actionObservable: (
    action: IActionCallbackDataInsert
  ) => Observable<IActionCallbackDataInsert> = (
    action: IActionCallbackDataInsert
  ): Observable<IActionCallbackDataInsert> => {
    if (mongoClientObservable === undefined) {
      return of(
        actions.callbackDataInsert.error({
          error: new Error(
            texts.epicDependencyMongoClientObservableObservableUndefined
          )
        })
      );
    }

    return mongoClientObservable().pipe(
      switchMap(
        (client: MongoClient): Observable<IActionCallbackDataInsert> => {
          if (collectionObservable === undefined) {
            return of(
              actions.callbackDataInsert.error({
                error: new Error(
                  texts.epicDependencyCollectionObservableUndefined
                )
              })
            );
          }

          return collectionObservable(
            client.db("melodio"),
            "callbackData",
            {}
          ).pipe(
            switchMap(
              (collection: any): Observable<IActionCallbackDataInsert> => {
                if (insertOneObservable === undefined) {
                  return of(
                    actions.callbackDataInsert.error({
                      error: new Error(
                        texts.epicDependencyInsertOneObservableUndefined
                      )
                    })
                  );
                }
                if (action.callbackDataInsert.query === undefined) {
                  return of(
                    actions.callbackDataInsert.error({
                      error: new Error(
                        texts.actionCallbackDataInsertQueryUndefined
                      )
                    })
                  );
                }

                return insertOneObservable(
                  collection,
                  action.callbackDataInsert.query,
                  {}
                ).pipe(
                  switchMap((value: InsertOneWriteOpResult<any>) =>
                    of(
                      actions.callbackDataInsert.result({
                        result: value.insertedId.toString()
                      })
                    )
                  ),
                  catchError((error: any) =>
                    of(
                      actions.callbackDataInsert.error({
                        error
                      })
                    )
                  )
                );
              }
            ),
            catchError((error: any) =>
              of(
                actions.callbackDataInsert.error({
                  error
                })
              )
            )
          );
        }
      ),
      catchError((error: any) =>
        of(
          actions.callbackDataInsert.error({
            error
          })
        )
      )
    );
  };

  return action$.pipe(
    ofType(actions.callbackDataInsert.CALLBACK_DATA_INSERT_QUERY),
    switchMap(actionObservable)
  );
};

export { callbackDataInsert };
