import { IAction } from "./iAction";
import { IStateGetChatMembersCount } from "./iStateGetChatMembersCount";

export interface IActionGetChatMembersCount extends IAction {
  getChatMembersCount: IStateGetChatMembersCount;
}
