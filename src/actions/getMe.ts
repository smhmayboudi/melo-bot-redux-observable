import { IActionGetMe } from "../../types/iActionGetMe";
import { IStateGetMe } from "../../types/iStateGetMe";

const initialState: IStateGetMe = {};

const GET_ME_ERROR = "GET_ME_ERROR";
const GET_ME_QUERY = "GET_ME_QUERY";
const GET_ME_RESULT = "GET_ME_RESULT";

const error: (getMe: IStateGetMe) => IActionGetMe = (
  getMe: IStateGetMe
): IActionGetMe => ({
  getMe: {
    error: getMe.error
  },
  type: GET_ME_ERROR
});
const query: (getMe: IStateGetMe) => IActionGetMe = (
  getMe: IStateGetMe
): IActionGetMe => ({
  getMe: {
    query: getMe.query
  },
  type: GET_ME_QUERY
});
const result: (getMe: IStateGetMe) => IActionGetMe = (
  getMe: IStateGetMe
): IActionGetMe => ({
  getMe: {
    result: getMe.result
  },
  type: GET_ME_RESULT
});

export {
  initialState,
  GET_ME_ERROR,
  GET_ME_QUERY,
  GET_ME_RESULT,
  error,
  query,
  result
};
