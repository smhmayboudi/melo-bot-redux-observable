import debug from "debug";
import { Store } from "redux";

import { IAction } from "../../types/iAction";
import { IState } from "../../types/iState";

const appDebug: debug.IDebugger = debug("app:config:telegramBot:handleMessage");

const handle: (store: Store<IState, IAction>) => void = (
  store: Store<IState, IAction>
): void => {
  appDebug("TELEGRAM_BOT_HANDLE");
  store.dispatch({ type: "" });
};

export { handle };
