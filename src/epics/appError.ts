import { Action } from "redux";
import { ofType, StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { switchMap } from "rxjs/operators";

import { IActionSendMessage } from "../../types/iActionSendMessage";
import { IDependencies } from "../../types/iDependencies";
import { IState } from "../../types/iState";
import * as actions from "../actions";
import * as texts from "../configs/texts";

const appError: (
  action$: Observable<Action<string>>,
  state$: StateObservable<IState> | undefined,
  _dependencies: IDependencies
) => Observable<IActionSendMessage> = (
  action$: Observable<Action<string>>,
  state$: StateObservable<IState> | undefined,
  _dependencies: IDependencies
): Observable<IActionSendMessage> => {
  const actionObservable: (
    _action: Action<string>
  ) => Observable<IActionSendMessage> = (
    _action: Action<string>
  ): Observable<IActionSendMessage> => {
    if (state$ === undefined) {
      return of(
        actions.sendMessage.error({
          error: new Error(texts.state$Undefined)
        })
      );
    }
    if (state$.value.message.query === undefined) {
      return of(
        actions.sendMessage.error({
          error: new Error(texts.state$ValueMessageQueryUndefined)
        })
      );
    }
    if (state$.value.message.query.message === undefined) {
      return of(
        actions.sendMessage.error({
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
          reply_markup: { remove_keyboard: true },
          reply_to_message_id: state$.value.message.query.message.message_id,
          text: texts.messageError
        }
      })
    );
  };

  return action$.pipe(
    ofType(
      actions.answerInlineQuery.ANSWER_INLINE_QUERY_ERROR,
      actions.chosenInlineResult.CHOSEN_INLINE_RESULT_ERROR,
      actions.getChatMember.GET_CHAT_MEMBER_ERROR,
      actions.inlineQuery.INLINE_QUERY_ERROR,
      actions.sendAudio.SEND_AUDIO_ERROR,
      actions.sendMessage.SEND_MESSAGE_ERROR,
      actions.sendVideo.SEND_VIDEO_ERROR,
      actions.youtubeDownload.YOUTUBE_DOWNLOAD_ERROR,
      actions.youtubeSearchList.YOUTUBE_SEARCH_LIST_ERROR,
      actions.youtubeVideoList.YOUTUBE_VIDEO_LIST_ERROR
    ),
    switchMap(actionObservable)
  );
};

export { appError };
