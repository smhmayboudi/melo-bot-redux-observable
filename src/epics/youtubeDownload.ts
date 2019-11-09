import * as fs from "fs";

import { ofType, StateObservable } from "redux-observable";
import { Observable, ObservableInput, of } from "rxjs";
import { catchError, map, startWith, switchMap, take } from "rxjs/operators";

import { IActionGetChatMember } from "../../types/iActionGetChatMember";
import { IActionSendMessage } from "../../types/iActionSendMessage";
import { IActionSendVideo } from "../../types/iActionSendVideo";
import { IActionYoutubeDownload } from "../../types/iActionYoutubeDownload";
import { IActionYoutubeDownloadResultFind } from "../../types/iActionYoutubeDownloadResultFind";
import { IActionYoutubeDownloadResultInsert } from "../../types/iActionYoutubeDownloadResultInsert";
import { IDependencies } from "../../types/iDependencies";
import { IState } from "../../types/iState";
import { IStateYoutubeDownloadResultInsertQuery } from "../../types/iStateYoutubeDownloadResultInsertQuery";
import * as actions from "../actions";
import * as texts from "../configs/texts";
import { actionGetChatMemberResultStatus } from "../utils/boolean";

import { transformObservable as transformObservableToSendMessage } from "./youtubeDownloadToSendMessage";
import { caption } from "../utils/string";

