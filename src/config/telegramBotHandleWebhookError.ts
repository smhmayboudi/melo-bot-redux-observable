import debug from "debug";
import { Store } from "redux";

import { IState } from "../../types/iState";

const appDebug: debug.IDebugger = debug("app:config:telegramBot:handleMessage");

const handleWebhookError: (
  store: Store<IState> & { dispatch: {} },
  error: Error
) => void = (_store: Store<IState> & { dispatch: {} }, _error: Error): void => {
  appDebug("telegramBot:handleWebhookError");
};

export { handleWebhookError };
