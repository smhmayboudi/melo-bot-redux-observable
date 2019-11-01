import { Observable, of } from "rxjs";

import { IActionSendMessage } from "../../types/iActionSendMessage";
import { IActionYoutubeVideoList } from "../../types/iActionYoutubeVideoList";
import { IState } from "../../types/iState";
import { StateObservable } from "redux-observable";
import { transformVideoList } from "../utils/string";
import * as actions from "../actions";
import * as texts from "../configs/texts";
import { stringify } from "../utils/queryString";

const transformObservable: (
  state$: StateObservable<IState> | undefined,
  action: IActionYoutubeVideoList
) => Observable<IActionSendMessage | IActionYoutubeVideoList> = (
  state$: StateObservable<IState> | undefined,
  action: IActionYoutubeVideoList
): Observable<IActionSendMessage | IActionYoutubeVideoList> => {
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
  if (action.youtubeVideoList.result.pageInfo !== undefined) {
    if (
      action.youtubeVideoList.result.prevPageToken !== undefined &&
      action.youtubeVideoList.result.prevPageToken !== null
    ) {
      inlineKeyboard.push({
        callback_data: stringify({
          c: state$.value.youtubeVideoList.query.chart,
          pirpp: action.youtubeVideoList.result.pageInfo
            .resultsPerPage as number,
          pitr: action.youtubeVideoList.result.pageInfo.totalResults as number,
          pt: action.youtubeVideoList.result.prevPageToken
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
          c: state$.value.youtubeVideoList.query.chart,
          pirpp: action.youtubeVideoList.result.pageInfo
            .resultsPerPage as number,
          pitr: action.youtubeVideoList.result.pageInfo.totalResults as number,
          pt: action.youtubeVideoList.result.nextPageToken
        }),
        text: texts.messageWithPaginationNext
      });
    }
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
        text: transformVideoList(
          action.youtubeVideoList.result.items,
          `${state$.value.youtubeVideoList.query.chart}`
        )
      }
    })
  );
};

export { transformObservable };