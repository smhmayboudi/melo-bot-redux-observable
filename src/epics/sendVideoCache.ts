import { MongoClient } from "mongodb";
import { EMPTY, Observable, of } from "rxjs";
import { catchError, switchMap, switchMapTo } from "rxjs/operators";

import { IActionSendVideo } from "../../types/iActionSendVideo";
import { IDependencies } from "../../types/iDependencies";
import * as actions from "../actions";
import * as texts from "../configs/texts";
import { caption, decode } from "../utils/string";

const cache: (
  action: IActionSendVideo,
  dependencies: IDependencies
) => Observable<IActionSendVideo> = (
  action: IActionSendVideo,
  dependencies: IDependencies
): Observable<IActionSendVideo> => {
  const {
    collectionObservable,
    findOneObservable,
    insertOneObservable,
    mongoClientObservable
  } = dependencies;

  if (action.type === actions.sendVideo.SEND_VIDEO_ERROR) {
    return EMPTY;
  }
  if (mongoClientObservable === undefined) {
    return of(
      actions.sendVideo.error({
        error: new Error(
          texts.epicDependencyMongoClientObservableObservableUndefined
        )
      })
    );
  }

  return mongoClientObservable().pipe(
    switchMap(
      (client: MongoClient): Observable<IActionSendVideo> => {
        if (collectionObservable === undefined) {
          return of(
            actions.sendVideo.error({
              error: new Error(
                texts.epicDependencyCollectionObservableUndefined
              )
            })
          );
        }

        return collectionObservable(client.db("melodio"), "cache", {}).pipe(
          switchMap(
            (collection: any): Observable<IActionSendVideo> => {
              if (findOneObservable === undefined) {
                return of(
                  actions.sendVideo.error({
                    error: new Error(
                      texts.epicDependencyFindOneObservableUndefined
                    )
                  })
                );
              }
              if (action.sendVideo.result === undefined) {
                return of(
                  actions.sendVideo.error({
                    error: new Error(texts.actionSendVideoResultUndefined)
                  })
                );
              }
              if (action.sendVideo.result.reply_to_message === undefined) {
                return of(
                  actions.sendVideo.error({
                    error: new Error(
                      texts.actionSendVideoResultReplyToMessageUndefined
                    )
                  })
                );
              }
              if (action.sendVideo.result.reply_to_message.text === undefined) {
                return of(
                  actions.sendVideo.error({
                    error: new Error(
                      texts.actionSendVideoResultReplyToMessageTextUndefined
                    )
                  })
                );
              }

              const id: string = decode(
                action.sendVideo.result.reply_to_message.text
                  .replace(
                    `/${texts.commandDownload}${texts.commandSeparator}`,
                    ""
                  )
                  .trim()
              );

              return findOneObservable(collection, {
                id
              }).pipe(
                switchMap(
                  (value: any): Observable<IActionSendVideo> => {
                    if (value !== null) {
                      return EMPTY;
                    }
                    if (insertOneObservable === undefined) {
                      return of(
                        actions.sendVideo.error({
                          error: new Error(
                            texts.epicDependencyInsertOneObservableUndefined
                          )
                        })
                      );
                    }
                    if (action.sendVideo.result === undefined) {
                      return of(
                        actions.sendVideo.error({
                          error: new Error(texts.actionSendVideoResultUndefined)
                        })
                      );
                    }
                    if (action.sendVideo.result.caption === undefined) {
                      return of(
                        actions.sendVideo.error({
                          error: new Error(
                            texts.actionSendVideoResultCaptionUndefined
                          )
                        })
                      );
                    }

                    return insertOneObservable(
                      collection,
                      {
                        id,
                        title: action.sendVideo.result.caption
                          .replace(caption(""), "")
                          .trim(),
                        ...action.sendVideo.result.video
                      },
                      {}
                    ).pipe(
                      switchMapTo(EMPTY),
                      catchError((error: any) =>
                        of(
                          actions.sendVideo.error({
                            error
                          })
                        )
                      )
                    );
                  }
                ),
                catchError((error: any) =>
                  of(
                    actions.sendVideo.error({
                      error
                    })
                  )
                )
              );
            }
          ),
          catchError((error: any) =>
            of(
              actions.sendVideo.error({
                error
              })
            )
          )
        );
      }
    ),
    catchError((error: any) =>
      of(
        actions.sendVideo.error({
          error
        })
      )
    )
  );
};

export { cache };
