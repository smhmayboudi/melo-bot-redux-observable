import { StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";

import { IActionCallbackQueryDataInsert } from "../../types/iActionCallbackQueryDataInsert";
import { IActionEditMessageText } from "../../types/iActionEditMessageText";
import { IActionYoutubeSearchList } from "../../types/iActionYoutubeSearchList";
import { IDependencies } from "../../types/iDependencies";
import { IState } from "../../types/iState";
import { IInlineKeyboardButton } from "../../types/telegramBot/types/iInlineKeyboardButton";
import * as actions from "../actions";
import { encode, transformSearchResults } from "../utils/string";

const transformObservable: (
  action: IActionYoutubeSearchList,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => (
  action2: IActionCallbackQueryDataInsert
) => Observable<IActionEditMessageText | IActionYoutubeSearchList> = (
  action: IActionYoutubeSearchList,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => (
  action2: IActionCallbackQueryDataInsert
): Observable<IActionEditMessageText | IActionYoutubeSearchList> => {
  const { locales } = dependencies;

  if (action.type === actions.youtubeSearchList.YOUTUBE_SEARCH_LIST_ERROR) {
    return of(action);
  }
  if (state$ === undefined) {
    return of(
      actions.youtubeSearchList.error({
        error: new Error(locales.find("state$Undefined"))
      })
    );
  }
  if (state$.value.message.query === undefined) {
    return of(
      actions.youtubeSearchList.error({
        error: new Error(locales.find("state$ValueMessageQueryUndefined"))
      })
    );
  }
  if (state$.value.message.query.callback_query === undefined) {
    return of(
      actions.youtubeSearchList.error({
        error: new Error(
          locales.find("state$ValueMessageQueryCallbackQueryUndefined")
        )
      })
    );
  }
  if (state$.value.message.query.callback_query.message === undefined) {
    return of(
      actions.youtubeSearchList.error({
        error: new Error(
          locales.find("state$ValueMessageQueryCallbackQueryMessageUndefined")
        )
      })
    );
  }
  if (state$.value.youtubeSearchList.query === undefined) {
    return of(
      actions.youtubeSearchList.error({
        error: new Error(
          locales.find("state$ValueYoutubeSearchListQueryUndefined")
        )
      })
    );
  }
  if (action.youtubeSearchList.result === undefined) {
    return of(
      actions.youtubeSearchList.error({
        error: new Error(locales.find("actionYoutubeSearchListResultUndefined"))
      })
    );
  }
  if (action.youtubeSearchList.result.items === undefined) {
    return of(
      actions.youtubeSearchList.error({
        error: new Error(
          locales.find("actionYoutubeSearchListResultItemsUndefined")
        )
      })
    );
  }
  if (action2.callbackQueryDataInsert.result === undefined) {
    return of(
      actions.youtubeSearchList.error({
        error: new Error(
          locales.find("actionCallbackQueryDataInsertResultUndefined")
        )
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
          locales.find(
            "state$ValueYoutubeSearchListQueryQRelatedToVideoIdUndefined"
          )
        )
      })
    );
  }

  const inlineKeyboard: IInlineKeyboardButton[] = [];
  if (
    action.youtubeSearchList.result.prevPageToken !== null &&
    action.youtubeSearchList.result.prevPageToken !== undefined
  ) {
    inlineKeyboard.push({
      callback_data: encode(
        {
          id: action2.callbackQueryDataInsert.result,
          pageToken: action.youtubeSearchList.result.prevPageToken
        },
        "iStateCallbackQueryDataFindQuery"
      ),
      text: locales.find("messageWithPaginationPrev")
    });
  }
  if (
    action.youtubeSearchList.result.nextPageToken !== null &&
    action.youtubeSearchList.result.nextPageToken !== undefined
  ) {
    inlineKeyboard.push({
      callback_data: encode(
        {
          id: action2.callbackQueryDataInsert.result,
          pageToken: action.youtubeSearchList.result.nextPageToken
        },
        "iStateCallbackQueryDataFindQuery"
      ),
      text: locales.find("messageWithPaginationNext")
    });
  }

  const q = state$.value.youtubeSearchList.query.q;
  const relatedToVideoId =
    state$.value.youtubeSearchList.query.relatedToVideoId;
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
        text: transformSearchResults(
          action.youtubeSearchList.result.items,
          locales.find("messageNoResult"),
          locales.find("messageSeparator"),
          q !== undefined
            ? locales.fill("messageResultQ", { q })
            : relatedToVideoId !== undefined
            ? locales.fill("messageResultRelatedToVideoId", {
                relatedToVideoId
              })
            : ""
        )
      }
    })
  );
};

export { transformObservable };
