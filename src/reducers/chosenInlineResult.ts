import { IActionChosenInlineResult } from "../../types/iActionChosenInlineResult";
import { IStateChosenInlineResult } from "../../types/iStateChosenInlineResult";
import * as actions from "../actions";

const chosenInlineResult: (
  state: IStateChosenInlineResult | undefined,
  action: IActionChosenInlineResult
) => IStateChosenInlineResult = (
  state: IStateChosenInlineResult | undefined = actions.chosenInlineResult
    .initialState,
  action: IActionChosenInlineResult
): IStateChosenInlineResult => {
  switch (action.type) {
    case actions.chosenInlineResult.CHOSEN_INLINE_RESULT_ERROR:
      return { ...state, error: action.chosenInlineResult.error };
    case actions.chosenInlineResult.CHOSEN_INLINE_RESULT_QUERY:
      return { ...state, query: action.chosenInlineResult.query };
    case actions.chosenInlineResult.CHOSEN_INLINE_RESULT_RESULT:
      return { ...state, result: action.chosenInlineResult.result };
    default:
      return state;
  }
};

export { chosenInlineResult };
