import debug from "debug";
import { Store } from "redux";

import { IAction } from "../../types/iAction";
import { ILocale } from "../../types/iLocale";
import { IState } from "../../types/iState";
import { IMessage } from "../../types/telegramBot/types/iMessage";

const appDebug: debug.IDebugger = debug("app:config:telegramBot:handleMessage");

const handleEditedChannelPostCaption: (
  locales: ILocale,
  store: Store<IState, IAction>,
  message: IMessage
) => void = (
  _locales: ILocale,
  store: Store<IState, IAction>,
  message: IMessage
): void => {
  appDebug("TELEGRAM_BOT_HANDLE_EDITED_CHANNEL_POST_CAPTION");
  store.dispatch({ type: "EDITED_CHANNEL_POST_CAPTION", query: message });
};

export { handleEditedChannelPostCaption };
