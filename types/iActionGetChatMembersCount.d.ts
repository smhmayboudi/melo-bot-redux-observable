import { Action } from "redux";

import { IStateGetChatMembersCount } from "./iStateGetChatMembersCount";

export interface IActionGetChatMembersCount extends Action<string> {
  getChatMembersCount: IStateGetChatMembersCount;
}
