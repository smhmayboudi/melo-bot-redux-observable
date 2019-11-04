import { IActionCallbackDataFind } from "../../types/iActionCallbackDataFind";
import { IStateCallbackDataFind } from "../../types/iStateCallbackDataFind";

const initialState: IStateCallbackDataFind = {};

const CALLBACK_DATA_FIND_ERROR = "CALLBACK_DATA_FIND_ERROR";
const CALLBACK_DATA_FIND_QUERY = "CALLBACK_DATA_FIND_QUERY";
const CALLBACK_DATA_FIND_RESULT = "CALLBACK_DATA_FIND_RESULT";

const error: (
  callbackDataFind: IStateCallbackDataFind
) => IActionCallbackDataFind = (
  callbackDataFind: IStateCallbackDataFind
): IActionCallbackDataFind => ({
  callbackDataFind: { error: callbackDataFind.error },
  type: CALLBACK_DATA_FIND_ERROR
});
const query: (
  callbackDataFind: IStateCallbackDataFind
) => IActionCallbackDataFind = (
  callbackDataFind: IStateCallbackDataFind
): IActionCallbackDataFind => ({
  callbackDataFind: { query: callbackDataFind.query },
  type: CALLBACK_DATA_FIND_QUERY
});
const result: (
  callbackDataFind: IStateCallbackDataFind
) => IActionCallbackDataFind = (
  callbackDataFind: IStateCallbackDataFind
): IActionCallbackDataFind => ({
  callbackDataFind: { result: callbackDataFind.result },
  type: CALLBACK_DATA_FIND_RESULT
});

export {
  initialState,
  CALLBACK_DATA_FIND_ERROR,
  CALLBACK_DATA_FIND_QUERY,
  CALLBACK_DATA_FIND_RESULT,
  error,
  query,
  result
};
