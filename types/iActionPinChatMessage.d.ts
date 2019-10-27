import { Action } from "redux";

import { IStatePinChatMessage } from "./iStatePinChatMessage";

export interface IActionPinChatMessage extends Action<string> {
  pinChatMessage: IStatePinChatMessage;
}
