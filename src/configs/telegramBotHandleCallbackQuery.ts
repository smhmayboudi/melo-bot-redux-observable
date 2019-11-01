import debug from "debug";
import { Store } from "redux";

import { ICallbackQuery } from "../../types/telegramBot/types/iCallbackQuery";
import { IQueryString } from "../../types/iQueryString";
import { IState } from "../../types/iState";
import { parse } from "../utils/queryString";
import * as actions from "../actions";
import * as env from "./env";

const appDebug: debug.IDebugger = debug("app:config:telegramBot:handleMessage");

const handleCallbackQuery: (
  store: Store<IState> & { dispatch: {} },
  callbackQuery: ICallbackQuery
) => void = (
  store: Store<IState> & { dispatch: {} },
  callbackQuery: ICallbackQuery
): void => {
  appDebug("telegramBot:handleCallbackQuery");
  if (callbackQuery.inline_message_id !== undefined) {
    store.dispatch(
      actions.answerCallbackQuery.query({
        query: {
          callback_query_id: callbackQuery.id
        }
      })
    );
  } else if (callbackQuery.message !== undefined) {
    store.dispatch(
      actions.answerCallbackQuery.query({
        query: {
          callback_query_id: callbackQuery.id
        }
      })
    );
    if (callbackQuery.data !== undefined) {
      const callbackQueryData: IQueryString = parse(callbackQuery.data);
      if (callbackQueryData.q !== undefined) {
        store.dispatch(
          actions.youtubeSearchList.query({
            query: {
              key: env.GOOGLE_API_KEY,
              maxResults: callbackQueryData.pirpp,
              part: "id,snippet",
              pageToken: callbackQueryData.pt,
              q: callbackQueryData.q,
              type: env.GOOGLE_API_SEARCH_LIST_TYPE
            }
          })
        );
      } else if (callbackQueryData.c !== undefined) {
        store.dispatch(
          actions.youtubeVideoList.query({
            query: {
              chart: callbackQueryData.c,
              key: env.GOOGLE_API_KEY,
              maxResults: callbackQueryData.pirpp,
              part: "id,snippet",
              pageToken: callbackQueryData.pt
            }
          })
        );
      }
    }
  }
};

export { handleCallbackQuery };
