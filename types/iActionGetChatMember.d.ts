import { IAction } from "./iAction";
import { IStateGetChatMember } from "./iStateGetChatMember";

export interface IActionGetChatMember extends IAction {
  getChatMember: IStateGetChatMember;
}
