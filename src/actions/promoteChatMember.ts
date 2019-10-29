import { IActionPromoteChatMember } from "../../types/iActionPromoteChatMember";
import { IStatePromoteChatMember } from "../../types/iStatePromoteChatMember";

const initialState: IStatePromoteChatMember = {};

const PROMOTE_CHAT_MEMBER_ERROR = "PROMOTE_CHAT_MEMBER_ERROR";
const PROMOTE_CHAT_MEMBER_QUERY = "PROMOTE_CHAT_MEMBER_QUERY";
const PROMOTE_CHAT_MEMBER_RESULT = "PROMOTE_CHAT_MEMBER_RESULT";

const error: (
  promoteChatMember: IStatePromoteChatMember
) => IActionPromoteChatMember = (
  promoteChatMember: IStatePromoteChatMember
): IActionPromoteChatMember => ({
  promoteChatMember: {
    error: promoteChatMember.error
  },
  type: PROMOTE_CHAT_MEMBER_ERROR
});
const query: (
  promoteChatMember: IStatePromoteChatMember
) => IActionPromoteChatMember = (
  promoteChatMember: IStatePromoteChatMember
): IActionPromoteChatMember => ({
  promoteChatMember: {
    query: promoteChatMember.query
  },
  type: PROMOTE_CHAT_MEMBER_QUERY
});
const result: (
  promoteChatMember: IStatePromoteChatMember
) => IActionPromoteChatMember = (
  promoteChatMember: IStatePromoteChatMember
): IActionPromoteChatMember => ({
  promoteChatMember: {
    result: promoteChatMember.result
  },
  type: PROMOTE_CHAT_MEMBER_RESULT
});

export {
  initialState,
  PROMOTE_CHAT_MEMBER_ERROR,
  PROMOTE_CHAT_MEMBER_QUERY,
  PROMOTE_CHAT_MEMBER_RESULT,
  error,
  query,
  result
};
