import { Action } from "redux";

import { IStateLeaveChat } from "./iStateLeaveChat";

export interface IActionLeaveChat extends Action<string> {
  leaveChat: IStateLeaveChat;
}
