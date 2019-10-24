import debug from "debug";
import { Store } from "redux";

import { IState } from "../../types/iState";
import { IMessage } from "../../types/telegramBot/types/iMessage";

const appDebug: debug.IDebugger = debug("app:config:telegramBot:handleMessage");

const handleEditedMessageCaption: (
  store: Store<IState> & { dispatch: {} },
  message: IMessage
) => void = (
  _store: Store<IState> & { dispatch: {} },
  _message: IMessage
): void => {
  appDebug("telegramBot:handleEditedMessageCaption");
};

export { handleEditedMessageCaption };
