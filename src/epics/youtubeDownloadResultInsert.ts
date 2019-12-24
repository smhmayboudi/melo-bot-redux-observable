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
import { filterAsync } from "../libs/filterAsync";
import * as env from "../configs/env";

const youtubeDownloadResultInsert: (
  action$: Observable<IActionYoutubeDownloadResultInsert>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => Observable<IActionYoutubeDownloadResultInsert> = (
  action$: Observable<IActionYoutubeDownloadResultInsert>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
): Observable<IActionYoutubeDownloadResultInsert> => {
  const {
    authorization,
    collectionObservable,
    insertOneObservable,
    locales,
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
                        locales.find(
                          "actionYoutubeDownloadResultInsertQueryUndefined"
                        )
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
                        IStateYoutubeDownloadResultInsertQuery & {
                          _id: ObjectId;
                        }
                      >
                    ) =>
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
    filterAsync((action: IActionYoutubeDownloadResultInsert, index: number) =>
      authorization(action, state$, index)
    ),
    switchMap(actionObservable)
  );
};

export { youtubeDownloadResultInsert };
