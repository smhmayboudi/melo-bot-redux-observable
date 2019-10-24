import debug from "debug";
import { Store } from "redux";

import { IState } from "../../types/iState";
import { ICallbackQuery } from "../../types/telegramBot/types/iCallbackQuery";

const appDebug: debug.IDebugger = debug("app:config:telegramBot:handleMessage");

const handleCallbackQuery: (
  store: Store<IState> & { dispatch: {} },
  callbackQuery: ICallbackQuery
) => void = (
  _store: Store<IState> & { dispatch: {} },
  _callbackQuery: ICallbackQuery
): void => {
  appDebug("telegramBot:handleCallbackQuery");
};

export { handleCallbackQuery };
