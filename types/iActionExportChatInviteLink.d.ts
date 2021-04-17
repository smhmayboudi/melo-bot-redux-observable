import { IAction } from "./iAction";
import { IStateExportChatInviteLink } from "./iStateExportChatInviteLink";

export interface IActionExportChatInviteLink extends IAction {
  exportChatInviteLink: IStateExportChatInviteLink;
}
