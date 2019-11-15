import debug from "debug";
import { Store } from "redux";

import { IState } from "../../types/iState";

const appDebug: debug.IDebugger = debug("app:config:telegramBot:handleMessage");

const handleError: (store: Store<IState>, error: Error) => void = (
  store: Store<IState>,
  error: Error
): void => {
  appDebug("telegramBot:handleError");
  store.dispatch({ type: "ERROR", error: error });
};

export { handleError };
