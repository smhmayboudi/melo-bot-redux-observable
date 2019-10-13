import { youtube_v3 } from "googleapis";
import * as querystring from "querystring";
import { ofType, StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { IActionSendMessage } from "../../types/iActionSendMessage";
import { IActionYoutubeSearchList } from "../../types/iActionYoutubeSearchList";
import { IDependencies } from "../../types/iDependencies";
import { IState } from "../../types/iState";
import * as actions from "../actions";
import * as texts from "../config/texts";
import { transformSearchList } from "../utils/string";

const youtubeSearchList:
  (
    action$: Observable<IActionYoutubeSearchList>,
    state$: StateObservable<IState> | undefined,
    dependencies: IDependencies,
  ) => Observable<IActionSendMessage> =
  (
    action$: Observable<IActionYoutubeSearchList>,
    // @ts-ignore
    state$: StateObservable<IState> | undefined,
    dependencies: IDependencies,
  ): Observable<IActionSendMessage> => {
    const { requestsObservable } = dependencies;

    const actionObservable:
      (action: IActionYoutubeSearchList) => Observable<IActionYoutubeSearchList> =
      (action: IActionYoutubeSearchList): Observable<IActionYoutubeSearchList> => {
        if (requestsObservable === undefined) {
          return of(actions.youtubeSearchList.error({
            error: new Error(texts.epicDependencyRequestsObservableUndefined),
          }));
        }
        if (action.youtubeSearchList.query === undefined) {
          return of(actions.youtubeSearchList.error({
            error: new Error(texts.actionYoutubeSearchListQueryUndefined),
          }));
        }

        return requestsObservable(
          {
            host: "www.googleapis.com",
            path: `/youtube/v3/search?${querystring.stringify(action.youtubeSearchList.query)}`,
          },
        )
          .pipe(
            map((result: youtube_v3.Schema$SearchListResponse): IActionYoutubeSearchList =>
              actions.youtubeSearchList.result({
                result,
              }),
            ),
            catchError((error: any) => of(actions.youtubeSearchList.error({
              error,
            }))),
          );
      };

    const transformObservable:
      (action: IActionYoutubeSearchList) => Observable<IActionSendMessage> =
      (action: IActionYoutubeSearchList): Observable<IActionSendMessage> => {
        if (action.type === actions.youtubeSearchList.YOUTUBE_SEARCH_LIST_ERROR) {
          return of(actions.sendMessage.error({
            error: action.youtubeSearchList.error,
          }));
        }
        if (action.youtubeSearchList.result === undefined) {
          return of(actions.sendMessage.error({
            error: new Error(texts.actionYoutubeSearchListResultUndefined),
          }));
        }
        if (action.youtubeSearchList.result.items === undefined) {
          return of(actions.sendMessage.error({
            error: new Error(texts.actionYoutubeSearchListResultItemsUndefined),
          }));
        }
        if (state$ === undefined) {
          return of(actions.sendMessage.error({
            error: new Error(texts.state$Undefined),
          }));
        }
        if (state$.value.message.query === undefined) {
          return of(actions.sendMessage.error({
            error: new Error(texts.state$ValueMessageQueryUndefined),
          }));
        }
        if (state$.value.message.query.message === undefined) {
          return of(actions.sendMessage.error({
            error: new Error(texts.state$ValueMessageQueryMessageUndefined),
          }));
        }
        if (state$.value.youtubeSearchList.query === undefined) {
          return of(actions.sendMessage.error({
            error: new Error(texts.state$ValueYoutubeSearchListQueryUndefined),
          }));
        }
        if (state$.value.youtubeSearchList.query.q === undefined) {
          return of(actions.sendMessage.error({
            error: new Error(texts.state$ValueYoutubeSearchListQueryQUndefined),
          }));
        }

        const chatId: number = state$.value.message.query.message.chat.id;
        const messageId: number = state$.value.message.query.message.message_id;
        const text: string = transformSearchList(
          action.youtubeSearchList.result.items,
          state$.value.youtubeSearchList.query.q,
        );

        return of(actions.sendMessage.query({
          query: {
            chat_id: chatId,
            disable_notification: true,
            disable_web_page_preview: true,
            parse_mode: "HTML",
            reply_markup: { remove_keyboard: true },
            reply_to_message_id: messageId,
            text,
          },
        }));
      };

    return action$.pipe(
      ofType(actions.youtubeSearchList.YOUTUBE_SEARCH_LIST_QUERY),
      switchMap(actionObservable),
      switchMap(transformObservable),
    );
  };

export { youtubeSearchList };
