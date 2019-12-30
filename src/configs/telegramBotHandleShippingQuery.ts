import debug from "debug";
import { Store } from "redux";

import { IAction } from "../../types/iAction";
import { IState } from "../../types/iState";
import { IShippingQuery } from "../../types/telegramBot/payments/iShippingQuery";

const appDebug: debug.IDebugger = debug("app:config:telegramBot:handleMessage");

const handleShippingQuery: (
  store: Store<IState, IAction>,
  shippingQuery: IShippingQuery
) => void = (
  store: Store<IState, IAction>,
  shippingQuery: IShippingQuery
): void => {
  appDebug("TELEGRAM_BOT_HANDLE_SHIPPING_QUERY");
  store.dispatch({ type: "SHIPPING_QUERY", query: shippingQuery });
};

export { handleShippingQuery };