const youtubeDownload: (
  action$: Observable<IActionYoutubeDownload>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => Observable<
  | IActionGetChatMember
  | IActionSendMessage
  | IActionSendVideo
  | IActionYoutubeDownload
  | IActionYoutubeDownloadResultFind
  | IActionYoutubeDownloadResultInsert
> = (
  action$: Observable<IActionYoutubeDownload>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
): Observable<
  | IActionGetChatMember
  | IActionSendMessage
  | IActionSendVideo
  | IActionYoutubeDownload
  | IActionYoutubeDownloadResultFind
  | IActionYoutubeDownloadResultInsert
> => {
  const { testAction$, youtubeDownloadObservable } = dependencies;

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

    return youtubeDownloadObservable(action.youtubeDownload.query.id).pipe(
      map(
        (
          result: IStateYoutubeDownloadResultInsertQuery
        ): IActionYoutubeDownload =>
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

  const transformObservableSendVideo: (
    action: IActionYoutubeDownload
  ) => (
    action2: IActionSendVideo
  ) => Observable<
    IActionYoutubeDownload | IActionYoutubeDownloadResultInsert
  > = (action: IActionYoutubeDownload) => (
    action2: IActionSendVideo
  ): Observable<
    IActionYoutubeDownloadResultInsert | IActionYoutubeDownload
  > => {
    if (action.youtubeDownload.result === undefined) {
      return of(
        actions.youtubeDownload.error({
          error: new Error(texts.actionYoutubeDownloadQueryUndefined)
        })
      );
    }
    if (action2.sendVideo.result === undefined) {
      return of(
        actions.youtubeDownload.error({
          error: new Error(texts.actionYoutubeDownloadResultUndefined)
        })
      );
    }
    if (action2.sendVideo.result.video === undefined) {
      return of(
        actions.youtubeDownload.error({
          error: new Error(texts.actionYoutubeDownloadResultVideoUndefined)
        })
      );
    }

    return of(
      actions.youtubeDownloadResultInsert.query({
        query: {
          duration: action2.sendVideo.result.video.duration,
          file_id: action2.sendVideo.result.video.file_id,
          file_size: action2.sendVideo.result.video.file_size,
          height: action2.sendVideo.result.video.height,
          id: action.youtubeDownload.result.id,
          mime_type: action2.sendVideo.result.video.mime_type,
          thumb: action2.sendVideo.result.video.thumb,
          title: action.youtubeDownload.result.title,
          width: action2.sendVideo.result.video.width
        }
      })
    );
  };

  const startActionSendVideo: (
    action: IActionYoutubeDownload
  ) => IActionYoutubeDownload | IActionSendVideo = (
    action: IActionYoutubeDownload
  ): IActionSendVideo | IActionYoutubeDownload => {
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
    if (action.youtubeDownload.result === undefined) {
      return actions.youtubeDownload.error({
        error: new Error(texts.actionYoutubeDownloadResultUndefined)
      });
    }
    if (action.youtubeDownload.result.thumb === undefined) {
      return actions.youtubeDownload.error({
        error: new Error(texts.actionYoutubeDownloadResultThumbUndefined)
      });
    }

    return actions.sendVideo.query({
      query: {
        caption: caption(action.youtubeDownload.result.title),
        chat_id: state$.value.message.query.message.chat.id,
        disable_notification: true,
        duration: action.youtubeDownload.result.duration,
        height: action.youtubeDownload.result.height,
        parse_mode: "HTML",
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
        reply_to_message_id: state$.value.message.query.message.message_id,
        thumb: fs.createReadStream(action.youtubeDownload.result.thumb.file_id),
        video: fs.createReadStream(action.youtubeDownload.result.file_id),
        width: action.youtubeDownload.result.width
      }
    });
  };

  const sendVideo: (
    action: IActionYoutubeDownload
  ) => Observable<
    | IActionSendVideo
    | IActionYoutubeDownload
    | IActionYoutubeDownloadResultInsert
  > = (
    action: IActionYoutubeDownload
  ): Observable<
    | IActionSendVideo
    | IActionYoutubeDownload
    | IActionYoutubeDownloadResultInsert
  > =>
    (testAction$ !== undefined ? testAction$ : action$).pipe(
      ofType(actions.sendVideo.SEND_VIDEO_RESULT),
      take<IActionSendVideo & IActionYoutubeDownload>(1),
      switchMap(transformObservableSendVideo(action)),
      startWith(startActionSendVideo(action))
    );

  const transformObservableYoutubeDownloadResultFind: (
    action: IActionYoutubeDownloadResultFind
  ) => Observable<IActionYoutubeDownload | IActionSendVideo> = (
    action: IActionYoutubeDownloadResultFind
  ): Observable<IActionYoutubeDownload | IActionSendVideo> => {
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
    if (action.youtubeDownloadResultFind.result === undefined) {
      return of(
        actions.youtubeDownload.error({
          error: new Error(texts.actionYoutubeDownloadResultUndefined)
        })
      );
    }
    if (action.youtubeDownloadResultFind.result.thumb === undefined) {
      return of(
        actions.youtubeDownload.error({
          error: new Error(texts.actionYoutubeDownloadResultThumbUndefined)
        })
      );
    }

    return of(
      actions.sendVideo.query({
        query: {
          caption: caption(action.youtubeDownloadResultFind.result.title),
          chat_id: state$.value.message.query.message.chat.id,
          disable_notification: true,
          duration: action.youtubeDownloadResultFind.result.duration,
          height: action.youtubeDownloadResultFind.result.height,
          parse_mode: "HTML",
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
          reply_to_message_id: state$.value.message.query.message.message_id,
          supports_streaming: true,
          thumb: action.youtubeDownloadResultFind.result.thumb.file_id,
          video: action.youtubeDownloadResultFind.result.file_id,
          width: action.youtubeDownloadResultFind.result.width
        }
      })
    );
  };

  const startActionYoutubeDownloadResultFind: (
    action: IActionYoutubeDownload
  ) => IActionYoutubeDownload | IActionYoutubeDownloadResultFind = (
    action: IActionYoutubeDownload
  ): IActionYoutubeDownload | IActionYoutubeDownloadResultFind => {
    if (action.youtubeDownload.query === undefined) {
      return actions.youtubeDownload.error({
        error: new Error(texts.actionYoutubeDownloadQueryUndefined)
      });
    }

    return actions.youtubeDownloadResultFind.query({
      query: {
        id: action.youtubeDownload.query.id
      }
    });
  };

  const youtubeDownloadResultFind: (
    action: IActionYoutubeDownload
  ) => Observable<
    | IActionSendVideo
    | IActionYoutubeDownload
    | IActionYoutubeDownloadResultFind
    | IActionYoutubeDownloadResultInsert
  > = (
    action: IActionYoutubeDownload
  ): Observable<
    | IActionSendVideo
    | IActionYoutubeDownload
    | IActionYoutubeDownloadResultFind
    | IActionYoutubeDownloadResultInsert
  > =>
    (testAction$ !== undefined ? testAction$ : action$).pipe(
      ofType(
        actions.youtubeDownloadResultFind.YOUTUBE_DOWNLOAD_RESULT_FIND_RESULT
      ),
      take<IActionYoutubeDownload & IActionYoutubeDownloadResultFind>(1),
      switchMap((action2: IActionYoutubeDownloadResultFind) => {
        if (action2.youtubeDownloadResultFind.result !== undefined) {
          return transformObservableYoutubeDownloadResultFind(action2);
        }
        return actionObservable(action).pipe(switchMap(sendVideo));
      }),
      startWith(startActionYoutubeDownloadResultFind(action))
    );

  const transformObservableGetChatMember: (
    action: IActionYoutubeDownload
  ) => (
    action2: IActionGetChatMember
  ) => Observable<
    | IActionGetChatMember
    | IActionSendMessage
    | IActionSendVideo
    | IActionYoutubeDownload
    | IActionYoutubeDownloadResultFind
    | IActionYoutubeDownloadResultInsert
  > = (action: IActionYoutubeDownload) => (
    action2: IActionGetChatMember
  ): Observable<
    | IActionGetChatMember
    | IActionSendMessage
    | IActionSendVideo
    | IActionYoutubeDownload
    | IActionYoutubeDownloadResultFind
    | IActionYoutubeDownloadResultInsert
  > => {
    if (actionGetChatMemberResultStatus(action2)) {
      return youtubeDownloadResultFind(action);
    }
    return transformObservableToSendMessage(action, state$);
  };

  const startActionGetChatMember: () =>
    | IActionGetChatMember
    | IActionYoutubeDownload = ():
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
        | IActionGetChatMember
        | IActionSendMessage
        | IActionSendVideo
        | IActionYoutubeDownload
        | IActionYoutubeDownloadResultFind
        | IActionYoutubeDownloadResultInsert
      > =>
        (testAction$ !== undefined ? testAction$ : action$).pipe(
          ofType(actions.getChatMember.GET_CHAT_MEMBER_RESULT),
          take<IActionGetChatMember & IActionYoutubeDownload>(1),
          switchMap(transformObservableGetChatMember(action)),
          startWith(startActionGetChatMember())
        )
    )
  );
};

export { youtubeDownload };
