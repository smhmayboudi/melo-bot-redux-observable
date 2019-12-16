import { IAction } from "./iAction";
import { IStateUnbanChatMember } from "./iStateUnbanChatMember";

export interface IActionUnbanChatMember extends IAction {
  unbanChatMember: IStateUnbanChatMember;
}
