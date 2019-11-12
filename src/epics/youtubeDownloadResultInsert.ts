import { InsertOneWriteOpResult, MongoClient } from "mongodb";
import { ofType, StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { catchError, switchMap } from "rxjs/operators";

import { IActionYoutubeDownloadResultInsert } from "../../types/iActionYoutubeDownloadResultInsert";
import { IDependencies } from "../../types/iDependencies";
import { IState } from "../../types/iState";
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
    if (mongoClientObservable === undefined) {
      return of(
        actions.youtubeDownloadResultInsert.error({
          error: new Error(texts.epicDependencyMongoClientObservableUndefined)
        })
      );
    }

    return mongoClientObservable().pipe(
      switchMap(
        (
          client: MongoClient
        ): Observable<IActionYoutubeDownloadResultInsert> => {
          if (collectionObservable === undefined) {
            return of(
              actions.youtubeDownloadResultInsert.error({
                error: new Error(
                  texts.epicDependencyCollectionObservableUndefined
                )
              })
            );
          }

          return collectionObservable(
            client.db(env.DB_NAME),
            "youtubeDownloadResult",
            {}
          ).pipe(
            switchMap(
              (
                collection: any
              ): Observable<IActionYoutubeDownloadResultInsert> => {
                if (insertOneObservable === undefined) {
                  return of(
                    actions.youtubeDownloadResultInsert.error({
                      error: new Error(
                        texts.epicDependencyInsertOneObservableUndefined
                      )
                    })
                  );
                }
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
                  switchMap((value: InsertOneWriteOpResult<any>) =>
                    of(
                      actions.youtubeDownloadResultInsert.result({
                        result: value.insertedId.toString()
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
