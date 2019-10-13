import { youtube_v3 } from "googleapis";
import * as querystring from "querystring";
import { ofType, StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { IActionSendMessage } from "../../types/iActionSendMessage";
import { IActionYoutubeVideoList } from "../../types/iActionYoutubeVideoList";
import { IDependencies } from "../../types/iDependencies";
import { IState } from "../../types/iState";
import * as actions from "../actions";
import * as texts from "../config/texts";
import { transformVideoList } from "../utils/string";

const youtubeVideoList:
  (
    action$: Observable<IActionYoutubeVideoList>,
    state$: StateObservable<IState> | undefined,
    dependencies: IDependencies,
  ) => Observable<IActionSendMessage> =
  (
    action$: Observable<IActionYoutubeVideoList>,
    // @ts-ignore
    state$: StateObservable<IState> | undefined,
    dependencies: IDependencies,
  ): Observable<IActionSendMessage> => {
    const { requestsObservable } = dependencies;

    const actionObservable:
      (action: IActionYoutubeVideoList) => Observable<IActionYoutubeVideoList> =
      (action: IActionYoutubeVideoList): Observable<IActionYoutubeVideoList> => {
        if (requestsObservable === undefined) {
          return of(actions.youtubeVideoList.error({
            error: new Error(texts.epicDependencyRequestsObservableUndefined),
          }));
        }
        if (action.youtubeVideoList.query === undefined) {
          return of(actions.youtubeVideoList.error({
            error: new Error(texts.actionYoutubeVideoListQueryUndefined),
          }));
        }

        return requestsObservable(
          {
            host: "www.googleapis.com",
            path: `/youtube/v3/videos?${querystring.stringify(action.youtubeVideoList.query)}`,
          },
        )
          .pipe(
            map((result: youtube_v3.Schema$VideoListResponse): IActionYoutubeVideoList =>
              actions.youtubeVideoList.result({
                result,
              }),
            ),
            catchError((error: any) => of(actions.youtubeVideoList.error({
              error,
            }))),
          );
      };

    const transformObservable:
      (action: IActionYoutubeVideoList) => Observable<IActionSendMessage> =
      (action: IActionYoutubeVideoList): Observable<IActionSendMessage> => {
        if (action.type === actions.youtubeVideoList.YOUTUBE_VIDEO_LIST_ERROR) {
          return of(actions.sendMessage.error({
            error: action.youtubeVideoList.error,
          }));
        }
        if (action.youtubeVideoList.result === undefined) {
          return of(actions.sendMessage.error({
            error: new Error(texts.actionYoutubeVideoListResultUndefined),
          }));
        }
        if (action.youtubeVideoList.result.items === undefined) {
          return of(actions.sendMessage.error({
            error: new Error(texts.actionYoutubeVideoListResultItemsUndefined),
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
        if (state$.value.youtubeVideoList.query === undefined) {
          return of(actions.sendMessage.error({
            error: new Error(texts.state$ValueYoutubeVideoListQueryUndefined),
          }));
        }

        const chatId: number = state$.value.message.query.message.chat.id;
        const messageId: number = state$.value.message.query.message.message_id;
        const text: string = transformVideoList(
          action.youtubeVideoList.result.items,
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
      ofType(actions.youtubeVideoList.YOUTUBE_VIDEO_LIST_QUERY),
      switchMap(actionObservable),
      switchMap(transformObservable),
    );
  };

export { youtubeVideoList };
