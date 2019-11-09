import debug from "debug";
import { Store } from "redux";

import { IState } from "../../types/iState";
import { IInlineQuery } from "../../types/telegramBot/inlineMode/iInlineQuery";
import * as actions from "../actions";

const appDebug: debug.IDebugger = debug("app:config:telegramBot:handleMessage");

const handleInlineQuery: (
  store: Store<IState>,
  inlineQuery: IInlineQuery
) => void = (store: Store<IState>, inlineQuery: IInlineQuery): void => {
  appDebug("telegramBot:handleInlineQuery");
  store.dispatch(actions.inlineQuery.query({ query: inlineQuery }));
};

export { handleInlineQuery };
