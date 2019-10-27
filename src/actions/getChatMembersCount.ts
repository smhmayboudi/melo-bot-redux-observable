import { IActionGetChatMembersCount } from "../../types/iActionGetChatMembersCount";
import { IStateGetChatMembersCount } from "../../types/iStateGetChatMembersCount";

const initialState: IStateGetChatMembersCount = {};

const GET_CHAT_MEMBERS_COUNT_ERROR: string = "GET_CHAT_MEMBERS_COUNT_ERROR";
const GET_CHAT_MEMBERS_COUNT_QUERY: string = "GET_CHAT_MEMBERS_COUNT_QUERY";
const GET_CHAT_MEMBERS_COUNT_RESULT: string = "GET_CHAT_MEMBERS_COUNT_RESULT";

const error: (
  getChatMembersCount: IStateGetChatMembersCount
) => IActionGetChatMembersCount = (
  getChatMembersCount: IStateGetChatMembersCount
): IActionGetChatMembersCount => ({
  getChatMembersCount: {
    error: getChatMembersCount.error
  },
  type: GET_CHAT_MEMBERS_COUNT_ERROR
});
const query: (
  getChatMembersCount: IStateGetChatMembersCount
) => IActionGetChatMembersCount = (
  getChatMembersCount: IStateGetChatMembersCount
): IActionGetChatMembersCount => ({
  getChatMembersCount: {
    query: getChatMembersCount.query
  },
  type: GET_CHAT_MEMBERS_COUNT_QUERY
});
const result: (
  getChatMembersCount: IStateGetChatMembersCount
) => IActionGetChatMembersCount = (
  getChatMembersCount: IStateGetChatMembersCount
): IActionGetChatMembersCount => ({
  getChatMembersCount: {
    result: getChatMembersCount.result
  },
  type: GET_CHAT_MEMBERS_COUNT_RESULT
});

export {
  initialState,
  GET_CHAT_MEMBERS_COUNT_ERROR,
  GET_CHAT_MEMBERS_COUNT_QUERY,
  GET_CHAT_MEMBERS_COUNT_RESULT,
  error,
  query,
  result
};
