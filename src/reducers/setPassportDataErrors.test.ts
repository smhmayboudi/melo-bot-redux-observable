import { IStateSetPassportDataErrorsQuery } from "../../types/iStateSetPassportDataErrorsQuery";
import * as action from "../actions/setPassportDataErrors";

import * as reducer from "./setPassportDataErrors";

describe("setPassportDataErrors reducer", (): void => {
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

  test("should handle initialState", (): void => {
    expect(
      reducer.setPassportDataErrors(undefined, {
        setPassportDataErrors: {},
        type: ""
      })
    ).toEqual(action.initialState);
  });

  test("should handle error", (): void => {
    expect(
      reducer.setPassportDataErrors(
        { ...action.initialState, query },
        action.error({ error })
      )
    ).toEqual({ error, query });
  });

  test("should handle query", (): void => {
    expect(
      reducer.setPassportDataErrors(
        action.initialState,
        action.query({ query })
      )
    ).toEqual({ query });
  });

  test("should handle result", (): void => {
    expect(
      reducer.setPassportDataErrors(
        { ...action.initialState, query },
        action.result({ result })
      )
    ).toEqual({ query, result });
  });
});
