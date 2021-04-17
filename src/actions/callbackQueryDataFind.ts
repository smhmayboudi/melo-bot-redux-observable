import { IActionCallbackQueryDataFind } from "../../types/iActionCallbackQueryDataFind";
import { IStateCallbackQueryDataFind } from "../../types/iStateCallbackQueryDataFind";

const initialState: IStateCallbackQueryDataFind = {};

const CALLBACK_QUERY_DATA_FIND_ERROR = "CALLBACK_QUERY_DATA_FIND_ERROR";
const CALLBACK_QUERY_DATA_FIND_QUERY = "CALLBACK_QUERY_DATA_FIND_QUERY";
const CALLBACK_QUERY_DATA_FIND_RESULT = "CALLBACK_QUERY_DATA_FIND_RESULT";

const error: (
  callbackQueryDataFind: IStateCallbackQueryDataFind
) => IActionCallbackQueryDataFind = (
  callbackQueryDataFind: IStateCallbackQueryDataFind
): IActionCallbackQueryDataFind => ({
  callbackQueryDataFind: { error: callbackQueryDataFind.error },
  type: CALLBACK_QUERY_DATA_FIND_ERROR
});
const query: (
  callbackQueryDataFind: IStateCallbackQueryDataFind
) => IActionCallbackQueryDataFind = (
  callbackQueryDataFind: IStateCallbackQueryDataFind
): IActionCallbackQueryDataFind => ({
  callbackQueryDataFind: { query: callbackQueryDataFind.query },
  type: CALLBACK_QUERY_DATA_FIND_QUERY
});
const result: (
  callbackQueryDataFind: IStateCallbackQueryDataFind
) => IActionCallbackQueryDataFind = (
  callbackQueryDataFind: IStateCallbackQueryDataFind
): IActionCallbackQueryDataFind => ({
  callbackQueryDataFind: { result: callbackQueryDataFind.result },
  type: CALLBACK_QUERY_DATA_FIND_RESULT
});

export {
  initialState,
  CALLBACK_QUERY_DATA_FIND_ERROR,
  CALLBACK_QUERY_DATA_FIND_QUERY,
  CALLBACK_QUERY_DATA_FIND_RESULT,
  error,
  query,
  result
};
