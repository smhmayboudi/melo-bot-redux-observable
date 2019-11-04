import { IActionSetChatTitle } from "../../types/iActionSetChatTitle";
import { IStateSetChatTitle } from "../../types/iStateSetChatTitle";

const initialState: IStateSetChatTitle = {};

const SET_CHAT_TITLE_ERROR = "SET_CHAT_TITLE_ERROR";
const SET_CHAT_TITLE_QUERY = "SET_CHAT_TITLE_QUERY";
const SET_CHAT_TITLE_RESULT = "SET_CHAT_TITLE_RESULT";

const error: (setChatTitle: IStateSetChatTitle) => IActionSetChatTitle = (
  setChatTitle: IStateSetChatTitle
): IActionSetChatTitle => ({
  setChatTitle: { error: setChatTitle.error },
  type: SET_CHAT_TITLE_ERROR
});
const query: (setChatTitle: IStateSetChatTitle) => IActionSetChatTitle = (
  setChatTitle: IStateSetChatTitle
): IActionSetChatTitle => ({
  setChatTitle: { query: setChatTitle.query },
  type: SET_CHAT_TITLE_QUERY
});
const result: (setChatTitle: IStateSetChatTitle) => IActionSetChatTitle = (
  setChatTitle: IStateSetChatTitle
): IActionSetChatTitle => ({
  setChatTitle: { result: setChatTitle.result },
  type: SET_CHAT_TITLE_RESULT
});

export {
  initialState,
  SET_CHAT_TITLE_ERROR,
  SET_CHAT_TITLE_QUERY,
  SET_CHAT_TITLE_RESULT,
  error,
  query,
  result
};
