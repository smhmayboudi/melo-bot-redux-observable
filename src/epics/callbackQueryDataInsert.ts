import {
  Collection,
  InsertOneWriteOpResult,
  MongoClient,
  ObjectId
} from "mongodb";
import { ofType, StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { catchError, switchMap } from "rxjs/operators";

import { IActionCallbackQueryDataInsert } from "../../types/iActionCallbackQueryDataInsert";
import { IDependencies } from "../../types/iDependencies";
import { IState } from "../../types/iState";
import { IStateCallbackQueryDataInsertQuery } from "../../types/iStateCallbackQueryDataInsertQuery";
import * as actions from "../actions";
import { filterAsync } from "../libs/filterAsync";
import * as env from "../configs/env";

const callbackQueryDataInsert: (
  action$: Observable<IActionCallbackQueryDataInsert>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => Observable<IActionCallbackQueryDataInsert> = (
  action$: Observable<IActionCallbackQueryDataInsert>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
): Observable<IActionCallbackQueryDataInsert> => {
  const {
    authorization,
    collectionObservable,
    insertOneObservable,
    locales,
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
          return collectionObservable<IStateCallbackQueryDataInsertQuery>(
            client.db(env.DB_NAME),
            "callbackQueryData",
            {}
          ).pipe(
            switchMap(
              (
                collection: Collection<IStateCallbackQueryDataInsertQuery>
              ): Observable<IActionCallbackQueryDataInsert> => {
                if (action.callbackQueryDataInsert.query === undefined) {
                  return of(
                    actions.callbackQueryDataInsert.error({
                      error: new Error(
                        locales.find(
                          "actionCallbackQueryDataInsertQueryUndefined"
                        )
                      )
                    })
                  );
                }

                return insertOneObservable(
                  collection,
                  action.callbackQueryDataInsert.query,
                  {}
                ).pipe(
                  switchMap(
                    (
                      value: InsertOneWriteOpResult<
                        IStateCallbackQueryDataInsertQuery & { _id: ObjectId }
                      >
                    ) =>
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
    filterAsync((action: IActionCallbackQueryDataInsert, index: number) =>
      authorization(action, state$, index)
    ),
    switchMap(actionObservable)
  );
};

export { callbackQueryDataInsert };
