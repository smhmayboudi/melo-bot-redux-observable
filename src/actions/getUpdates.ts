import { IActionGetUpdates } from "../../types/iActionGetUpdates";
import { IStateGetUpdates } from "../../types/iStateGetUpdates";

const initialState: IStateGetUpdates = {};

const GET_UPDATES_ERROR = "GET_UPDATES_ERROR";
const GET_UPDATES_QUERY = "GET_UPDATES_QUERY";
const GET_UPDATES_RESULT = "GET_UPDATES_RESULT";

const error: (getUpdates: IStateGetUpdates) => IActionGetUpdates = (
  getUpdates: IStateGetUpdates
): IActionGetUpdates => ({
  getUpdates: {
    error: getUpdates.error
  },
  type: GET_UPDATES_ERROR
});
const query: (getUpdates: IStateGetUpdates) => IActionGetUpdates = (
  getUpdates: IStateGetUpdates
): IActionGetUpdates => ({
  getUpdates: {
    query: getUpdates.query
  },
  type: GET_UPDATES_QUERY
});
const result: (getUpdates: IStateGetUpdates) => IActionGetUpdates = (
  getUpdates: IStateGetUpdates
): IActionGetUpdates => ({
  getUpdates: {
    result: getUpdates.result
  },
  type: GET_UPDATES_RESULT
});

export {
  initialState,
  GET_UPDATES_ERROR,
  GET_UPDATES_QUERY,
  GET_UPDATES_RESULT,
  error,
  query,
  result
};
