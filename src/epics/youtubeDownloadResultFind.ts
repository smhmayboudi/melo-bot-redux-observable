import { Collection, MongoClient } from "mongodb";
import { ofType, StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { catchError, switchMap } from "rxjs/operators";

import { IActionYoutubeDownloadResultFind } from "../../types/iActionYoutubeDownloadResultFind";
import { IDependencies } from "../../types/iDependencies";
import { IState } from "../../types/iState";
import { IStateYoutubeDownloadResultInsertQuery } from "../../types/iStateYoutubeDownloadResultInsertQuery";
import * as actions from "../actions";
import * as env from "../configs/env";
import * as texts from "../configs/texts";

const youtubeDownloadResultFind: (
  action$: Observable<IActionYoutubeDownloadResultFind>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => Observable<IActionYoutubeDownloadResultFind> = (
  action$: Observable<IActionYoutubeDownloadResultFind>,
  _state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
): Observable<IActionYoutubeDownloadResultFind> => {
  const {
    collectionObservable,
    findOneObservable,
    mongoClientObservable
  } = dependencies;

  const actionObservable: (
    action: IActionYoutubeDownloadResultFind
  ) => Observable<IActionYoutubeDownloadResultFind> = (
    action: IActionYoutubeDownloadResultFind
  ): Observable<IActionYoutubeDownloadResultFind> => {
    return mongoClientObservable().pipe(
      switchMap(
        (client: MongoClient): Observable<IActionYoutubeDownloadResultFind> => {
          return collectionObservable<IStateYoutubeDownloadResultInsertQuery>(
            client.db(env.DB_NAME),
            "youtubeDownloadResult",
            {}
          ).pipe(
            switchMap(
              (
                collection: Collection<IStateYoutubeDownloadResultInsertQuery>
              ): Observable<IActionYoutubeDownloadResultFind> => {
                if (action.youtubeDownloadResultFind.query === undefined) {
                  return of(
                    actions.youtubeDownloadResultFind.error({
                      error: new Error(
                        texts.actionYoutubeDownloadResultFindQueryUndefined
                      )
                    })
                  );
                }

                return findOneObservable(collection, {
                  id: action.youtubeDownloadResultFind.query.id
                }).pipe(
                  switchMap(
                    (value: IStateYoutubeDownloadResultInsertQuery | null) =>
                      of(
                        actions.youtubeDownloadResultFind.result({
                          result: value === null ? undefined : value
                        })
                      )
                  ),
                  catchError((error: any) =>
                    of(
                      actions.youtubeDownloadResultFind.error({
                        error
                      })
                    )
                  )
                );
              }
            ),
            catchError((error: any) =>
              of(
                actions.youtubeDownloadResultFind.error({
                  error
                })
              )
            )
          );
        }
      ),
      catchError((error: any) =>
        of(
          actions.youtubeDownloadResultFind.error({
            error
          })
        )
      )
    );
  };

  return action$.pipe(
    ofType(
      actions.youtubeDownloadResultFind.YOUTUBE_DOWNLOAD_RESULT_FIND_QUERY
    ),
    switchMap(actionObservable)
  );
};

export { youtubeDownloadResultFind };
