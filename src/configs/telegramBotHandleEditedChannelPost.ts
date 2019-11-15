import debug from "debug";
import { Store } from "redux";

import { IState } from "../../types/iState";
import { IMessage } from "../../types/telegramBot/types/iMessage";

const appDebug: debug.IDebugger = debug("app:config:telegramBot:handleMessage");

const handleEditedChannelPost: (
  store: Store<IState>,
  message: IMessage
) => void = (store: Store<IState>, message: IMessage): void => {
  appDebug("telegramBot:handleEditedChannelPost");
  store.dispatch({ type: "EDITED_CHANNEL_POST", query: message });
};

export { handleEditedChannelPost };
