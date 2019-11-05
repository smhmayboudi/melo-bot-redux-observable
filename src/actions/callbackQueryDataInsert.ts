import { IActionCallbackQueryDataInsert } from "../../types/iActionCallbackQueryDataInsert";
import { IStateCallbackQueryDataInsert } from "../../types/iStateCallbackQueryDataInsert";

const initialState: IStateCallbackQueryDataInsert = {};

const CALLBACK_QUERY_DATA_INSERT_ERROR = "CALLBACK_QUERY_DATA_INSERT_ERROR";
const CALLBACK_QUERY_DATA_INSERT_QUERY = "CALLBACK_QUERY_DATA_INSERT_QUERY";
const CALLBACK_QUERY_DATA_INSERT_RESULT = "CALLBACK_QUERY_DATA_INSERT_RESULT";

const error: (
  callbackQueryDataInsert: IStateCallbackQueryDataInsert
) => IActionCallbackQueryDataInsert = (
  callbackQueryDataInsert: IStateCallbackQueryDataInsert
): IActionCallbackQueryDataInsert => ({
  callbackQueryDataInsert: { error: callbackQueryDataInsert.error },
  type: CALLBACK_QUERY_DATA_INSERT_ERROR
});
const query: (
  callbackQueryDataInsert: IStateCallbackQueryDataInsert
) => IActionCallbackQueryDataInsert = (
  callbackQueryDataInsert: IStateCallbackQueryDataInsert
): IActionCallbackQueryDataInsert => ({
  callbackQueryDataInsert: { query: callbackQueryDataInsert.query },
  type: CALLBACK_QUERY_DATA_INSERT_QUERY
});
const result: (
  callbackQueryDataInsert: IStateCallbackQueryDataInsert
) => IActionCallbackQueryDataInsert = (
  callbackQueryDataInsert: IStateCallbackQueryDataInsert
): IActionCallbackQueryDataInsert => ({
  callbackQueryDataInsert: { result: callbackQueryDataInsert.result },
  type: CALLBACK_QUERY_DATA_INSERT_RESULT
});

export {
  initialState,
  CALLBACK_QUERY_DATA_INSERT_ERROR,
  CALLBACK_QUERY_DATA_INSERT_QUERY,
  CALLBACK_QUERY_DATA_INSERT_RESULT,
  error,
  query,
  result
};
