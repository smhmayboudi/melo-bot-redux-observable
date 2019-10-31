import { Observable, of } from "rxjs";

import { IActionSendMessage } from "../../types/iActionSendMessage";
import { IActionYoutubeSearchList } from "../../types/iActionYoutubeSearchList";
import { IState } from "../../types/iState";
import { StateObservable } from "redux-observable";
import { transformSearchList } from "../utils/string";
import * as actions from "../actions";
import * as texts from "../configs/texts";

const transformObservable: (
  state$: StateObservable<IState> | undefined,
  action: IActionYoutubeSearchList
) => Observable<IActionSendMessage | IActionYoutubeSearchList> = (
  state$: StateObservable<IState> | undefined,
  action: IActionYoutubeSearchList
): Observable<IActionSendMessage | IActionYoutubeSearchList> => {
  if (action.type === actions.youtubeSearchList.YOUTUBE_SEARCH_LIST_ERROR) {
    return of(action);
  }
  if (action.youtubeSearchList.result === undefined) {
    return of(
      actions.youtubeSearchList.error({
        error: new Error(texts.actionYoutubeSearchListResultUndefined)
      })
    );
  }
  if (action.youtubeSearchList.result.items === undefined) {
    return of(
      actions.youtubeSearchList.error({
        error: new Error(texts.actionYoutubeSearchListResultItemsUndefined)
      })
    );
  }
  if (state$ === undefined) {
    return of(
      actions.youtubeSearchList.error({
        error: new Error(texts.state$Undefined)
      })
    );
  }
  if (state$.value.message.query === undefined) {
    return of(
      actions.youtubeSearchList.error({
        error: new Error(texts.state$ValueMessageQueryUndefined)
      })
    );
  }
  if (state$.value.message.query.message === undefined) {
    return of(
      actions.youtubeSearchList.error({
        error: new Error(texts.state$ValueMessageQueryMessageUndefined)
      })
    );
  }
  if (state$.value.youtubeSearchList.query === undefined) {
    return of(
      actions.youtubeSearchList.error({
        error: new Error(texts.state$ValueYoutubeSearchListQueryUndefined)
      })
    );
  }
  if (state$.value.youtubeSearchList.query.q === undefined) {
    return of(
      actions.youtubeSearchList.error({
        error: new Error(texts.state$ValueYoutubeSearchListQueryQUndefined)
      })
    );
  }

  const inlineKeyboard = [];
  if (
    action.youtubeSearchList.result.prevPageToken !== undefined &&
    action.youtubeSearchList.result.prevPageToken !== null
  ) {
    inlineKeyboard.push({
      callback_data: `${action.youtubeSearchList.result.prevPageToken}${texts.commandSeparator}${state$.value.youtubeSearchList.query.q}`,
      text: texts.messageWithPaginationPrev
    });
  }
  if (
    action.youtubeSearchList.result.nextPageToken !== undefined &&
    action.youtubeSearchList.result.nextPageToken !== null
  ) {
    inlineKeyboard.push({
      callback_data: `${action.youtubeSearchList.result.nextPageToken}${texts.commandSeparator}${state$.value.youtubeSearchList.query.q}`,
      text: texts.messageWithPaginationNext
    });
  }

  return of(
    actions.sendMessage.query({
      query: {
        chat_id: state$.value.message.query.message.chat.id,
        disable_notification: true,
        disable_web_page_preview: true,
        parse_mode: "HTML",
        reply_markup: {
          inline_keyboard: [inlineKeyboard]
        },
        reply_to_message_id: state$.value.message.query.message.message_id,
        text: transformSearchList(
          action.youtubeSearchList.result.items,
          state$.value.youtubeSearchList.query.q
        )
      }
    })
  );
};

export { transformObservable };
