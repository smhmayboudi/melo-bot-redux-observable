import { Collection, MongoClient, ObjectId } from "mongodb";
import { ofType, StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { catchError, switchMap } from "rxjs/operators";

import { IActionCallbackQueryDataFind } from "../../types/iActionCallbackQueryDataFind";
import { IDependencies } from "../../types/iDependencies";
import { IState } from "../../types/iState";
import { IStateCallbackQueryDataInsertQuery } from "../../types/iStateCallbackQueryDataInsertQuery";
import * as actions from "../actions";
import * as env from "../configs/env";

const callbackQueryDataFind: (
  action$: Observable<IActionCallbackQueryDataFind>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => Observable<IActionCallbackQueryDataFind> = (
  action$: Observable<IActionCallbackQueryDataFind>,
  _state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
): Observable<IActionCallbackQueryDataFind> => {
  const {
    collectionObservable,
    findOneObservable,
    locales,
    mongoClientObservable
  } = dependencies;

  const actionObservable: (
    action: IActionCallbackQueryDataFind
  ) => Observable<IActionCallbackQueryDataFind> = (
    action: IActionCallbackQueryDataFind
  ): Observable<IActionCallbackQueryDataFind> => {
    return mongoClientObservable().pipe(
      switchMap(
        (client: MongoClient): Observable<IActionCallbackQueryDataFind> => {
          return collectionObservable<IStateCallbackQueryDataInsertQuery>(
            client.db(env.DB_NAME),
            "callbackQueryData",
            {}
          ).pipe(
            switchMap(
              (
                collection: Collection<IStateCallbackQueryDataInsertQuery>
              ): Observable<IActionCallbackQueryDataFind> => {
                if (action.callbackQueryDataFind.query === undefined) {
                  return of(
                    actions.callbackQueryDataFind.error({
                      error: new Error(
                        locales.find(
                          "actionCallbackQueryDataFindQueryUndefined"
                        )
                      )
                    })
                  );
                }

                return findOneObservable(collection, {
                  _id: new ObjectId(action.callbackQueryDataFind.query.id)
                }).pipe(
                  switchMap(
                    (value: IStateCallbackQueryDataInsertQuery | null) =>
                      of(
                        actions.callbackQueryDataFind.result({
                          result: value
                        })
                      )
                  ),
                  catchError((error: any) =>
                    of(
                      actions.callbackQueryDataFind.error({
                        error
                      })
                    )
                  )
                );
              }
            ),
            catchError((error: any) =>
              of(
                actions.callbackQueryDataFind.error({
                  error
                })
              )
            )
          );
        }
      ),
      catchError((error: any) =>
        of(
          actions.callbackQueryDataFind.error({
            error
          })
        )
      )
    );
  };

  return action$.pipe(
    ofType(actions.callbackQueryDataFind.CALLBACK_QUERY_DATA_FIND_QUERY),
    switchMap(actionObservable)
  );
};

export { callbackQueryDataFind };
