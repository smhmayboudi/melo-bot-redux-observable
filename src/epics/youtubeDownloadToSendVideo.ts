import * as fs from "fs";
import { StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";

import { IActionSendVideo } from "../../types/iActionSendVideo";
import { IActionYoutubeDownload } from "../../types/iActionYoutubeDownload";
import { IState } from "../../types/iState";
import { IStateYoutubeDownloadResultInsertQuery } from "../../types/iStateYoutubeDownloadResultInsertQuery";
import * as actions from "../actions";
import * as texts from "../configs/texts";
// import { caption, pathThumb, pathVideo } from "../utils/string";
import { caption } from "../utils/string";

const transformObservable: (
  state$: StateObservable<IState> | undefined
) => (
  action: IActionYoutubeDownload
) => Observable<IActionYoutubeDownload | IActionSendVideo> = (
  state$: StateObservable<IState> | undefined
) => (
  action: IActionYoutubeDownload
): Observable<IActionYoutubeDownload | IActionSendVideo> => {
  if (action.type === actions.youtubeDownload.YOUTUBE_DOWNLOAD_ERROR) {
    return of(action);
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
  if (action.youtubeDownload.result === undefined) {
    return of(
      actions.youtubeDownload.error({
        error: new Error(texts.actionYoutubeDownloadResultUndefined)
      })
    );
  }

  const videoInfo: IStateYoutubeDownloadResultInsertQuery =
    action.youtubeDownload.result;
  const thumb = fs.createReadStream(
    videoInfo.thumb !== undefined ? videoInfo.thumb.file_id : ""
  );
  const video = fs.createReadStream(videoInfo.file_id);

  return of(
    actions.sendVideo.query({
      query: {
        caption: caption(videoInfo.title),
        chat_id: state$.value.message.query.message.chat.id,
        disable_notification: true,
        duration: videoInfo.duration,
        height: videoInfo.height,
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
        thumb,
        video,
        width: videoInfo.width
      }
    })
  );
};

export { transformObservable };
