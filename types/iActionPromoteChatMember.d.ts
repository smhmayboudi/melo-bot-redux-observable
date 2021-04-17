import { IAction } from "./iAction";
import { IStatePromoteChatMember } from "./iStatePromoteChatMember";

export interface IActionPromoteChatMember extends IAction {
  promoteChatMember: IStatePromoteChatMember;
}
