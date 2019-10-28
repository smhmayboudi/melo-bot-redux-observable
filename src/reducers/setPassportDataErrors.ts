import { IActionSetPassportDataErrors } from "../../types/iActionSetPassportDataErrors";
import { IStateSetPassportDataErrors } from "../../types/iStateSetPassportDataErrors";
import * as actions from "../actions";

const setPassportDataErrors: (
  state: IStateSetPassportDataErrors | undefined,
  action: IActionSetPassportDataErrors
) => IStateSetPassportDataErrors = (
  state: IStateSetPassportDataErrors | undefined = actions.setPassportDataErrors
    .initialState,
  action: IActionSetPassportDataErrors
): IStateSetPassportDataErrors => {
  switch (action.type) {
    case actions.setPassportDataErrors.SET_PASSPORT_DATA_ERRORS_ERROR:
      return { ...state, error: action.setPassportDataErrors.error };
    case actions.setPassportDataErrors.SET_PASSPORT_DATA_ERRORS_QUERY:
      return { ...state, query: action.setPassportDataErrors.query };
    case actions.setPassportDataErrors.SET_PASSPORT_DATA_ERRORS_RESULT:
      return {
        ...state,
        result: action.setPassportDataErrors.result
      };
    default:
      return state;
  }
};

export { setPassportDataErrors };
