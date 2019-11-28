import { Observable, of } from "rxjs";

import { IActionSendMessage } from "../../types/iActionSendMessage";
import { IActionYoutubeDownload } from "../../types/iActionYoutubeDownload";
import { IState } from "../../types/iState";
import { StateObservable } from "redux-observable";
import * as actions from "../actions";
import * as texts from "../configs/texts";

const transformObservable: (
  action: IActionYoutubeDownload,
  state$: StateObservable<IState> | undefined
) => Observable<IActionSendMessage | IActionYoutubeDownload> = (
  action: IActionYoutubeDownload,
  state$: StateObservable<IState> | undefined
): Observable<IActionSendMessage | IActionYoutubeDownload> => {
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

  return of(
    actions.sendMessage.query({
      query: {
        chat_id: state$.value.message.query.message.chat.id,
        disable_notification: true,
        disable_web_page_preview: true,
        parse_mode: "HTML",
        reply_to_message_id: state$.value.message.query.message.message_id,
        text: texts.messageChannelJoin
      }
    })
  );
};

export { transformObservable };
