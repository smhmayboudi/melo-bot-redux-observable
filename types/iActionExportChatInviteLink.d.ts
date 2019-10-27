import { Action } from "redux";

import { IStateExportChatInviteLink } from "./iStateExportChatInviteLink";

export interface IActionExportChatInviteLink extends Action<string> {
  exportChatInviteLink: IStateExportChatInviteLink;
}
