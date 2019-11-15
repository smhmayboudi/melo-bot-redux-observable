import debug from "debug";
import { Store } from "redux";

import { IState } from "../../types/iState";
import { IMessage } from "../../types/telegramBot/types/iMessage";

const appDebug: debug.IDebugger = debug("app:config:telegramBot:handleMessage");

const handleChannelPost: (store: Store<IState>, message: IMessage) => void = (
  store: Store<IState>,
  message: IMessage
): void => {
  appDebug("telegramBot:handleChannelPost");
  store.dispatch({ type: "CHANNEL_POST", query: message });
};

export { handleChannelPost };
