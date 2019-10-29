import { Action } from "redux";
import { IStateGetChatMember } from "./iStateGetChatMember";

export interface IActionGetChatMember extends Action<string> {
  getChatMember: IStateGetChatMember;
}
