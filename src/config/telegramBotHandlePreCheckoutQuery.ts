import debug from "debug";
import { Store } from "redux";

import { IState } from "../../types/iState";
import { IPreCheckoutQuery } from "../../types/telegramBot/payments/iPreCheckoutQuery";

const appDebug: debug.IDebugger = debug("app:config:telegramBot:handleMessage");

const handlePreCheckoutQuery: (
  store: Store<IState> & { dispatch: {} },
  preCheckoutQuery: IPreCheckoutQuery
) => void = (
  _store: Store<IState> & { dispatch: {} },
  _preCheckoutQuery: IPreCheckoutQuery
): void => {
  appDebug("telegramBot:handlePreCheckoutQuery");
};

export { handlePreCheckoutQuery };
