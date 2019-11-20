import debug from "debug";
import { Store } from "redux";

import { IAction } from "../../types/iAction";
import { IState } from "../../types/iState";

const appDebug: debug.IDebugger = debug("app:config:telegramBot:handleMessage");

const handleError: (store: Store<IState, IAction>, error: Error) => void = (
  store: Store<IState, IAction>,
  error: Error
): void => {
  appDebug("telegramBot:handleError");
  store.dispatch({ type: "ERROR", error: error });
};

export { handleError };
