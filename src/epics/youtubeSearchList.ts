import { youtube_v3 } from "googleapis";
import * as querystring from "querystring";
import { ofType, StateObservable } from "redux-observable";
import { iif, Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { IActionAnswerInlineQuery } from "../../types/iActionAnswerInlineQuery";
import { IActionSendMessage } from "../../types/iActionSendMessage";
import { IActionYoutubeSearchList } from "../../types/iActionYoutubeSearchList";
import { IDependencies } from "../../types/iDependencies";
import { IState } from "../../types/iState";
import * as actions from "../actions";
import * as texts from "../configs/texts";
import { transformSearchList as transformSearchListToInlineQueryResultArticle } from "../utils/inlineQueryResultArticle";
import { transformSearchList as transformSearchListToString } from "../utils/string";
import { IActionEditMessageText } from "../../types/iActionEditMessageText";

const youtubeSearchList: (
  action$: Observable<IActionYoutubeSearchList>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => Observable<
  | IActionAnswerInlineQuery
  | IActionEditMessageText
  | IActionSendMessage
  | IActionYoutubeSearchList
> = (
  action$: Observable<IActionYoutubeSearchList>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
): Observable<
  | IActionAnswerInlineQuery
  | IActionEditMessageText
  | IActionSendMessage
  | IActionYoutubeSearchList
> => {
  const { requestsObservable } = dependencies;

  const actionObservable: (
    action: IActionYoutubeSearchList
  ) => Observable<IActionYoutubeSearchList> = (
    action: IActionYoutubeSearchList
  ): Observable<IActionYoutubeSearchList> => {
    if (requestsObservable === undefined) {
      return of(
        actions.youtubeSearchList.error({
          error: new Error(texts.epicDependencyRequestsObservableUndefined)
        })
      );
    }
    if (action.youtubeSearchList.query === undefined) {
      return of(
        actions.youtubeSearchList.error({
          error: new Error(texts.actionYoutubeSearchListQueryUndefined)
        })
      );
    }

    return requestsObservable({
      host: "www.googleapis.com",
      path: `/youtube/v3/search?${querystring.stringify(
        action.youtubeSearchList.query
      )}`
    }).pipe(
      map(
        (
          result: youtube_v3.Schema$SearchListResponse
        ): IActionYoutubeSearchList =>
          actions.youtubeSearchList.result({
            result
          })
      ),
      catchError((error: any) =>
        of(
          actions.youtubeSearchList.error({
            error
          })
        )
      )
    );
  };

  const transformObservableAnswerInlineQuery: (
    action: IActionYoutubeSearchList
  ) => Observable<IActionAnswerInlineQuery | IActionYoutubeSearchList> = (
    action: IActionYoutubeSearchList
  ): Observable<IActionAnswerInlineQuery | IActionYoutubeSearchList> => {
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
    if (state$.value.inlineQuery.query === undefined) {
      return of(
        actions.youtubeSearchList.error({
          error: new Error(texts.state$ValueInlineQueryQueryUndefined)
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

    return of(
      actions.answerInlineQuery.query({
        query: {
          inline_query_id: state$.value.inlineQuery.query.id,
          is_personal: true,
          next_offset: `${action.youtubeSearchList.result.nextPageToken}`,
          results: transformSearchListToInlineQueryResultArticle(
            action.youtubeSearchList.result.items,
            state$.value.youtubeSearchList.query.q
          ),
          switch_pm_parameter: "string",
          switch_pm_text: texts.epicInlineQueryConnectGoogleAccount
        }
      })
    );
  };

  const transformObservableSendMessage: (
    action: IActionYoutubeSearchList
  ) => Observable<IActionSendMessage | IActionYoutubeSearchList> = (
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
          text: transformSearchListToString(
            action.youtubeSearchList.result.items,
            state$.value.youtubeSearchList.query.q
          )
        }
      })
    );
  };

  const transformObservableEditMessageText: (
    action: IActionYoutubeSearchList
  ) => Observable<IActionEditMessageText | IActionYoutubeSearchList> = (
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
          text: transformSearchListToString(
            action.youtubeSearchList.result.items,
            state$.value.youtubeSearchList.query.q
          )
        }
      })
    );
  };

  return action$.pipe(
    ofType(actions.youtubeSearchList.YOUTUBE_SEARCH_LIST_QUERY),
    switchMap(actionObservable),
    switchMap((value: IActionYoutubeSearchList) =>
      iif(
        () =>
          state$ !== undefined && state$.value.inlineQuery.query !== undefined,
        transformObservableAnswerInlineQuery(value),
        iif(
          () =>
            state$ !== undefined &&
            state$.value.message.query !== undefined &&
            state$.value.message.query.message !== undefined,
          transformObservableSendMessage(value),
          transformObservableEditMessageText(value)
        )
      )
    )
  );
};

export { youtubeSearchList };
