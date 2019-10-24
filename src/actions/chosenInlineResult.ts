import { IActionChosenInlineResult } from "../../types/iActionChosenInlineResult";
import { IStateChosenInlineResult } from "../../types/iStateChosenInlineResult";

const initialState: IStateChosenInlineResult = {};

const CHOSEN_INLINE_RESULT_ERROR: string = "CHOSEN_INLINE_RESULT_ERROR";
const CHOSEN_INLINE_RESULT_QUERY: string = "CHOSEN_INLINE_RESULT_QUERY";
const CHOSEN_INLINE_RESULT_RESULT: string = "CHOSEN_INLINE_RESULT_RESULT";

const error: (
  chosenInlineResult: IStateChosenInlineResult
) => IActionChosenInlineResult = (
  chosenInlineResult: IStateChosenInlineResult
): IActionChosenInlineResult => ({
  chosenInlineResult: {
    error: chosenInlineResult.error
  },
  type: CHOSEN_INLINE_RESULT_ERROR
});
const query: (
  chosenInlineResult: IStateChosenInlineResult
) => IActionChosenInlineResult = (
  chosenInlineResult: IStateChosenInlineResult
): IActionChosenInlineResult => ({
  chosenInlineResult: {
    query: chosenInlineResult.query
  },
  type: CHOSEN_INLINE_RESULT_QUERY
});
const result: (
  chosenInlineResult: IStateChosenInlineResult
) => IActionChosenInlineResult = (
  chosenInlineResult: IStateChosenInlineResult
): IActionChosenInlineResult => ({
  chosenInlineResult: {
    result: chosenInlineResult.result
  },
  type: CHOSEN_INLINE_RESULT_RESULT
});

export {
  initialState,
  CHOSEN_INLINE_RESULT_ERROR,
  CHOSEN_INLINE_RESULT_QUERY,
  CHOSEN_INLINE_RESULT_RESULT,
  error,
  query,
  result
};
