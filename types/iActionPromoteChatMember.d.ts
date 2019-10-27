import { Action } from "redux";

import { IStatePromoteChatMember } from "./iStatePromoteChatMember";

export interface IActionPromoteChatMember extends Action<string> {
  promoteChatMember: IStatePromoteChatMember;
}
