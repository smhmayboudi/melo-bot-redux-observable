import { IActionGetChatMember } from "../../types/iActionGetChatMember";

const actionGetChatMemberResultStatus: (
  action: IActionGetChatMember
) => boolean = (action: IActionGetChatMember): boolean => {
  if (action.getChatMember.result !== undefined) {
    switch (action.getChatMember.result.status) {
      case "administrator":
      case "creator":
      case "member":
      case "restricted":
        return true;
      case "left":
      case "kicked":
      default:
        return false;
    }
  }

  return false;
};

export { actionGetChatMemberResultStatus };
