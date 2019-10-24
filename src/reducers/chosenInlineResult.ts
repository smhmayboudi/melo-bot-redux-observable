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
      return { error: action.chosenInlineResult.error, query: state.query };
    case actions.chosenInlineResult.CHOSEN_INLINE_RESULT_QUERY:
      return { query: action.chosenInlineResult.query };
    case actions.chosenInlineResult.CHOSEN_INLINE_RESULT_RESULT:
      return { query: state.query, result: action.chosenInlineResult.result };
    default:
      return state;
  }
};

export { chosenInlineResult };
