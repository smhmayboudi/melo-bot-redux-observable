import { StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { IActionCallbackQueryDataInsert } from "../../types/iActionCallbackQueryDataInsert";
import { IActionEditMessageMedia } from "../../types/iActionEditMessageMedia";
import { IActionYoutubeVideoList } from "../../types/iActionYoutubeVideoList";
import { IDependencies } from "../../types/iDependencies";
import { IState } from "../../types/iState";
import { IInlineKeyboardButton } from "../../types/telegramBot/types/iInlineKeyboardButton";
import * as actions from "../actions";
import {
  encode,
  transformVideoCaption,
  transformVideoThumbnailUrl
} from "../utils/string";

const transformObservable: (
  action: IActionYoutubeVideoList,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => (
  action2: IActionCallbackQueryDataInsert
) => Observable<IActionEditMessageMedia | IActionYoutubeVideoList> = (
  action: IActionYoutubeVideoList,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => (
  action2: IActionCallbackQueryDataInsert
): Observable<IActionEditMessageMedia | IActionYoutubeVideoList> => {
  const { locales } = dependencies;

  if (action.type === actions.youtubeVideoList.YOUTUBE_VIDEO_LIST_ERROR) {
    return of(action);
  }
  if (state$ === undefined) {
    return of(
      actions.youtubeVideoList.error({
        error: new Error(locales.find("state$Undefined"))
      })
    );
  }
  if (state$.value.message.query === undefined) {
    return of(
      actions.youtubeVideoList.error({
        error: new Error(locales.find("state$ValueMessageQueryUndefined"))
      })
    );
  }
  if (state$.value.message.query.callback_query === undefined) {
    return of(
      actions.youtubeVideoList.error({
        error: new Error(
          locales.find("state$ValueMessageQueryCallbackQueryUndefined")
        )
      })
    );
  }
  if (state$.value.message.query.callback_query.message === undefined) {
    return of(
      actions.youtubeVideoList.error({
        error: new Error(
          locales.find("state$ValueMessageQueryCallbackQueryMessageUndefined")
        )
      })
    );
  }
  if (state$.value.youtubeVideoList.query === undefined) {
    return of(
      actions.youtubeVideoList.error({
        error: new Error(
          locales.find("state$ValueYoutubeVideoListQueryUndefined")
        )
      })
    );
  }
  if (state$.value.youtubeVideoList.query.chart === undefined) {
    return of(
      actions.youtubeVideoList.error({
        error: new Error(
          locales.find("state$ValueYoutubeVideoListQueryChartUndefined")
        )
      })
    );
  }
  if (action.youtubeVideoList.result === undefined) {
    return of(
      actions.youtubeVideoList.error({
        error: new Error(locales.find("actionYoutubeVideoListResultUndefined"))
      })
    );
  }
  if (action.youtubeVideoList.result.items === undefined) {
    return of(
      actions.youtubeVideoList.error({
        error: new Error(
          locales.find("actionYoutubeVideoListResultItemsUndefined")
        )
      })
    );
  }
  if (action2.callbackQueryDataInsert.result === undefined) {
    return of(
      actions.youtubeVideoList.error({
        error: new Error(
          locales.find("actionCallbackQueryDataInsertResultUndefined")
        )
      })
    );
  }

  const inlineKeyboard: IInlineKeyboardButton[] = [];
  if (
    action.youtubeVideoList.result.prevPageToken !== null &&
    action.youtubeVideoList.result.prevPageToken !== undefined
  ) {
    inlineKeyboard.push({
      callback_data: encode(
        {
          id: action2.callbackQueryDataInsert.result,
          pageToken: action.youtubeVideoList.result.prevPageToken
        },
        "iStateCallbackQueryDataFindQuery"
      ),
      text: locales.find("messageWithPaginationPrev")
    });
  }
  if (
    action.youtubeVideoList.result.nextPageToken !== null &&
    action.youtubeVideoList.result.nextPageToken !== undefined
  ) {
    inlineKeyboard.push({
      callback_data: encode(
        {
          id: action2.callbackQueryDataInsert.result,
          pageToken: action.youtubeVideoList.result.nextPageToken
        },
        "iStateCallbackQueryDataFindQuery"
      ),
      text: locales.find("messageWithPaginationNext")
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
