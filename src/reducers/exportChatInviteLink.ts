import { IActionExportChatInviteLink } from "../../types/iActionExportChatInviteLink";
import { IStateExportChatInviteLink } from "../../types/iStateExportChatInviteLink";
import * as actions from "../actions";

const exportChatInviteLink: (
  state: IStateExportChatInviteLink | undefined,
  action: IActionExportChatInviteLink
) => IStateExportChatInviteLink = (
  state: IStateExportChatInviteLink | undefined = actions.exportChatInviteLink
    .initialState,
  action: IActionExportChatInviteLink
): IStateExportChatInviteLink => {
  switch (action.type) {
    case actions.exportChatInviteLink.EXPORT_CHAT_INVITE_LINK_ERROR:
      return { ...state, error: action.exportChatInviteLink.error };
    case actions.exportChatInviteLink.EXPORT_CHAT_INVITE_LINK_QUERY:
      return { ...state, query: action.exportChatInviteLink.query };
    case actions.exportChatInviteLink.EXPORT_CHAT_INVITE_LINK_RESULT:
      return { ...state, result: action.exportChatInviteLink.result };
    default:
      return state;
  }
};

export { exportChatInviteLink };
