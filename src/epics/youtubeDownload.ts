import * as fs from "fs";
import { Db, MongoClient } from "mongodb";
import { ofType, StateObservable } from "redux-observable";
import { NEVER, Observable, ObservableInput, of, race } from "rxjs";
import { catchError, filter, map, startWith, switchMap, switchMapTo, take } from "rxjs/operators";

import { IActionGetChatMember } from "../../types/iActionGetChatMember";
import { IActionSendVideo } from "../../types/iActionSendVideo";
import { IActionYoutubeDownload } from "../../types/iActionYoutubeDownload";
import { IDependencies } from "../../types/iDependencies";
import { IState } from "../../types/iState";
import { IVideoInfo } from "../../types/lib/iVideoInfo";
import { IVideo } from "../../types/telegramBot/types/iVideo";
import * as actions from "../actions";
import * as texts from "../config/texts";
import { actionGetChatMemberResultStatus } from "../utils/boolean";
import { caption, decode, pathThumb, pathVideo } from "../utils/string";

const youtubeDownload:
  (
    action$: Observable<IActionYoutubeDownload>,
    state$: StateObservable<IState> | undefined,
    dependencies: IDependencies,
  ) => Observable<IActionGetChatMember | IActionSendVideo> =
  (
    action$: Observable<IActionYoutubeDownload>,
    state$: StateObservable<IState> | undefined,
    dependencies: IDependencies,
  ): Observable<IActionGetChatMember | IActionSendVideo> => {
    const {
      collectionObservable,
      findOneObservable,
      mongoClientObservable,
      testAction$,
      youtubeDownloadObservable,
    } = dependencies;

    const actionObservable:
      (action: IActionYoutubeDownload) => Observable<IActionYoutubeDownload> =
      (action: IActionYoutubeDownload): Observable<IActionYoutubeDownload> => {
        if (youtubeDownloadObservable === undefined) {
          return of(actions.youtubeDownload.error({
            error: new Error(texts.epicDependencyYoutubeDownloadObservableUndefined),
          }));
        }
        if (action.youtubeDownload.query === undefined) {
          return of(actions.youtubeDownload.error({
            error: new Error(texts.actionYoutubeDownloadQueryUndefined),
          }));
        }

        const id: string = decode(action.youtubeDownload.query);

        return youtubeDownloadObservable(id)
          .pipe(
            map((result: IVideoInfo): IActionYoutubeDownload =>
              actions.youtubeDownload.result({
                result,
              }),
            ),
            catchError((error: any) => of(actions.youtubeDownload.error({
              error,
            }))),
          );
      };

    const cache:
      (action: IActionYoutubeDownload) => Observable<IActionYoutubeDownload> =
      (action: IActionYoutubeDownload): Observable<IActionYoutubeDownload> => {
        if (mongoClientObservable === undefined) {
          return of(actions.youtubeDownload.error({
            error: new Error(texts.epicDependencyMongoClientObservableObservableUndefined),
          }));
        }

        return mongoClientObservable()
          .pipe(
            switchMap((client: MongoClient): Observable<IActionYoutubeDownload> => {
              if (collectionObservable === undefined) {
                return of(actions.youtubeDownload.error({
                  error: new Error(texts.epicDependencyCollectionObservableUndefined),
                }));
              }

              const db: Db = client.db("melodio");

              return collectionObservable(db, "cache", {})
                .pipe(
                  switchMap((collection: any): Observable<IActionYoutubeDownload> => {
                    if (findOneObservable === undefined) {
                      return of(actions.youtubeDownload.error({
                        error: new Error(texts.epicDependencyFindOneObservableUndefined),
                      }));
                    }
                    if (action.youtubeDownload.query === undefined) {
                      return of(actions.youtubeDownload.error({
                        error: new Error(texts.actionYoutubeDownloadQueryUndefined),
                      }));
                    }

                    const id: string = decode(action.youtubeDownload.query);

                    return findOneObservable(
                      collection,
                      {
                        id,
                      },
                    )
                      .pipe(
                        switchMap((value: IVideo & { id: string; title: string } | null): Observable<IActionYoutubeDownload> => {
                          if (value === null) {
                            return NEVER;
                          }
                          if (value.mime_type === undefined) {
                            return NEVER;
                          }
                          if (value.thumb === undefined) {
                            return NEVER;
                          }

                          const videoInfo: IVideoInfo = {
                            dur: value.duration,
                            fileId: value.file_id,
                            fmtList: {
                              height: value.height,
                              itag: 0,
                              width: value.width,
                            },
                            id: value.id,
                            itag: 0,
                            mime: value.mime_type,
                            thumbnailFileId: value.thumb.file_id,
                            thumbnailUrl: "",
                            title: value.title,
                            url: "",
                          };

                          return of(actions.youtubeDownload.result({
                            result: videoInfo,
                          }));
                        }),
                        catchError((error: any) => of(actions.youtubeDownload.error({
                          error,
                        }))),
                      );
                  }),
                  catchError((error: any) => of(actions.youtubeDownload.error({
                    error,
                  }))),
                );
            }),
            catchError((error: any) => of(actions.youtubeDownload.error({
              error,
            }))),
          );
      };

    const transformObservable:
      (action: IActionYoutubeDownload) => Observable<IActionSendVideo> =
      (action: IActionYoutubeDownload): Observable<IActionSendVideo> => {
        if (action.type === actions.youtubeDownload.YOUTUBE_DOWNLOAD_ERROR) {
          return of(actions.sendVideo.error({
            error: action.youtubeDownload.error,
          }));
        }
        if (action.youtubeDownload.result === undefined) {
          return of(actions.sendVideo.error({
            error: new Error(texts.actionYoutubeDownloadResultUndefined),
          }));
        }
        if (state$ === undefined) {
          return of(actions.sendVideo.error({
            error: new Error(texts.state$Undefined),
          }));
        }
        if (state$.value.message.query === undefined) {
          return of(actions.sendVideo.error({
            error: new Error(texts.state$ValueMessageQueryUndefined),
          }));
        }
        if (state$.value.message.query.message === undefined) {
          return of(actions.sendVideo.error({
            error: new Error(texts.state$ValueMessageQueryMessageUndefined),
          }));
        }

        const videoInfo: IVideoInfo = action.youtubeDownload.result;
        const thumb: string | fs.ReadStream = videoInfo.thumbnailFileId !== undefined ?
          videoInfo.thumbnailFileId : fs.createReadStream(pathThumb(videoInfo.id));
        const video: string | fs.ReadStream = videoInfo.fileId !== undefined ?
          videoInfo.fileId : fs.createReadStream(pathVideo(videoInfo.id));
        const chatId: number = state$.value.message.query.message.chat.id;
        const messageId: number = state$.value.message.query.message.message_id;

        return of(actions.sendVideo.query({
          query:
          {
            caption: caption(videoInfo.title),
            chat_id: chatId,
            disable_notification: true,
            duration: videoInfo.dur,
            height: videoInfo.fmtList.height,
            parse_mode: "HTML",
            reply_markup: { remove_keyboard: true },
            reply_to_message_id: messageId,
            supports_streaming: true,
            thumb,
            video,
            width: videoInfo.fmtList.width,
          },
        }));
      };

    const startAction:
      () => IActionGetChatMember =
      (): IActionGetChatMember => {
        if (state$ === undefined) {
          return actions.getChatMember.error({
            error: new Error(texts.state$Undefined),
          });
        }
        if (state$.value.message.query === undefined) {
          return actions.getChatMember.error({
            error: new Error(texts.state$ValueMessageQueryUndefined),
          });
        }
        if (state$.value.message.query.message === undefined) {
          return actions.getChatMember.error({
            error: new Error(texts.state$ValueMessageQueryMessageUndefined),
          });
        }

        const chatId: number = state$.value.message.query.message.chat.id;

        return actions.getChatMember.query({
          query: {
            chat_id: "@melodio",
            user_id: chatId,
          },
        });
      };

    return action$.pipe(
      ofType(actions.youtubeDownload.YOUTUBE_DOWNLOAD_QUERY),
      switchMap((actionQuery: IActionYoutubeDownload): ObservableInput<IActionGetChatMember | IActionSendVideo> =>
        ((): Observable<any> => testAction$ === undefined ? action$ : testAction$())()
          .pipe(
            ofType(actions.getChatMember.GET_CHAT_MEMBER_RESULT),
            take(1),
            filter(actionGetChatMemberResultStatus),
            switchMapTo(race(actionObservable(actionQuery), cache(actionQuery))),
            switchMap(transformObservable),
            startWith(startAction()),
          ),
      ),
    );
  };

export { youtubeDownload };
