import debug from "debug";
import { Store } from "redux";

import { IAction } from "../../types/iAction";
import { IState } from "../../types/iState";
import { IPreCheckoutQuery } from "../../types/telegramBot/payments/iPreCheckoutQuery";

const appDebug: debug.IDebugger = debug("app:config:telegramBot:handleMessage");

const handlePreCheckoutQuery: (
  store: Store<IState, IAction>,
  preCheckoutQuery: IPreCheckoutQuery
) => void = (
  store: Store<IState, IAction>,
  preCheckoutQuery: IPreCheckoutQuery
): void => {
  appDebug("TELEGRAM_BOT_HANDLE_PRE_CHECKOUT_QUERY");
  store.dispatch({ type: "PRE_CHECKOUT_QUERY", query: preCheckoutQuery });
};

export { handlePreCheckoutQuery };
