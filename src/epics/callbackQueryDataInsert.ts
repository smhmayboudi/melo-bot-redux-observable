import { InsertOneWriteOpResult, MongoClient } from "mongodb";
import { ofType, StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { catchError, switchMap } from "rxjs/operators";

import { IActionCallbackQueryDataInsert } from "../../types/iActionCallbackQueryDataInsert";
import { IDependencies } from "../../types/iDependencies";
import { IState } from "../../types/iState";
import * as actions from "../actions";
import * as env from "../configs/env";
import * as texts from "../configs/texts";

const callbackQueryDataInsert: (
  action$: Observable<IActionCallbackQueryDataInsert>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => Observable<IActionCallbackQueryDataInsert> = (
  action$: Observable<IActionCallbackQueryDataInsert>,
  _state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
): Observable<IActionCallbackQueryDataInsert> => {
  const {
    collectionObservable,
    insertOneObservable,
    mongoClientObservable
  } = dependencies;

  const actionObservable: (
    action: IActionCallbackQueryDataInsert
  ) => Observable<IActionCallbackQueryDataInsert> = (
    action: IActionCallbackQueryDataInsert
  ): Observable<IActionCallbackQueryDataInsert> => {
    return mongoClientObservable().pipe(
      switchMap(
        (client: MongoClient): Observable<IActionCallbackQueryDataInsert> => {
          return collectionObservable(
            client.db(env.DB_NAME),
            "callbackQueryData",
            {}
          ).pipe(
            switchMap(
              (collection: any): Observable<IActionCallbackQueryDataInsert> => {
                if (action.callbackQueryDataInsert.query === undefined) {
                  return of(
                    actions.callbackQueryDataInsert.error({
                      error: new Error(
                        texts.actionCallbackQueryDataInsertQueryUndefined
                      )
                    })
                  );
                }

                return insertOneObservable(
                  collection,
                  action.callbackQueryDataInsert.query,
                  {}
                ).pipe(
                  switchMap((value: InsertOneWriteOpResult<any>) =>
                    of(
                      actions.callbackQueryDataInsert.result({
                        result: value.insertedId.toString()
                      })
                    )
                  ),
                  catchError((error: any) =>
                    of(
                      actions.callbackQueryDataInsert.error({
                        error
                      })
                    )
                  )
                );
              }
            ),
            catchError((error: any) =>
              of(
                actions.callbackQueryDataInsert.error({
                  error
                })
              )
            )
          );
        }
      ),
      catchError((error: any) =>
        of(
          actions.callbackQueryDataInsert.error({
            error
          })
        )
      )
    );
  };

  return action$.pipe(
    ofType(actions.callbackQueryDataInsert.CALLBACK_QUERY_DATA_INSERT_QUERY),
    switchMap(actionObservable)
  );
};

export { callbackQueryDataInsert };
