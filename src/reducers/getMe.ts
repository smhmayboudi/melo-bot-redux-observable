import { IActionGetMe } from "../../types/iActionGetMe";
import { IStateGetMe } from "../../types/iStateGetMe";
import * as actions from "../actions";

const getMe: (
  state: IStateGetMe | undefined,
  action: IActionGetMe
) => IStateGetMe = (
  state: IStateGetMe | undefined = actions.getMe.initialState,
  action: IActionGetMe
): IStateGetMe => {
  switch (action.type) {
    case actions.getMe.GET_ME_ERROR:
      return { ...state, error: action.getMe.error };
    case actions.getMe.GET_ME_QUERY:
      return { ...state, query: action.getMe.query };
    case actions.getMe.GET_ME_RESULT:
      return { ...state, result: action.getMe.result };
    default:
      return state;
  }
};

export { getMe };
