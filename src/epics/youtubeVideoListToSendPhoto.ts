import { Observable, of } from "rxjs";

import { IActionCallbackQueryDataInsert } from "../../types/iActionCallbackQueryDataInsert";
import { IActionSendPhoto } from "../../types/iActionSendPhoto";
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
  action: IActionYoutubeVideoList,
  state$: StateObservable<IState> | undefined
) => (
  action2: IActionCallbackQueryDataInsert
) => Observable<IActionSendPhoto | IActionYoutubeVideoList> = (
  action: IActionYoutubeVideoList,
  state$: StateObservable<IState> | undefined
) => (
  action2: IActionCallbackQueryDataInsert
): Observable<IActionSendPhoto | IActionYoutubeVideoList> => {
  if (action.type === actions.youtubeVideoList.YOUTUBE_VIDEO_LIST_ERROR) {
    return of(action);
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
  if (state$.value.message.query.message === undefined) {
    return of(
      actions.youtubeVideoList.error({
        error: new Error(texts.state$ValueMessageQueryMessageUndefined)
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

  const inlineKeyboard = [];
  if (
    action.youtubeVideoList.result.prevPageToken !== undefined &&
    action.youtubeVideoList.result.prevPageToken !== null
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
    action.youtubeVideoList.result.nextPageToken !== undefined &&
    action.youtubeVideoList.result.nextPageToken !== null
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
    actions.sendPhoto.query({
      query: {
        caption: transformVideoCaption(action.youtubeVideoList.result.items[0]),
        chat_id: state$.value.message.query.message.chat.id,
        disable_notification: true,
        parse_mode: "HTML",
        photo: transformVideoThumbnailUrl(
          action.youtubeVideoList.result.items[0]
        ),
        reply_markup: {
          inline_keyboard: [inlineKeyboard]
        },
        reply_to_message_id: state$.value.message.query.message.message_id
      }
    })
  );
};

export { transformObservable };
