import { IActionSetPassportDataErrors } from "../../types/iActionSetPassportDataErrors";
import { IStateSetPassportDataErrors } from "../../types/iStateSetPassportDataErrors";

const initialState: IStateSetPassportDataErrors = {};

const SET_PASSPORT_DATA_ERRORS_ERROR = "SET_PASSPORT_DATA_ERRORS_ERROR";
const SET_PASSPORT_DATA_ERRORS_QUERY = "SET_PASSPORT_DATA_ERRORS_QUERY";
const SET_PASSPORT_DATA_ERRORS_RESULT = "SET_PASSPORT_DATA_ERRORS_RESULT";

const error: (
  setPassportDataErrors: IStateSetPassportDataErrors
) => IActionSetPassportDataErrors = (
  setPassportDataErrors: IStateSetPassportDataErrors
): IActionSetPassportDataErrors => ({
  setPassportDataErrors: {
    error: setPassportDataErrors.error
  },
  type: SET_PASSPORT_DATA_ERRORS_ERROR
});
const query: (
  setPassportDataErrors: IStateSetPassportDataErrors
) => IActionSetPassportDataErrors = (
  setPassportDataErrors: IStateSetPassportDataErrors
): IActionSetPassportDataErrors => ({
  setPassportDataErrors: {
    query: setPassportDataErrors.query
  },
  type: SET_PASSPORT_DATA_ERRORS_QUERY
});
const result: (
  setPassportDataErrors: IStateSetPassportDataErrors
) => IActionSetPassportDataErrors = (
  setPassportDataErrors: IStateSetPassportDataErrors
): IActionSetPassportDataErrors => ({
  setPassportDataErrors: {
    result: setPassportDataErrors.result
  },
  type: SET_PASSPORT_DATA_ERRORS_RESULT
});

export {
  initialState,
  SET_PASSPORT_DATA_ERRORS_ERROR,
  SET_PASSPORT_DATA_ERRORS_QUERY,
  SET_PASSPORT_DATA_ERRORS_RESULT,
  error,
  query,
  result
};
