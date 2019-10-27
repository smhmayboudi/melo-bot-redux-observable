import { Action } from "redux";

import { IStateUnpinChatMessage } from "./iStateUnpinChatMessage";

export interface IActionUnpinChatMessage extends Action<string> {
  unpinChatMessage: IStateUnpinChatMessage;
}
