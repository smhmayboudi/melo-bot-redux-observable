import { IActionGetChatMember } from "../../types/iActionGetChatMember";
import { IStateGetChatMember } from "../../types/iStateGetChatMember";

const initialState: IStateGetChatMember = {};

const GET_CHAT_MEMBER_ERROR: string = "GET_CHAT_MEMBER_ERROR";
const GET_CHAT_MEMBER_QUERY: string = "GET_CHAT_MEMBER_QUERY";
const GET_CHAT_MEMBER_RESULT: string = "GET_CHAT_MEMBER_RESULT";

const error:
  (getChatMember: IStateGetChatMember) => IActionGetChatMember =
  (getChatMember: IStateGetChatMember): IActionGetChatMember =>
    ({
      getChatMember: {
        error: getChatMember.error,
      },
      type: GET_CHAT_MEMBER_ERROR,
    })
  ;
const query:
  (getChatMember: IStateGetChatMember) => IActionGetChatMember =
  (getChatMember: IStateGetChatMember): IActionGetChatMember =>
    ({
      getChatMember: {
        query: getChatMember.query,
      },
      type: GET_CHAT_MEMBER_QUERY,
    })
  ;
const result:
  (getChatMember: IStateGetChatMember) => IActionGetChatMember =
  (getChatMember: IStateGetChatMember): IActionGetChatMember =>
    ({
      getChatMember: {
        result: getChatMember.result,
      },
      type: GET_CHAT_MEMBER_RESULT,
    })
  ;

export {
  initialState,
  GET_CHAT_MEMBER_ERROR,
  GET_CHAT_MEMBER_QUERY,
  GET_CHAT_MEMBER_RESULT,
  error,
  query,
  result,
};
