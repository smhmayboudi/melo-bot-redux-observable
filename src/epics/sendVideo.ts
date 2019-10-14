import * as FormData from "form-data";
import { Db, MongoClient } from "mongodb";
import { ofType, StateObservable } from "redux-observable";
import { NEVER, Observable, of } from "rxjs";
import { catchError, map, switchMap, switchMapTo } from "rxjs/operators";

import { IActionSendVideo } from "../../types/iActionSendVideo";
import { IDependencies } from "../../types/iDependencies";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import { IStateSendVideoQuery } from "../../types/iStateSendVideoQuery";
import { IMessage } from "../../types/telegramBot/types/iMessage";
import * as actions from "../actions";
import * as texts from "../config/texts";
import { caption, decode } from "../utils/string";

const sendVideo:
  (
    action$: Observable<IActionSendVideo>,
    state$: StateObservable<IState> | undefined,
    dependencies: IDependencies,
  ) => Observable<IActionSendVideo> =
  (
    action$: Observable<IActionSendVideo>,
    state$: StateObservable<IState> | undefined,
    dependencies: IDependencies,
  ): Observable<IActionSendVideo> => {
    const transform:
      (query: IStateSendVideoQuery) => FormData =
      (query: IStateSendVideoQuery): FormData => {
        const formData: FormData = new FormData();
        if (query.caption !== undefined) {
          formData.append("caption", query.caption);
        }
        formData.append("chat_id", query.chat_id);
        if (query.disable_notification !== undefined) {
          formData.append("disable_notification", `${query.disable_notification}`);
        }
        if (query.duration !== undefined) {
          formData.append("duration", query.duration);
        }
        if (query.height !== undefined) {
          formData.append("height", query.height);
        }
        if (query.parse_mode !== undefined) {
          formData.append("parse_mode", query.parse_mode);
        }
        if (query.reply_markup !== undefined) {
          formData.append("reply_markup", JSON.stringify(query.reply_markup));
        }
        if (query.reply_to_message_id !== undefined) {
          formData.append("reply_to_message_id", query.reply_to_message_id);
        }
        if (query.supports_streaming !== undefined) {
          formData.append("supports_streaming", `${query.supports_streaming}`);
        }
        if (query.thumb !== undefined) {
          formData.append("thumb", query.thumb);
        }
        formData.append("video", query.video);
        if (query.width !== undefined) {
          formData.append("width", query.width);
        }

        return formData;
      };

    const {
      botToken,
      collectionObservable,
      findOneObservable,
      insertOneObservable,
      mongoClientObservable,
      requestsUploadObservable,
    } = dependencies;

    const actionObservable:
      (action: IActionSendVideo) => Observable<IActionSendVideo> =
      (action: IActionSendVideo): Observable<IActionSendVideo> => {
        if (botToken === undefined) {
          return of(actions.sendVideo.error({
            error: new Error(texts.epicDependencyBotTokenUndefined),
          }));
        }
        if (requestsUploadObservable === undefined) {
          return of(actions.sendVideo.error({
            error: new Error(texts.epicDependencyRequestsUploadObservableUndefined),
          }));
        }
        if (action.sendVideo.query === undefined) {
          return of(actions.sendVideo.error({
            error: new Error(texts.actionSendVideoQueryUndefined),
          }));
        }

        return requestsUploadObservable(
          {
            host: "api.telegram.org",
            path: `/bot${botToken}/sendVideo`,
          },
          transform(action.sendVideo.query),
        )
          .pipe(
            map((response: IResponse): IActionSendVideo => {
              if (response.ok && response.result !== undefined) {
                return actions.sendVideo.result({
                  result: response.result as IMessage,
                });
              }

              return actions.sendVideo.error({
                error: response,
              });
            }),
            catchError((error: any) => of(actions.sendVideo.error({
              error,
            }))),
          );
      };

    const cache:
      (action: IActionSendVideo) => Observable<IActionSendVideo> =
      (action: IActionSendVideo): Observable<IActionSendVideo> => {
        if (action.type === actions.sendVideo.SEND_VIDEO_ERROR) {
          return of(actions.sendVideo.error({
            error: action.sendVideo.error,
          }));
        }
        if (mongoClientObservable === undefined) {
          return of(actions.sendVideo.error({
            error: new Error(texts.epicDependencyMongoClientObservableObservableUndefined),
          }));
        }

        return mongoClientObservable()
          .pipe(
            switchMap((client: MongoClient): Observable<IActionSendVideo> => {
              if (collectionObservable === undefined) {
                return of(actions.sendVideo.error({
                  error: new Error(texts.epicDependencyCollectionObservableUndefined),
                }));
              }

              const db: Db = client.db("melodio");

              return collectionObservable(db, "cache", {})
                .pipe(
                  switchMap((collection: any): Observable<IActionSendVideo> => {
                    if (findOneObservable === undefined) {
                      return of(actions.sendVideo.error({
                        error: new Error(texts.epicDependencyFindOneObservableUndefined),
                      }));
                    }
                    if (action.sendVideo.result === undefined) {
                      return of(actions.sendVideo.error({
                        error: new Error(texts.actionSendVideoResultUndefined),
                      }));
                    }
                    if (action.sendVideo.result.reply_to_message === undefined) {
                      return of(actions.sendVideo.error({
                        error: new Error(texts.actionSendVideoResultReplyToMessageUndefined),
                      }));
                    }
                    if (action.sendVideo.result.reply_to_message.text === undefined) {
                      return of(actions.sendVideo.error({
                        error: new Error(texts.actionSendVideoResultReplyToMessageTextUndefined),
                      }));
                    }

                    const id: string = decode(action.sendVideo.result.reply_to_message.text
                      .replace(`/${texts.commandDownload}${texts.commandSeparator}`, "")
                      .trim());

                    return findOneObservable(
                      collection,
                      {
                        id,
                      },
                    )
                      .pipe(
                        switchMap((value: any): Observable<IActionSendVideo> => {
                          if (value !== null) {
                            return NEVER;
                          }
                          if (insertOneObservable === undefined) {
                            return of(actions.sendVideo.error({
                              error: new Error(texts.epicDependencyInsertOneObservableUndefined),
                            }));
                          }
                          if (action.sendVideo.result === undefined) {
                            return of(actions.sendVideo.error({
                              error: new Error(texts.actionSendVideoResultUndefined),
                            }));
                          }
                          if (action.sendVideo.result.caption === undefined) {
                            return of(actions.sendVideo.error({
                              error: new Error(texts.actionSendVideoResultCaptionUndefined),
                            }));
                          }

                          const title: string = action.sendVideo.result.caption
                            .replace(caption(), "")
                            .trim();

                          return insertOneObservable(
                            collection,
                            {
                              id,
                              title,
                              ...action.sendVideo.result.video,
                            },
                            {},
                          )
                            .pipe(
                              switchMapTo(of(action)),
                              catchError((error: any) => of(actions.sendVideo.error({
                                error,
                              }))),
                            );
                        }),
                        catchError((error: any) => of(actions.sendVideo.error({
                          error,
                        }))),
                      );
                  }),
                  catchError((error: any) => of(actions.sendVideo.error({
                    error,
                  }))),
                );
            }),
            catchError((error: any) => of(actions.sendVideo.error({
              error,
            }))),
          );
      };

    return action$.pipe(
      ofType(actions.sendVideo.SEND_VIDEO_QUERY),
      switchMap(actionObservable),
      switchMap(cache),
    );
  };

export { sendVideo };
