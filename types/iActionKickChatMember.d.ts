import { IAction } from "./iAction";
import { IStateKickChatMember } from "./iStateKickChatMember";

export interface IActionKickChatMember extends IAction {
  kickChatMember: IStateKickChatMember;
}
