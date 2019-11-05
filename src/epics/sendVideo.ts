import { MongoClient } from "mongodb";
import { ofType, StateObservable } from "redux-observable";
import { concat, EMPTY, Observable, ObservableInput, of } from "rxjs";
import { catchError, map, switchMap, switchMapTo } from "rxjs/operators";

import { IActionSendVideo } from "../../types/iActionSendVideo";
import { IDependencies } from "../../types/iDependencies";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import { IMessage } from "../../types/telegramBot/types/iMessage";
import * as actions from "../actions";
import * as texts from "../configs/texts";
import { transformSendVideoQuery } from "../utils/formData";
import { caption, decode } from "../utils/string";

const sendVideo: (
  action$: Observable<IActionSendVideo>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => Observable<IActionSendVideo> = (
  action$: Observable<IActionSendVideo>,
  _state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
): Observable<IActionSendVideo> => {
  const {
    botToken,
    collectionObservable,
    findOneObservable,
    insertOneObservable,
    mongoClientObservable,
    requestsUploadObservable
  } = dependencies;

  const actionObservable: (
    action: IActionSendVideo
  ) => Observable<IActionSendVideo> = (
    action: IActionSendVideo
  ): Observable<IActionSendVideo> => {
    if (botToken === undefined) {
      return of(
        actions.sendVideo.error({
          error: new Error(texts.epicDependencyBotTokenUndefined)
        })
      );
    }
    if (requestsUploadObservable === undefined) {
      return of(
        actions.sendVideo.error({
          error: new Error(
            texts.epicDependencyRequestsUploadObservableUndefined
          )
        })
      );
    }
    if (action.sendVideo.query === undefined) {
      return of(
        actions.sendVideo.error({
          error: new Error(texts.actionSendVideoQueryUndefined)
        })
      );
    }

    return requestsUploadObservable(
      {
        host: "api.telegram.org",
        path: `/bot${botToken}/sendVideo`
      },
      transformSendVideoQuery(action.sendVideo.query)
    ).pipe(
      map(
        (response: IResponse): IActionSendVideo => {
          if (response.ok) {
            return actions.sendVideo.result({
              result: response.result as IMessage
            });
          }

          return actions.sendVideo.error({
            error: response
          });
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

  const cache: (action: IActionSendVideo) => Observable<IActionSendVideo> = (
    action: IActionSendVideo
  ): Observable<IActionSendVideo> => {
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
                if (
                  action.sendVideo.result.reply_to_message.text === undefined
                ) {
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
                            error: new Error(
                              texts.actionSendVideoResultUndefined
                            )
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

  return action$.pipe(
    ofType(actions.sendVideo.SEND_VIDEO_QUERY),
    switchMap(actionObservable),
    switchMap(
      (actionResult: IActionSendVideo): ObservableInput<IActionSendVideo> =>
        concat(cache(actionResult), of(actionResult))
    )
  );
};

export { sendVideo };
