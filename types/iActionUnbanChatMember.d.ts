import { Action } from "redux";

import { IStateUnbanChatMember } from "./iStateUnbanChatMember";

export interface IActionUnbanChatMember extends Action<string> {
  unbanChatMember: IStateUnbanChatMember;
}
