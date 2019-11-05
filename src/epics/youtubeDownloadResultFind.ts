import { MongoClient } from "mongodb";
import { ofType, StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { catchError, switchMap } from "rxjs/operators";

// import { IActionSendVideo } from "../../types/iActionSendVideo";
import { IActionYoutubeDownloadResultFind } from "../../types/iActionYoutubeDownloadResultFind";
import { IDependencies } from "../../types/iDependencies";
import { IState } from "../../types/iState";
import { IStateYoutubeDownloadResultInsertQuery } from "../../types/iStateYoutubeDownloadResultInsertQuery";
import * as actions from "../actions";
import * as texts from "../configs/texts";
// import { caption } from "../utils/string";

const youtubeDownloadResultFind: (
  action$: Observable<IActionYoutubeDownloadResultFind>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => // ) => Observable<IActionSendVideo | IActionYoutubeDownloadResultFind> = (
Observable<IActionYoutubeDownloadResultFind> = (
  action$: Observable<IActionYoutubeDownloadResultFind>,
  _state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
  // ): Observable<IActionSendVideo | IActionYoutubeDownloadResultFind> => {
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
    if (mongoClientObservable === undefined) {
      return of(
        actions.youtubeDownloadResultFind.error({
          error: new Error(
            texts.epicDependencyMongoClientObservableObservableUndefined
          )
        })
      );
    }

    return mongoClientObservable().pipe(
      switchMap(
        (client: MongoClient): Observable<IActionYoutubeDownloadResultFind> => {
          if (collectionObservable === undefined) {
            return of(
              actions.youtubeDownloadResultFind.error({
                error: new Error(
                  texts.epicDependencyCollectionObservableUndefined
                )
              })
            );
          }

          return collectionObservable(
            client.db("melodio"),
            "youtubeDownloadResult",
            {}
          ).pipe(
            switchMap(
              (
                collection: any
              ): Observable<IActionYoutubeDownloadResultFind> => {
                if (findOneObservable === undefined) {
                  return of(
                    actions.youtubeDownloadResultFind.error({
                      error: new Error(
                        texts.epicDependencyFindOneObservableUndefined
                      )
                    })
                  );
                }
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
                  switchMap((value: IStateYoutubeDownloadResultInsertQuery) => {
                    console.log("value", value);
                    return of(
                      actions.youtubeDownloadResultFind.result({
                        result: value
                      })
                    );
                  }),
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

  // const transformObservable = (
  //   action: IActionYoutubeDownloadResultFind
  // ): Observable<IActionSendVideo | IActionYoutubeDownloadResultFind> => {
  //   if (state$ === undefined) {
  //     return of(
  //       actions.youtubeDownloadResultFind.error({
  //         error: new Error(texts.state$Undefined)
  //       })
  //     );
  //   }
  //   if (state$.value.message.query === undefined) {
  //     return of(
  //       actions.youtubeDownloadResultFind.error({
  //         error: new Error(texts.state$ValueMessageQueryUndefined)
  //       })
  //     );
  //   }
  //   if (state$.value.message.query.message === undefined) {
  //     return of(
  //       actions.youtubeDownloadResultFind.error({
  //         error: new Error(texts.state$ValueMessageQueryMessageUndefined)
  //       })
  //     );
  //   }
  //   if (action.youtubeDownloadResultFind.result === undefined) {
  //     return of(
  //       actions.youtubeDownloadResultFind.error({
  //         error: new Error(texts.actionYoutubeDownloadResultFindResultUndefined)
  //       })
  //     );
  //   }

  //   return of(
  //     actions.sendVideo.query({
  //       query: {
  //         caption: caption(action.youtubeDownloadResultFind.result.title),
  //         chat_id: state$.value.message.query.message.chat.id,
  //         disable_notification: true,
  //         duration: action.youtubeDownloadResultFind.result.duration,
  //         height: action.youtubeDownloadResultFind.result.height,
  //         parse_mode: "HTML",
  //         reply_markup: {
  //           inline_keyboard: [
  //             [
  //               {
  //                 callback_data: "callback_data:OK",
  //                 text: "OK"
  //               },
  //               {
  //                 callback_data: "callback_data:NOK",
  //                 text: "NOK"
  //               }
  //             ]
  //           ]
  //         },
  //         reply_to_message_id: state$.value.message.query.message.message_id,
  //         supports_streaming: true,
  //         thumb: action.youtubeDownloadResultFind.result.thumb,
  //         video: action.youtubeDownloadResultFind.result.file_id,
  //         width: action.youtubeDownloadResultFind.result.width
  //       }
  //     })
  //   );
  // };

  return action$.pipe(
    ofType(
      actions.youtubeDownloadResultFind.YOUTUBE_DOWNLOAD_RESULT_FIND_QUERY
    ),
    switchMap(actionObservable)
    // switchMap(transformObservable)
  );
};

export { youtubeDownloadResultFind };
