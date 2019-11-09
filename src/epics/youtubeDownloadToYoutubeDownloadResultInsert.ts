import * as fs from "fs";

import { StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";

import { IActionSendVideo } from "../../types/iActionSendVideo";
import { IActionYoutubeDownload } from "../../types/iActionYoutubeDownload";
import { IActionYoutubeDownloadResultInsert } from "../../types/iActionYoutubeDownloadResultInsert";
import { IState } from "../../types/iState";
import * as actions from "../actions";
import * as texts from "../configs/texts";

import { caption } from "../utils/string";

const transformObservableSendVideo: (
  action: IActionYoutubeDownload
) => (
  action2: IActionSendVideo
) => Observable<IActionYoutubeDownload | IActionYoutubeDownloadResultInsert> = (
  action: IActionYoutubeDownload
) => (
  action2: IActionSendVideo
): Observable<IActionYoutubeDownloadResultInsert | IActionYoutubeDownload> => {
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
  action: IActionYoutubeDownload,
  state$: StateObservable<IState> | undefined
) => IActionYoutubeDownload | IActionSendVideo = (
  action: IActionYoutubeDownload,
  state$: StateObservable<IState> | undefined
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

export { transformObservableSendVideo, startActionSendVideo };
