import { StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";

import { IActionSendVideo } from "../../types/iActionSendVideo";
import { IActionYoutubeDownload } from "../../types/iActionYoutubeDownload";
import { IActionYoutubeDownloadResultFind } from "../../types/iActionYoutubeDownloadResultFind";
import { IState } from "../../types/iState";
import * as actions from "../actions";
import * as texts from "../configs/texts";

import { caption } from "../utils/string";

const transformObservableYoutubeDownloadResultFind: (
  action: IActionYoutubeDownloadResultFind,
  state$: StateObservable<IState> | undefined
) => Observable<IActionYoutubeDownload | IActionSendVideo> = (
  action: IActionYoutubeDownloadResultFind,
  state$: StateObservable<IState> | undefined
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

export {
  transformObservableYoutubeDownloadResultFind,
  startActionYoutubeDownloadResultFind
};
