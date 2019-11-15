import debug from "debug";
import { Store } from "redux";

import { IState } from "../../types/iState";

const appDebug: debug.IDebugger = debug("app:config:telegramBot:handleMessage");

const handle: (store: Store<IState>) => void = (store: Store<IState>): void => {
  appDebug("telegramBot:handle");
  store.dispatch({ type: "" });
};

export { handle };
