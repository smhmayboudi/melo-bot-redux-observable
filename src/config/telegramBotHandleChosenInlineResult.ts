import debug from "debug";
import { Store } from "redux";

import { IState } from "../../types/iState";
import { IChosenInlineResult } from "../../types/telegramBot/inlineMode/iChosenInlineResult";

const appDebug: debug.IDebugger = debug("app:config:telegramBot:handleMessage");

const handleChosenInlineResult: (
  store: Store<IState> & { dispatch: {} },
  chosenInlineResult: IChosenInlineResult
) => void = (
  _store: Store<IState> & { dispatch: {} },
  _chosenInlineResult: IChosenInlineResult
): void => {
  appDebug("telegramBot:handleChosenInlineResult");
};

export { handleChosenInlineResult };
