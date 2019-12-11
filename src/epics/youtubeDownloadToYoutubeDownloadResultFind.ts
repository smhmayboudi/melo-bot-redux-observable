import { StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";

import { IActionSendVideo } from "../../types/iActionSendVideo";
import { IActionYoutubeDownload } from "../../types/iActionYoutubeDownload";
import { IActionYoutubeDownloadResultFind } from "../../types/iActionYoutubeDownloadResultFind";
import { IDependencies } from "../../types/iDependencies";
import { IState } from "../../types/iState";
import * as actions from "../actions";
import { caption } from "../utils/string";

const transformObservable: (
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => (
  action: IActionYoutubeDownloadResultFind
) => Observable<IActionYoutubeDownload | IActionSendVideo> = (
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => (
  action: IActionYoutubeDownloadResultFind
): Observable<IActionYoutubeDownload | IActionSendVideo> => {
  const { locales } = dependencies;

  if (state$ === undefined) {
    return of(
      actions.youtubeDownload.error({
        error: new Error(locales.find("state$Undefined"))
      })
    );
  }
  if (state$.value.message.query === undefined) {
    return of(
      actions.youtubeDownload.error({
        error: new Error(locales.find("state$ValueMessageQueryUndefined"))
      })
    );
  }
  if (state$.value.message.query.message === undefined) {
    return of(
      actions.youtubeDownload.error({
        error: new Error(
          locales.find("state$ValueMessageQueryMessageUndefined")
        )
      })
    );
  }
  if (
    action.youtubeDownloadResultFind.result === null ||
    action.youtubeDownloadResultFind.result === undefined
  ) {
    return of(
      actions.youtubeDownload.error({
        error: new Error(locales.find("actionYoutubeDownloadResultUndefined"))
      })
    );
  }
  if (action.youtubeDownloadResultFind.result.thumb === undefined) {
    return of(
      actions.youtubeDownload.error({
        error: new Error(
          locales.find("actionYoutubeDownloadResultThumbUndefined")
        )
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

const startAction: (
  action: IActionYoutubeDownload,
  dependencies: IDependencies
) => IActionYoutubeDownload | IActionYoutubeDownloadResultFind = (
  action: IActionYoutubeDownload,
  dependencies: IDependencies
): IActionYoutubeDownload | IActionYoutubeDownloadResultFind => {
  const { locales } = dependencies;

  if (action.youtubeDownload.query === undefined) {
    return actions.youtubeDownload.error({
      error: new Error(locales.find("actionYoutubeDownloadQueryUndefined"))
    });
  }

  return actions.youtubeDownloadResultFind.query({
    query: {
      id: action.youtubeDownload.query.id
    }
  });
};

export { transformObservable, startAction };
