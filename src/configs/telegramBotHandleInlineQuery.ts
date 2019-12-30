import debug from "debug";
import { Store } from "redux";

import { IAction } from "../../types/iAction";
import { IState } from "../../types/iState";
import { IInlineQuery } from "../../types/telegramBot/inlineMode/iInlineQuery";
import * as actions from "../actions";

const appDebug: debug.IDebugger = debug("app:config:telegramBot:handleMessage");

const handleInlineQuery: (
  store: Store<IState, IAction>,
  inlineQuery: IInlineQuery
) => void = (
  store: Store<IState, IAction>,
  inlineQuery: IInlineQuery
): void => {
  appDebug("TELEGRAM_BOT_HANDLE_INLINE_QUERY");
  store.dispatch(actions.inlineQuery.query({ query: inlineQuery }));
};

export { handleInlineQuery };
