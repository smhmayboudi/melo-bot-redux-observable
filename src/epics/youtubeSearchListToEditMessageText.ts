import { Observable, of } from "rxjs";

import { IActionEditMessageText } from "../../types/iActionEditMessageText";
import { IActionYoutubeSearchList } from "../../types/iActionYoutubeSearchList";
import { IState } from "../../types/iState";
import { StateObservable } from "redux-observable";
import { transformSearchList } from "../utils/string";
import * as actions from "../actions";
import * as texts from "../configs/texts";
import { stringify } from "../utils/queryString";

const transformObservable: (
  state$: StateObservable<IState> | undefined,
  action: IActionYoutubeSearchList
) => Observable<IActionEditMessageText | IActionYoutubeSearchList> = (
  state$: StateObservable<IState> | undefined,
  action: IActionYoutubeSearchList
): Observable<IActionEditMessageText | IActionYoutubeSearchList> => {
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
  if (state$.value.message.query.callback_query === undefined) {
    return of(
      actions.youtubeSearchList.error({
        error: new Error(texts.state$ValueMessageQueryCallbackQueryUndefined)
      })
    );
  }
  if (state$.value.message.query.callback_query.message === undefined) {
    return of(
      actions.youtubeSearchList.error({
        error: new Error(
          texts.state$ValueMessageQueryCallbackQueryMessageUndefined
        )
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
  const qUndefined = state$.value.youtubeSearchList.query.q === undefined;
  const relatedToVideoIdUndefined =
    state$.value.youtubeSearchList.query.relatedToVideoId === undefined;
  if (
    (!qUndefined || relatedToVideoIdUndefined) &&
    (qUndefined || !relatedToVideoIdUndefined)
  ) {
    return of(
      actions.youtubeSearchList.error({
        error: new Error(
          texts.state$ValueYoutubeSearchListQueryQRelatedToVideoIdUndefined
        )
      })
    );
  }

  const inlineKeyboard = [];
  if (action.youtubeSearchList.result.pageInfo !== undefined) {
    if (
      action.youtubeSearchList.result.prevPageToken !== undefined &&
      action.youtubeSearchList.result.prevPageToken !== null
    ) {
      inlineKeyboard.push({
        callback_data: stringify({
          pt: action.youtubeSearchList.result.prevPageToken,
          pirpp: action.youtubeSearchList.result.pageInfo
            .resultsPerPage as number,
          pitr: action.youtubeSearchList.result.pageInfo.totalResults as number,
          q: state$.value.youtubeSearchList.query.q
        }),
        text: texts.messageWithPaginationPrev
      });
    }
    if (
      action.youtubeSearchList.result.nextPageToken !== undefined &&
      action.youtubeSearchList.result.nextPageToken !== null
    ) {
      inlineKeyboard.push({
        callback_data: stringify({
          pt: action.youtubeSearchList.result.nextPageToken,
          pirpp: action.youtubeSearchList.result.pageInfo
            .resultsPerPage as number,
          pitr: action.youtubeSearchList.result.pageInfo.totalResults as number,
          q: state$.value.youtubeSearchList.query.q
        }),
        text: texts.messageWithPaginationNext
      });
    }
  }

  return of(
    actions.editMessageText.query({
      query: {
        chat_id: state$.value.message.query.callback_query.message.chat.id,
        disable_web_page_preview: true,
        message_id:
          state$.value.message.query.callback_query.message.message_id,
        parse_mode: "HTML",
        reply_markup: {
          inline_keyboard: [inlineKeyboard]
        },
        text: transformSearchList(
          action.youtubeSearchList.result.items,
          state$.value.youtubeSearchList.query.q
        )
      }
    })
  );
};

export { transformObservable };
