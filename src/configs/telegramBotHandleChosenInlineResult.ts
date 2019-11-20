import debug from "debug";
import { Store } from "redux";

import { IAction } from "../../types/iAction";
import { IState } from "../../types/iState";
import { IChosenInlineResult } from "../../types/telegramBot/inlineMode/iChosenInlineResult";
import * as actions from "../actions";

const appDebug: debug.IDebugger = debug("app:config:telegramBot:handleMessage");

const handleChosenInlineResult: (
  store: Store<IState, IAction>,
  chosenInlineResult: IChosenInlineResult
) => void = (
  store: Store<IState, IAction>,
  chosenInlineResult: IChosenInlineResult
): void => {
  appDebug("telegramBot:handleChosenInlineResult");
  store.dispatch(
    actions.chosenInlineResult.query({ query: chosenInlineResult })
  );
};

export { handleChosenInlineResult };
