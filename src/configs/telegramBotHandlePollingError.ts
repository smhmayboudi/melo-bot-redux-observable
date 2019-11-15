import debug from "debug";
import { Store } from "redux";

import { IState } from "../../types/iState";

const appDebug: debug.IDebugger = debug("app:config:telegramBot:handleMessage");

const handlePollingError: (store: Store<IState>, error: Error) => void = (
  store: Store<IState>,
  error: Error
): void => {
  appDebug("telegramBot:handlePollingError");
  store.dispatch({ type: "POLLING_ERROR", error: error });
};

export { handlePollingError };
