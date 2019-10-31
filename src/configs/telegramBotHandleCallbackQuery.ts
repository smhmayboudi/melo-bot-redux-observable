import debug from "debug";
import { Store } from "redux";

import { IState } from "../../types/iState";
import { ICallbackQuery } from "../../types/telegramBot/types/iCallbackQuery";
import * as actions from "../actions";
import * as texts from "../configs/texts";

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
      const callbackQueryData: string[] = callbackQuery.data.split(
        texts.commandSeparator
      );
      store.dispatch(
        actions.youtubeSearchList.query({
          query: {
            key: env.GOOGLE_API_KEY,
            maxResults: env.GOOGLE_API_LIST_MAX_RESULTS,
            part: "id,snippet",
            pageToken: callbackQueryData[0],
            q: callbackQueryData[1],
            type: env.GOOGLE_API_SEARCH_LIST_TYPE
          }
        })
      );
    }
  }
};

export { handleCallbackQuery };
