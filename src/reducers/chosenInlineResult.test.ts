import { IStateChosenInlineResultQuery } from "../../types/iStateChosenInlineResultQuery";
import * as action from "../actions/chosenInlineResult";

import * as reducer from "./chosenInlineResult";

describe("chosenInlineResult reducer", (): void => {
  const error: Error = new Error("");
  const query: IStateChosenInlineResultQuery = {
    from: {
      first_name: "",
      id: 0,
      is_bot: false
    },
    query: "",
    result_id: ""
  };
  const result = true;

  test("should handle initialState", (): void => {
    expect(
      reducer.chosenInlineResult(undefined, {
        chosenInlineResult: {},
        type: ""
      })
    ).toEqual(action.initialState);
  });

  test("should handle error", (): void => {
    expect(
      reducer.chosenInlineResult(
        { ...action.initialState, query },
        action.error({ error })
      )
    ).toEqual({ error, query });
  });

  test("should handle query", (): void => {
    expect(
      reducer.chosenInlineResult(action.initialState, action.query({ query }))
    ).toEqual({ query });
  });

  test("should handle result", (): void => {
    expect(
      reducer.chosenInlineResult(
        { ...action.initialState, query },
        action.result({ result })
      )
    ).toEqual({ query, result });
  });
});
