import { MongoClient } from "mongodb";
import { NEVER, Observable, of } from "rxjs";
import { catchError, switchMap } from "rxjs/operators";

import { IActionYoutubeDownload } from "../../types/iActionYoutubeDownload";
import { IDependencies } from "../../types/iDependencies";
import { IVideo } from "../../types/telegramBot/types/iVideo";
import * as actions from "../actions";
import * as texts from "../configs/texts";

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
                id: action.youtubeDownload.query as string
              }).pipe(
                switchMap(
                  (
                    value: IVideo & { id: string; title: string } | null
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
                        result: {
                          dur: value.duration,
                          fileId: value.file_id,
                          fmtList: {
                            height: value.height,
                            itag: 0,
                            width: value.width
                          },
                          id: value.id,
                          itag: 0,
                          mime: value.mime_type,
                          thumbnailFileId: value.thumb.file_id,
                          thumbnailUrl: "",
                          title: value.title,
                          url: ""
                        }
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
