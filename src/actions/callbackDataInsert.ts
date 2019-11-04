import { IActionCallbackDataInsert } from "../../types/iActionCallbackDataInsert";
import { IStateCallbackDataInsert } from "../../types/iStateCallbackDataInsert";

const initialState: IStateCallbackDataInsert = {};

const CALLBACK_DATA_INSERT_ERROR = "CALLBACK_DATA_INSERT_ERROR";
const CALLBACK_DATA_INSERT_QUERY = "CALLBACK_DATA_INSERT_QUERY";
const CALLBACK_DATA_INSERT_RESULT = "CALLBACK_DATA_INSERT_RESULT";

const error: (
  callbackDataInsert: IStateCallbackDataInsert
) => IActionCallbackDataInsert = (
  callbackDataInsert: IStateCallbackDataInsert
): IActionCallbackDataInsert => ({
  callbackDataInsert: { error: callbackDataInsert.error },
  type: CALLBACK_DATA_INSERT_ERROR
});
const query: (
  callbackDataInsert: IStateCallbackDataInsert
) => IActionCallbackDataInsert = (
  callbackDataInsert: IStateCallbackDataInsert
): IActionCallbackDataInsert => ({
  callbackDataInsert: { query: callbackDataInsert.query },
  type: CALLBACK_DATA_INSERT_QUERY
});
const result: (
  callbackDataInsert: IStateCallbackDataInsert
) => IActionCallbackDataInsert = (
  callbackDataInsert: IStateCallbackDataInsert
): IActionCallbackDataInsert => ({
  callbackDataInsert: { result: callbackDataInsert.result },
  type: CALLBACK_DATA_INSERT_RESULT
});

export {
  initialState,
  CALLBACK_DATA_INSERT_ERROR,
  CALLBACK_DATA_INSERT_QUERY,
  CALLBACK_DATA_INSERT_RESULT,
  error,
  query,
  result
};
