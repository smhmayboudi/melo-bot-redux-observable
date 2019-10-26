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
import { transformSearchList as inlineTransformSearchList } from "../utils/inlineQueryResultArticle";
import { transformSearchList as stringTransformSearchList } from "../utils/string";

const youtubeSearchList: (
  action$: Observable<IActionYoutubeSearchList>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => Observable<
  IActionAnswerInlineQuery | IActionSendMessage | IActionYoutubeSearchList
> = (
  action$: Observable<IActionYoutubeSearchList>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
): Observable<
  IActionAnswerInlineQuery | IActionSendMessage | IActionYoutubeSearchList
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

  const transformObservableInline: (
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
          cache_time: 0,
          inline_query_id: state$.value.inlineQuery.query.id,
          is_personal: true,
          next_offset: "",
          results: inlineTransformSearchList(
            action.youtubeSearchList.result.items,
            state$.value.youtubeSearchList.query.q
          ),
          switch_pm_parameter: "string",
          switch_pm_text: texts.epicInlineQueryConnectGoogleAccount
        }
      })
    );
  };

  const transformObservableString: (
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

    return of(
      actions.sendMessage.query({
        query: {
          chat_id: state$.value.message.query.message.chat.id,
          disable_notification: true,
          disable_web_page_preview: true,
          parse_mode: "HTML",
          reply_markup: { remove_keyboard: true },
          reply_to_message_id: state$.value.message.query.message.message_id,
          text: stringTransformSearchList(
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
          state$ !== undefined &&
          (state$.value.inlineQuery.query !== undefined ||
            state$.value.message.query === undefined),
        transformObservableInline(value),
        transformObservableString(value)
      )
    )
  );
};

export { youtubeSearchList };
