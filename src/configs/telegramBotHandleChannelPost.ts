import debug from "debug";
import { Store } from "redux";

import { IAction } from "../../types/iAction";
import { ILocale } from "../../types/iLocale";
import { IState } from "../../types/iState";
import { IMessage } from "../../types/telegramBot/types/iMessage";

const appDebug: debug.IDebugger = debug("app:config:telegramBot:handleMessage");

const handleChannelPost: (
  locales: ILocale,
  store: Store<IState, IAction>,
  message: IMessage
) => void = (
  _locales: ILocale,
  store: Store<IState, IAction>,
  message: IMessage
): void => {
  appDebug("TELEGRAM_BOT_HANDLE_CHANNEL_POST");
  store.dispatch({ type: "CHANNEL_POST", query: message });
};

export { handleChannelPost };
