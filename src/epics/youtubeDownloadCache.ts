import { MongoClient } from "mongodb";
import { NEVER, Observable, of } from "rxjs";
import { catchError, switchMap } from "rxjs/operators";

import { IActionYoutubeDownload } from "../../types/iActionYoutubeDownload";
import { IDependencies } from "../../types/iDependencies";
import * as actions from "../actions";
import * as texts from "../configs/texts";
import { IStateYoutubeDownloadResultInsertQuery } from "../../types/iStateYoutubeDownloadResultInsertQuery";

const cache: (
  action: IActionYoutubeDownload,
  dependencies: IDependencies
) => Observable<IActionYoutubeDownload> = (
  action: IActionYoutubeDownload,
  dependencies: IDependencies
): Observable<IActionYoutubeDownload> => {
  const {
    collectionObservable,
    findOneObservable,
    mongoClientObservable
  } = dependencies;

  if (mongoClientObservable === undefined) {
    return of(
      actions.youtubeDownload.error({
        error: new Error(
          texts.epicDependencyMongoClientObservableObservableUndefined
        )
      })
    );
  }

  return mongoClientObservable().pipe(
    switchMap(
      (client: MongoClient): Observable<IActionYoutubeDownload> => {
        if (collectionObservable === undefined) {
          return of(
            actions.youtubeDownload.error({
              error: new Error(
                texts.epicDependencyCollectionObservableUndefined
              )
            })
          );
        }

        return collectionObservable(client.db("melodio"), "cache", {}).pipe(
          switchMap(
            (collection: any): Observable<IActionYoutubeDownload> => {
              if (findOneObservable === undefined) {
                return of(
                  actions.youtubeDownload.error({
                    error: new Error(
                      texts.epicDependencyFindOneObservableUndefined
                    )
                  })
                );
              }
              if (action.youtubeDownload.query === undefined) {
                return of(
                  actions.youtubeDownload.error({
                    error: new Error(texts.actionYoutubeDownloadQueryUndefined)
                  })
                );
              }

              return findOneObservable(collection, {
                id: action.youtubeDownload.query.id
              }).pipe(
                switchMap(
                  (
                    value: IStateYoutubeDownloadResultInsertQuery | null
                  ): Observable<IActionYoutubeDownload> => {
                    if (value === null) {
                      return NEVER;
                    }
                    if (value.mime_type === undefined) {
                      return of(
                        actions.youtubeDownload.error({
                          error: new Error(
                            texts.epicYoutubeDownloadValueMimeTypeUndefined
                          )
                        })
                      );
                    }
                    if (value.thumb === undefined) {
                      return of(
                        actions.youtubeDownload.error({
                          error: new Error(
                            texts.epicYoutubeDownloadValueThumbUndefined
                          )
                        })
                      );
                    }

                    return of(
                      actions.youtubeDownload.result({
                        result: value
                      })
                    );
                  }
                ),
                catchError((error: any) =>
                  of(
                    actions.youtubeDownload.error({
                      error
                    })
                  )
                )
              );
            }
          ),
          catchError((error: any) =>
            of(
              actions.youtubeDownload.error({
                error
              })
            )
          )
        );
      }
    ),
    catchError((error: any) =>
      of(
        actions.youtubeDownload.error({
          error
        })
      )
    )
  );
};

export { cache };
