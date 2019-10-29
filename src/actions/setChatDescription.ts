import { IActionSetChatDescription } from "../../types/iActionSetChatDescription";
import { IStateSetChatDescription } from "../../types/iStateSetChatDescription";

const initialState: IStateSetChatDescription = {};

const SET_CHAT_DESCRIPTION_ERROR = "SET_CHAT_DESCRIPTION_ERROR";
const SET_CHAT_DESCRIPTION_QUERY = "SET_CHAT_DESCRIPTION_QUERY";
const SET_CHAT_DESCRIPTION_RESULT = "SET_CHAT_DESCRIPTION_RESULT";

const error: (
  setChatDescription: IStateSetChatDescription
) => IActionSetChatDescription = (
  setChatDescription: IStateSetChatDescription
): IActionSetChatDescription => ({
  setChatDescription: {
    error: setChatDescription.error
  },
  type: SET_CHAT_DESCRIPTION_ERROR
});
const query: (
  setChatDescription: IStateSetChatDescription
) => IActionSetChatDescription = (
  setChatDescription: IStateSetChatDescription
): IActionSetChatDescription => ({
  setChatDescription: {
    query: setChatDescription.query
  },
  type: SET_CHAT_DESCRIPTION_QUERY
});
const result: (
  setChatDescription: IStateSetChatDescription
) => IActionSetChatDescription = (
  setChatDescription: IStateSetChatDescription
): IActionSetChatDescription => ({
  setChatDescription: {
    result: setChatDescription.result
  },
  type: SET_CHAT_DESCRIPTION_RESULT
});

export {
  initialState,
  SET_CHAT_DESCRIPTION_ERROR,
  SET_CHAT_DESCRIPTION_QUERY,
  SET_CHAT_DESCRIPTION_RESULT,
  error,
  query,
  result
};
