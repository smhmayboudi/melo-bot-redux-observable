import debug from "debug";
import { Store } from "redux";

import { IAction } from "../../types/iAction";
import { ILocale } from "../../types/iLocale";
import { IState } from "../../types/iState";

const appDebug: debug.IDebugger = debug("app:config:telegramBot:handleMessage");

const handleWebhookError: (
  locales: ILocale,
  store: Store<IState, IAction>,
  error: Error
) => void = (
  _locales: ILocale,
  store: Store<IState, IAction>,
  error: Error
): void => {
  appDebug("TELEGRAM_BOT_HANDLE_WEBHOOK_ERROR");
  store.dispatch({ type: "WEBHOOK_ERROR", error: error });
};

export { handleWebhookError };
