import { Collection, MongoClient, ObjectId } from "mongodb";
import { ofType, StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { catchError, switchMap } from "rxjs/operators";

import { IActionCallbackQueryDataFind } from "../../types/iActionCallbackQueryDataFind";
import { IActionYoutubeSearchList } from "../../types/iActionYoutubeSearchList";
import { IActionYoutubeVideoList } from "../../types/iActionYoutubeVideoList";
import { IDependencies } from "../../types/iDependencies";
import { IState } from "../../types/iState";
import { IStateCallbackQueryDataInsertQuery } from "../../types/iStateCallbackQueryDataInsertQuery";
import * as actions from "../actions";
import * as env from "../configs/env";
import * as texts from "../configs/texts";

import { transformObservable as transformObservableToSendMessage } from "./callbackQueryDataFindToSendMessage";

const callbackQueryDataFind: (
  action$: Observable<IActionCallbackQueryDataFind>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => Observable<
  | IActionCallbackQueryDataFind
  | IActionYoutubeSearchList
  | IActionYoutubeVideoList
> = (
  action$: Observable<IActionCallbackQueryDataFind>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
): Observable<
  | IActionCallbackQueryDataFind
  | IActionYoutubeSearchList
  | IActionYoutubeVideoList
> => {
  const {
    collectionObservable,
    findOneObservable,
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
                        texts.actionCallbackQueryDataFindQueryUndefined
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
                          result: value === null ? undefined : value
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
    switchMap(actionObservable),
    switchMap(transformObservableToSendMessage(state$))
  );
};

export { callbackQueryDataFind };
