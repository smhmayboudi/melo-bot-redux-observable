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
      return { error: action.setPassportDataErrors.error, query: state.query };
    case actions.setPassportDataErrors.SET_PASSPORT_DATA_ERRORS_QUERY:
      return { query: action.setPassportDataErrors.query };
    case actions.setPassportDataErrors.SET_PASSPORT_DATA_ERRORS_RESULT:
      return {
        query: state.query,
        result: action.setPassportDataErrors.result
      };
    default:
      return state;
  }
};

export { setPassportDataErrors };
