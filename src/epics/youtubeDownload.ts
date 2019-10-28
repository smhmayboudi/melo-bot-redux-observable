import * as fs from "fs";
import { MongoClient } from "mongodb";
import { ofType, StateObservable } from "redux-observable";
import { NEVER, Observable, ObservableInput, of, race } from "rxjs";
import {
  catchError,
  filter,
  map,
  startWith,
  switchMap,
  switchMapTo,
  take
} from "rxjs/operators";

import { IActionGetChatMember } from "../../types/iActionGetChatMember";
import { IActionSendVideo } from "../../types/iActionSendVideo";
import { IActionYoutubeDownload } from "../../types/iActionYoutubeDownload";
import { IDependencies } from "../../types/iDependencies";
import { IState } from "../../types/iState";
import { IVideoInfo } from "../../types/libs/iVideoInfo";
import { IVideo } from "../../types/telegramBot/types/iVideo";
import * as actions from "../actions";
import * as texts from "../configs/texts";
import { actionGetChatMemberResultStatus } from "../utils/boolean";
import { caption, decode, pathThumb, pathVideo } from "../utils/string";

const youtubeDownload: (
  action$: Observable<IActionYoutubeDownload>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => Observable<
  IActionGetChatMember | IActionSendVideo | IActionYoutubeDownload
> = (
  action$: Observable<IActionYoutubeDownload>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
): Observable<
  IActionGetChatMember | IActionSendVideo | IActionYoutubeDownload
> => {
  const {
    collectionObservable,
    findOneObservable,
    mongoClientObservable,
    testAction$,
    youtubeDownloadObservable
  } = dependencies;

  const actionObservable: (
    action: IActionYoutubeDownload
  ) => Observable<IActionYoutubeDownload> = (
    action: IActionYoutubeDownload
  ): Observable<IActionYoutubeDownload> => {
    if (youtubeDownloadObservable === undefined) {
      return of(
        actions.youtubeDownload.error({
          error: new Error(
            texts.epicDependencyYoutubeDownloadObservableUndefined
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

    return youtubeDownloadObservable(
      decode(action.youtubeDownload.query as string)
    ).pipe(
      map(
        (result: IVideoInfo): IActionYoutubeDownload =>
          actions.youtubeDownload.result({
            result
          })
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

  const cache: (
    action: IActionYoutubeDownload
  ) => Observable<IActionYoutubeDownload> = (
    action: IActionYoutubeDownload
  ): Observable<IActionYoutubeDownload> => {
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
                      error: new Error(
                        texts.actionYoutubeDownloadQueryUndefined
                      )
                    })
                  );
                }

                return findOneObservable(collection, {
                  id: decode(action.youtubeDownload.query as string)
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
                              texts.epicYoutubeFindOneObservableDownloadValueMimeTypeUndefined
                            )
                          })
                        );
                      }
                      if (value.thumb === undefined) {
                        return of(
                          actions.youtubeDownload.error({
                            error: new Error(
                              texts.epicYoutubeFindOneObservableDownloadValueThumbUndefined
                            )
                          })
                        );
                      }

                      const videoInfo: IVideoInfo = {
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
                      };

                      return of(
                        actions.youtubeDownload.result({
                          result: videoInfo
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

  const transformObservable: (
    action: IActionYoutubeDownload
  ) => Observable<IActionYoutubeDownload | IActionSendVideo> = (
    action: IActionYoutubeDownload
  ): Observable<IActionYoutubeDownload | IActionSendVideo> => {
    if (action.type === actions.youtubeDownload.YOUTUBE_DOWNLOAD_ERROR) {
      return of(action);
    }
    if (action.youtubeDownload.result === undefined) {
      return of(
        actions.youtubeDownload.error({
          error: new Error(texts.actionYoutubeDownloadResultUndefined)
        })
      );
    }
    if (state$ === undefined) {
      return of(
        actions.youtubeDownload.error({
          error: new Error(texts.state$Undefined)
        })
      );
    }
    if (state$.value.message.query === undefined) {
      return of(
        actions.youtubeDownload.error({
          error: new Error(texts.state$ValueMessageQueryUndefined)
        })
      );
    }
    if (state$.value.message.query.message === undefined) {
      return of(
        actions.youtubeDownload.error({
          error: new Error(texts.state$ValueMessageQueryMessageUndefined)
        })
      );
    }

    const videoInfo: IVideoInfo = action.youtubeDownload.result;
    const thumb: string | fs.ReadStream =
      videoInfo.thumbnailFileId !== undefined
        ? videoInfo.thumbnailFileId
        : fs.createReadStream(pathThumb(videoInfo.id));
    const video: string | fs.ReadStream =
      videoInfo.fileId !== undefined
        ? videoInfo.fileId
        : fs.createReadStream(pathVideo(videoInfo.id));
    const chatId: number = state$.value.message.query.message.chat.id;
    const messageId: number = state$.value.message.query.message.message_id;

    return of(
      actions.sendVideo.query({
        query: {
          caption: caption(videoInfo.title),
          chat_id: chatId,
          disable_notification: true,
          duration: videoInfo.dur,
          height: videoInfo.fmtList.height,
          parse_mode: "HTML",
          reply_to_message_id: messageId,
          reply_markup: {
            inline_keyboard: [
              [
                {
                  callback_data: "callback_data:OK",
                  text: "OK"
                },
                {
                  callback_data: "callback_data:NOK",
                  text: "NOK"
                }
              ]
            ]
          },
          supports_streaming: true,
          thumb,
          video,
          width: videoInfo.fmtList.width
        }
      })
    );
  };

  const startAction: () => IActionGetChatMember | IActionYoutubeDownload = ():
    | IActionGetChatMember
    | IActionYoutubeDownload => {
    if (state$ === undefined) {
      return actions.youtubeDownload.error({
        error: new Error(texts.state$Undefined)
      });
    }
    if (state$.value.message.query === undefined) {
      return actions.youtubeDownload.error({
        error: new Error(texts.state$ValueMessageQueryUndefined)
      });
    }
    if (state$.value.message.query.message === undefined) {
      return actions.youtubeDownload.error({
        error: new Error(texts.state$ValueMessageQueryMessageUndefined)
      });
    }

    return actions.getChatMember.query({
      query: {
        chat_id: "@melodio",
        user_id: state$.value.message.query.message.chat.id
      }
    });
  };

  return action$.pipe(
    ofType(actions.youtubeDownload.YOUTUBE_DOWNLOAD_QUERY),
    switchMap(
      (
        action: IActionYoutubeDownload
      ): ObservableInput<
        IActionGetChatMember | IActionSendVideo | IActionYoutubeDownload
      > =>
        ((): Observable<any> =>
          testAction$ === undefined ? action$ : testAction$())().pipe(
          ofType(actions.getChatMember.GET_CHAT_MEMBER_RESULT),
          take(1),
          filter(actionGetChatMemberResultStatus),
          switchMapTo(race(actionObservable(action), cache(action))),
          switchMap(transformObservable),
          startWith(startAction())
        )
    )
  );
};

export { youtubeDownload };
