import { Action } from "redux";

import { IStateRestrictChatMember } from "./iStateRestrictChatMember";

export interface IActionRestrictChatMember extends Action<string> {
  restrictChatMember: IStateRestrictChatMember;
}
