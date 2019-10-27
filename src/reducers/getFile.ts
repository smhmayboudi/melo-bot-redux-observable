import { IActionGetFile } from "../../types/iActionGetFile";
import { IStateGetFile } from "../../types/iStateGetFile";
import * as actions from "../actions";

const getFile: (
  state: IStateGetFile | undefined,
  action: IActionGetFile
) => IStateGetFile = (
  state: IStateGetFile | undefined = actions.getFile.initialState,
  action: IActionGetFile
): IStateGetFile => {
  switch (action.type) {
    case actions.getFile.GET_FILE_ERROR:
      return { error: action.getFile.error, query: state.query };
    case actions.getFile.GET_FILE_QUERY:
      return { query: action.getFile.query };
    case actions.getFile.GET_FILE_RESULT:
      return { query: state.query, result: action.getFile.result };
    default:
      return state;
  }
};

export { getFile };
