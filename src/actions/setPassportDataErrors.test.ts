import { IStateSetPassportDataErrorsQuery } from "../../types/iStateSetPassportDataErrorsQuery";

import * as action from "./setPassportDataErrors";

describe("setPassportDataErrors actions", (): void => {
  const error: Error = new Error("");
  const query: IStateSetPassportDataErrorsQuery = {
    errors: [
      {
        data_hash: "",
        field_name: "",
        message: "",
        source: "",
        type: ""
      }
    ],
    user_id: 0
  };
  const result = true;

  test("should handle error", (): void => {
    expect(action.error({ error })).toEqual({
      setPassportDataErrors: { error },
      type: action.SET_PASSPORT_DATA_ERRORS_ERROR
    });
  });

  test("should handle query", (): void => {
    expect(action.query({ query })).toEqual({
      setPassportDataErrors: { query },
      type: action.SET_PASSPORT_DATA_ERRORS_QUERY
    });
  });

  test("should handle result", (): void => {
    expect(action.result({ result })).toEqual({
      setPassportDataErrors: { result },
      type: action.SET_PASSPORT_DATA_ERRORS_RESULT
    });
  });
});
