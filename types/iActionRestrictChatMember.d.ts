import { IAction } from "./iAction";
import { IStateRestrictChatMember } from "./iStateRestrictChatMember";

export interface IActionRestrictChatMember extends IAction {
  restrictChatMember: IStateRestrictChatMember;
}
