import debug from "debug";
import { Store } from "redux";

import { ICallbackQuery } from "../../types/telegramBot/types/iCallbackQuery";
import { IState } from "../../types/iState";
import { IStateCallbackQueryDataFindQuery } from "../../types/iStateCallbackQueryDataFindQuery";
import { parse } from "../utils/queryString";
import * as actions from "../actions";

const appDebug: debug.IDebugger = debug("app:config:telegramBot:handleMessage");

const handleCallbackQuery: (
  store: Store<IState>,
  callbackQuery: ICallbackQuery
) => void = (store: Store<IState>, callbackQuery: ICallbackQuery): void => {
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
      const callbackQueryData: IStateCallbackQueryDataFindQuery = parse(
        callbackQuery.data
      );
      store.dispatch(
        actions.callbackQueryDataFind.query({
          query: {
            id: callbackQueryData.id,
            pageToken: callbackQueryData.pageToken
          }
        })
      );
    }
  }
};

export { handleCallbackQuery };
