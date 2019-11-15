import debug from "debug";
import { Store } from "redux";

import { IState } from "../../types/iState";
import { IMessage } from "../../types/telegramBot/types/iMessage";

const appDebug: debug.IDebugger = debug("app:config:telegramBot:handleMessage");

const handleEditedChannelPostText: (
  store: Store<IState>,
  message: IMessage
) => void = (store: Store<IState>, message: IMessage): void => {
  appDebug("telegramBot:handleEditedChannelPostText");
  store.dispatch({ type: "EDITED_CHANNEL_POST_TEXT", query: message });
};

export { handleEditedChannelPostText };
