import { IActionGetChat } from "../../types/iActionGetChat";
import { IStateGetChat } from "../../types/iStateGetChat";

const initialState: IStateGetChat = {};

const GET_CHAT_ERROR = "GET_CHAT_ERROR";
const GET_CHAT_QUERY = "GET_CHAT_QUERY";
const GET_CHAT_RESULT = "GET_CHAT_RESULT";

const error: (getChat: IStateGetChat) => IActionGetChat = (
  getChat: IStateGetChat
): IActionGetChat => ({
  getChat: { error: getChat.error },
  type: GET_CHAT_ERROR
});
const query: (getChat: IStateGetChat) => IActionGetChat = (
  getChat: IStateGetChat
): IActionGetChat => ({
  getChat: { query: getChat.query },
  type: GET_CHAT_QUERY
});
const result: (getChat: IStateGetChat) => IActionGetChat = (
  getChat: IStateGetChat
): IActionGetChat => ({
  getChat: { result: getChat.result },
  type: GET_CHAT_RESULT
});

export {
  initialState,
  GET_CHAT_ERROR,
  GET_CHAT_QUERY,
  GET_CHAT_RESULT,
  error,
  query,
  result
};
