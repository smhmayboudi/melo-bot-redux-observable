import debug from "debug";
import { Store } from "redux";

import { IAction } from "../../types/iAction";
import { ILocale } from "../../types/iLocale";
import { IState } from "../../types/iState";
import { IStateCallbackQueryDataFindQuery } from "../../types/iStateCallbackQueryDataFindQuery";
import { ICallbackQuery } from "../../types/telegramBot/types/iCallbackQuery";
import * as actions from "../actions";
import { decode } from "../utils/string";

const appDebug: debug.IDebugger = debug("app:config:telegramBot:handleMessage");

const handleCallbackQuery: (
  locales: ILocale,
  store: Store<IState, IAction>,
  callbackQuery: ICallbackQuery
) => void = (
  _locales: ILocale,
  store: Store<IState, IAction>,
  callbackQuery: ICallbackQuery
): void => {
  appDebug("TELEGRAM_BOT_HANDLE_CALLBACK_QUERY");
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
      const callbackQueryData: IStateCallbackQueryDataFindQuery = decode(
        callbackQuery.data,
        "iStateCallbackQueryDataFindQuery"
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
