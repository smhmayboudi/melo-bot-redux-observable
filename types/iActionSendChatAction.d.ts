import { Action } from "redux";

import { IStateSendChatAction } from "./iStateSendChatAction";

export interface IActionSendChatAction extends Action<string> {
  sendChatAction: IStateSendChatAction;
}
