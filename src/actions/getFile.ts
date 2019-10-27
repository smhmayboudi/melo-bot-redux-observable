import { IActionGetFile } from "../../types/iActionGetFile";
import { IStateGetFile } from "../../types/iStateGetFile";

const initialState: IStateGetFile = {};

const GET_FILE_ERROR: string = "GET_FILE_ERROR";
const GET_FILE_QUERY: string = "GET_FILE_QUERY";
const GET_FILE_RESULT: string = "GET_FILE_RESULT";

const error: (getFile: IStateGetFile) => IActionGetFile = (
  getFile: IStateGetFile
): IActionGetFile => ({
  getFile: {
    error: getFile.error
  },
  type: GET_FILE_ERROR
});
const query: (getFile: IStateGetFile) => IActionGetFile = (
  getFile: IStateGetFile
): IActionGetFile => ({
  getFile: {
    query: getFile.query
  },
  type: GET_FILE_QUERY
});
const result: (getFile: IStateGetFile) => IActionGetFile = (
  getFile: IStateGetFile
): IActionGetFile => ({
  getFile: {
    result: getFile.result
  },
  type: GET_FILE_RESULT
});

export {
  initialState,
  GET_FILE_ERROR,
  GET_FILE_QUERY,
  GET_FILE_RESULT,
  error,
  query,
  result
};
