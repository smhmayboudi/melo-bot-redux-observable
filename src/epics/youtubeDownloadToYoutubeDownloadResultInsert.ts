import * as fs from "fs";
import { StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";

import { IActionSendVideo } from "../../types/iActionSendVideo";
import { IActionYoutubeDownload } from "../../types/iActionYoutubeDownload";
import { IActionYoutubeDownloadResultInsert } from "../../types/iActionYoutubeDownloadResultInsert";
import { IDependencies } from "../../types/iDependencies";
import { IState } from "../../types/iState";
import * as actions from "../actions";
import { caption } from "../utils/string";

const transformObservable: (
  action: IActionYoutubeDownload,
  dependencies: IDependencies
) => (
  action2: IActionSendVideo
) => Observable<IActionYoutubeDownload | IActionYoutubeDownloadResultInsert> = (
  action: IActionYoutubeDownload,
  dependencies: IDependencies
) => (
  action2: IActionSendVideo
): Observable<IActionYoutubeDownloadResultInsert | IActionYoutubeDownload> => {
  const { locales } = dependencies;

  if (action.youtubeDownload.result === undefined) {
    return of(
      actions.youtubeDownload.error({
        error: new Error(locales.find("actionYoutubeDownloadResultUndefined"))
      })
    );
  }
  if (action2.sendVideo.result === undefined) {
    return of(
      actions.youtubeDownload.error({
        error: new Error(locales.find("actionSendVideoResultUndefined"))
      })
    );
  }
  if (action2.sendVideo.result.video === undefined) {
    return of(
      actions.youtubeDownload.error({
        error: new Error(
          locales.find("actionYoutubeDownloadResultVideoUndefined")
        )
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

const startAction: (
  action: IActionYoutubeDownload,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => IActionYoutubeDownload | IActionSendVideo = (
  action: IActionYoutubeDownload,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
): IActionSendVideo | IActionYoutubeDownload => {
  const { locales } = dependencies;

  if (state$ === undefined) {
    return actions.youtubeDownload.error({
      error: new Error(locales.find("state$Undefined"))
    });
  }
  if (state$.value.message.query === undefined) {
    return actions.youtubeDownload.error({
      error: new Error(locales.find("state$ValueMessageQueryUndefined"))
    });
  }
  if (state$.value.message.query.message === undefined) {
    return actions.youtubeDownload.error({
      error: new Error(locales.find("state$ValueMessageQueryMessageUndefined"))
    });
  }
  if (action.youtubeDownload.result === undefined) {
    return actions.youtubeDownload.error({
      error: new Error(locales.find("actionYoutubeDownloadResultUndefined"))
    });
  }
  if (action.youtubeDownload.result.thumb === undefined) {
    return actions.youtubeDownload.error({
      error: new Error(
        locales.find("actionYoutubeDownloadResultThumbUndefined")
      )
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
      supports_streaming: true,
      thumb: fs.createReadStream(action.youtubeDownload.result.thumb.file_id),
      video: fs.createReadStream(action.youtubeDownload.result.file_id),
      width: action.youtubeDownload.result.width
    }
  });
};

export { transformObservable, startAction };
