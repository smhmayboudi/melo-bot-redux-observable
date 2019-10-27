import { IActionPromoteChatMember } from "../../types/iActionPromoteChatMember";
import { IStatePromoteChatMember } from "../../types/iStatePromoteChatMember";
import * as actions from "../actions";

const promoteChatMember: (
  state: IStatePromoteChatMember | undefined,
  action: IActionPromoteChatMember
) => IStatePromoteChatMember = (
  state: IStatePromoteChatMember | undefined = actions.promoteChatMember
    .initialState,
  action: IActionPromoteChatMember
): IStatePromoteChatMember => {
  switch (action.type) {
    case actions.promoteChatMember.PROMOTE_CHAT_MEMBER_ERROR:
      return { error: action.promoteChatMember.error, query: state.query };
    case actions.promoteChatMember.PROMOTE_CHAT_MEMBER_QUERY:
      return { query: action.promoteChatMember.query };
    case actions.promoteChatMember.PROMOTE_CHAT_MEMBER_RESULT:
      return { query: state.query, result: action.promoteChatMember.result };
    default:
      return state;
  }
};

export { promoteChatMember };
