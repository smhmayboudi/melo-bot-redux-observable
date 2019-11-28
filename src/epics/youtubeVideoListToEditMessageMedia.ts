import { Observable, of } from "rxjs";

import { IActionCallbackQueryDataInsert } from "../../types/iActionCallbackQueryDataInsert";
import { IActionEditMessageMedia } from "../../types/iActionEditMessageMedia";
import { IActionYoutubeVideoList } from "../../types/iActionYoutubeVideoList";
import { IState } from "../../types/iState";
import { StateObservable } from "redux-observable";
import {
  transformVideoCaption,
  transformVideoThumbnailUrl
} from "../utils/string";
import * as actions from "../actions";
import * as texts from "../configs/texts";
import { stringify } from "../utils/queryString";

const transformObservable: (
  state$: StateObservable<IState> | undefined
) => (
  action: IActionYoutubeVideoList
) => (
  action2: IActionCallbackQueryDataInsert
) => Observable<IActionEditMessageMedia | IActionYoutubeVideoList> = (
  state$: StateObservable<IState> | undefined
) => (action: IActionYoutubeVideoList) => (
  action2: IActionCallbackQueryDataInsert
): Observable<IActionEditMessageMedia | IActionYoutubeVideoList> => {
  if (action.type === actions.youtubeVideoList.YOUTUBE_VIDEO_LIST_ERROR) {
    return of(action);
  }
  if (state$ === undefined) {
    return of(
      actions.youtubeVideoList.error({
        error: new Error(texts.state$Undefined)
      })
    );
  }
  if (state$.value.message.query === undefined) {
    return of(
      actions.youtubeVideoList.error({
        error: new Error(texts.state$ValueMessageQueryUndefined)
      })
    );
  }
  if (state$.value.message.query.callback_query === undefined) {
    return of(
      actions.youtubeVideoList.error({
        error: new Error(texts.state$ValueMessageQueryCallbackQueryUndefined)
      })
    );
  }
  if (state$.value.message.query.callback_query.message === undefined) {
    return of(
      actions.youtubeVideoList.error({
        error: new Error(
          texts.state$ValueMessageQueryCallbackQueryMessageUndefined
        )
      })
    );
  }
  if (state$.value.youtubeVideoList.query === undefined) {
    return of(
      actions.youtubeVideoList.error({
        error: new Error(texts.state$ValueYoutubeVideoListQueryUndefined)
      })
    );
  }
  if (state$.value.youtubeVideoList.query.chart === undefined) {
    return of(
      actions.youtubeVideoList.error({
        error: new Error(texts.state$ValueYoutubeVideoListQueryChartUndefined)
      })
    );
  }
  if (action.youtubeVideoList.result === undefined) {
    return of(
      actions.youtubeVideoList.error({
        error: new Error(texts.actionYoutubeVideoListResultUndefined)
      })
    );
  }
  if (action.youtubeVideoList.result.items === undefined) {
    return of(
      actions.youtubeVideoList.error({
        error: new Error(texts.actionYoutubeVideoListResultItemsUndefined)
      })
    );
  }
  if (action2.callbackQueryDataInsert.result === undefined) {
    return of(
      actions.youtubeVideoList.error({
        error: new Error(texts.actionCallbackQueryDataInsertResultUndefined)
      })
    );
  }

  const inlineKeyboard = [];
  if (
    action.youtubeVideoList.result.prevPageToken !== null &&
    action.youtubeVideoList.result.prevPageToken !== undefined
  ) {
    inlineKeyboard.push({
      callback_data: stringify({
        id: action2.callbackQueryDataInsert.result,
        pageToken: action.youtubeVideoList.result.prevPageToken
      }),
      text: texts.messageWithPaginationPrev
    });
  }
  if (
    action.youtubeVideoList.result.nextPageToken !== null &&
    action.youtubeVideoList.result.nextPageToken !== undefined
  ) {
    inlineKeyboard.push({
      callback_data: stringify({
        id: action2.callbackQueryDataInsert.result,
        pageToken: action.youtubeVideoList.result.nextPageToken
      }),
      text: texts.messageWithPaginationNext
    });
  }

  return of(
    actions.editMessageMedia.query({
      query: {
        chat_id: state$.value.message.query.callback_query.message.chat.id,
        message_id:
          state$.value.message.query.callback_query.message.message_id,
        media: {
          caption: transformVideoCaption(
            action.youtubeVideoList.result.items[0]
          ),
          media: transformVideoThumbnailUrl(
            action.youtubeVideoList.result.items[0]
          ),
          parse_mode: "HTML",
          type: "photo"
        },
        reply_markup: {
          inline_keyboard: [inlineKeyboard]
        }
      }
    })
  );
};

export { transformObservable };
