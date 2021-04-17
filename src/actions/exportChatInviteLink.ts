import { IActionExportChatInviteLink } from "../../types/iActionExportChatInviteLink";
import { IStateExportChatInviteLink } from "../../types/iStateExportChatInviteLink";

const initialState: IStateExportChatInviteLink = {};

const EXPORT_CHAT_INVITE_LINK_ERROR = "EXPORT_CHAT_INVITE_LINK_ERROR";
const EXPORT_CHAT_INVITE_LINK_QUERY = "EXPORT_CHAT_INVITE_LINK_QUERY";
const EXPORT_CHAT_INVITE_LINK_RESULT = "EXPORT_CHAT_INVITE_LINK_RESULT";

const error: (
  exportChatInviteLink: IStateExportChatInviteLink
) => IActionExportChatInviteLink = (
  exportChatInviteLink: IStateExportChatInviteLink
): IActionExportChatInviteLink => ({
  exportChatInviteLink: { error: exportChatInviteLink.error },
  type: EXPORT_CHAT_INVITE_LINK_ERROR
});
const query: (
  exportChatInviteLink: IStateExportChatInviteLink
) => IActionExportChatInviteLink = (
  exportChatInviteLink: IStateExportChatInviteLink
): IActionExportChatInviteLink => ({
  exportChatInviteLink: { query: exportChatInviteLink.query },
  type: EXPORT_CHAT_INVITE_LINK_QUERY
});
const result: (
  exportChatInviteLink: IStateExportChatInviteLink
) => IActionExportChatInviteLink = (
  exportChatInviteLink: IStateExportChatInviteLink
): IActionExportChatInviteLink => ({
  exportChatInviteLink: { result: exportChatInviteLink.result },
  type: EXPORT_CHAT_INVITE_LINK_RESULT
});

export {
  initialState,
  EXPORT_CHAT_INVITE_LINK_ERROR,
  EXPORT_CHAT_INVITE_LINK_QUERY,
  EXPORT_CHAT_INVITE_LINK_RESULT,
  error,
  query,
  result
};
