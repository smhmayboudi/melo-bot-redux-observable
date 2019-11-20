import {
  Collection,
  InsertOneWriteOpResult,
  MongoClient,
  ObjectId
} from "mongodb";
import { ofType, StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { catchError, switchMap } from "rxjs/operators";

import { IActionYoutubeDownloadResultInsert } from "../../types/iActionYoutubeDownloadResultInsert";
import { IDependencies } from "../../types/iDependencies";
import { IState } from "../../types/iState";
import { IStateYoutubeDownloadResultInsertQuery } from "../../types/iStateYoutubeDownloadResultInsertQuery";
import * as actions from "../actions";
import * as env from "../configs/env";
import * as texts from "../configs/texts";

const youtubeDownloadResultInsert: (
  action$: Observable<IActionYoutubeDownloadResultInsert>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => Observable<IActionYoutubeDownloadResultInsert> = (
  action$: Observable<IActionYoutubeDownloadResultInsert>,
  _state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
): Observable<IActionYoutubeDownloadResultInsert> => {
  const {
    collectionObservable,
    insertOneObservable,
    mongoClientObservable
  } = dependencies;

  const actionObservable: (
    action: IActionYoutubeDownloadResultInsert
  ) => Observable<IActionYoutubeDownloadResultInsert> = (
    action: IActionYoutubeDownloadResultInsert
  ): Observable<IActionYoutubeDownloadResultInsert> => {
    return mongoClientObservable().pipe(
      switchMap(
        (
          client: MongoClient
        ): Observable<IActionYoutubeDownloadResultInsert> => {
          return collectionObservable<IStateYoutubeDownloadResultInsertQuery>(
            client.db(env.DB_NAME),
            "youtubeDownloadResult",
            {}
          ).pipe(
            switchMap(
              (
                collection: Collection<IStateYoutubeDownloadResultInsertQuery>
              ): Observable<IActionYoutubeDownloadResultInsert> => {
                if (action.youtubeDownloadResultInsert.query === undefined) {
                  return of(
                    actions.youtubeDownloadResultInsert.error({
                      error: new Error(
                        texts.actionYoutubeDownloadResultInsertQueryUndefined
                      )
                    })
                  );
                }

                return insertOneObservable(
                  collection,
                  action.youtubeDownloadResultInsert.query,
                  {}
                ).pipe(
                  switchMap(
                    (
                      value: InsertOneWriteOpResult<
                        IStateYoutubeDownloadResultInsertQuery
                      >
                    ) =>
                      of(
                        actions.youtubeDownloadResultInsert.result({
                          result: (value.insertedId as ObjectId).toString()
                        })
                      )
                  ),
                  catchError((error: any) =>
                    of(
                      actions.youtubeDownloadResultInsert.error({
                        error
                      })
                    )
                  )
                );
              }
            ),
            catchError((error: any) =>
              of(
                actions.youtubeDownloadResultInsert.error({
                  error
                })
              )
            )
          );
        }
      ),
      catchError((error: any) =>
        of(
          actions.youtubeDownloadResultInsert.error({
            error
          })
        )
      )
    );
  };

  return action$.pipe(
    ofType(
      actions.youtubeDownloadResultInsert.YOUTUBE_DOWNLOAD_RESULT_INSERT_QUERY
    ),
    switchMap(actionObservable)
  );
};

export { youtubeDownloadResultInsert };
