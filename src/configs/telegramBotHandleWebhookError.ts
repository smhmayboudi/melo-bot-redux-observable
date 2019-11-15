import debug from "debug";
import { Store } from "redux";

import { IState } from "../../types/iState";

const appDebug: debug.IDebugger = debug("app:config:telegramBot:handleMessage");

const handleWebhookError: (store: Store<IState>, error: Error) => void = (
  store: Store<IState>,
  error: Error
): void => {
  appDebug("telegramBot:handleWebhookError");
  store.dispatch({ type: "WEBHOOOK_ERROR", error: error });
};

export { handleWebhookError };
