import debug from "debug";
import { Store } from "redux";

import { ICallbackQuery } from "../../types/telegramBot/types/iCallbackQuery";
import { IState } from "../../types/iState";
import { IStateCallbackDataFindQuery } from "../../types/iStateCallbackDataFindQuery";
import { parse } from "../utils/queryString";
import * as actions from "../actions";

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
      const callbackQueryData: IStateCallbackDataFindQuery = parse(
        callbackQuery.data
      );
      store.dispatch(
        actions.callbackDataFind.query({
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
