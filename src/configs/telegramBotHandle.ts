import debug from "debug";
import { Store } from "redux";

import { IState } from "../../types/iState";

const appDebug: debug.IDebugger = debug("app:config:telegramBot:handleMessage");

const handle: (store: Store<IState> & { dispatch: {} }) => void = (
  _store: Store<IState> & { dispatch: {} }
): void => {
  appDebug("telegramBot:handle");
};

export { handle };
