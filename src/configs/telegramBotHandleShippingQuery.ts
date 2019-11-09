import debug from "debug";
import { Store } from "redux";

import { IState } from "../../types/iState";
import { IShippingQuery } from "../../types/telegramBot/payments/iShippingQuery";

const appDebug: debug.IDebugger = debug("app:config:telegramBot:handleMessage");

const handleShippingQuery: (
  store: Store<IState>,
  shippingQuery: IShippingQuery
) => void = (_store: Store<IState>, _shippingQuery: IShippingQuery): void => {
  appDebug("telegramBot:handleShippingQuery");
};

export { handleShippingQuery };
