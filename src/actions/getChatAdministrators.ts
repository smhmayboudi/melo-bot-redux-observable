import { IActionGetChatAdministrators } from "../../types/iActionGetChatAdministrators";
import { IStateGetChatAdministrators } from "../../types/iStateGetChatAdministrators";

const initialState: IStateGetChatAdministrators = {};

const GET_CHAT_ADMINISTRATORS_ERROR = "GET_CHAT_ADMINISTRATORS_ERROR";
const GET_CHAT_ADMINISTRATORS_QUERY = "GET_CHAT_ADMINISTRATORS_QUERY";
const GET_CHAT_ADMINISTRATORS_RESULT = "GET_CHAT_ADMINISTRATORS_RESULT";

const error: (
  getChatAdministrators: IStateGetChatAdministrators
) => IActionGetChatAdministrators = (
  getChatAdministrators: IStateGetChatAdministrators
): IActionGetChatAdministrators => ({
  getChatAdministrators: {
    error: getChatAdministrators.error
  },
  type: GET_CHAT_ADMINISTRATORS_ERROR
});
const query: (
  getChatAdministrators: IStateGetChatAdministrators
) => IActionGetChatAdministrators = (
  getChatAdministrators: IStateGetChatAdministrators
): IActionGetChatAdministrators => ({
  getChatAdministrators: {
    query: getChatAdministrators.query
  },
  type: GET_CHAT_ADMINISTRATORS_QUERY
});
const result: (
  getChatAdministrators: IStateGetChatAdministrators
) => IActionGetChatAdministrators = (
  getChatAdministrators: IStateGetChatAdministrators
): IActionGetChatAdministrators => ({
  getChatAdministrators: {
    result: getChatAdministrators.result
  },
  type: GET_CHAT_ADMINISTRATORS_RESULT
});

export {
  initialState,
  GET_CHAT_ADMINISTRATORS_ERROR,
  GET_CHAT_ADMINISTRATORS_QUERY,
  GET_CHAT_ADMINISTRATORS_RESULT,
  error,
  query,
  result
};
