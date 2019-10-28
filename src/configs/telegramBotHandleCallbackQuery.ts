import debug from "debug";
import { Store } from "redux";

import { IState } from "../../types/iState";
import { ICallbackQuery } from "../../types/telegramBot/types/iCallbackQuery";
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
          callback_query_id: callbackQuery.id,
          text: `data:${callbackQuery.data}\ninline_message_id:${callbackQuery.inline_message_id}`
        }
      })
    );
  } else if (callbackQuery.message !== undefined) {
    store.dispatch(
      actions.answerCallbackQuery.query({
        query: {
          callback_query_id: callbackQuery.id,
          text: `data:${callbackQuery.data}\nmessage.text:${callbackQuery.message.text}`
        }
      })
    );
  }
};

export { handleCallbackQuery };
