import { Action } from "redux";

import { IStateKickChatMember } from "./iStateKickChatMember";

export interface IActionKickChatMember extends Action<string> {
  kickChatMember: IStateKickChatMember;
}
