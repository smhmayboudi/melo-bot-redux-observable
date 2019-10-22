import { IStateInlineQueryQuery } from "../../types/iStateInlineQueryQuery";
import * as action from "../actions/inlineQuery";

import * as reducer from "./inlineQuery";

describe("inlineQuery reducer", (): void => {
  const error: Error = new Error("");
  const query: IStateInlineQueryQuery = {
    from: {
      first_name: "",
      id: 0,
      is_bot: false
    },
    id: "",
    offset: "",
    query: ""
  };
  const result: boolean = true;

  test("should handle initialState", (): void => {
    expect(
      reducer.inlineQuery(undefined, { inlineQuery: {}, type: "" })
    ).toEqual(action.initialState);
  });

  test("should handle error", (): void => {
    expect(
      reducer.inlineQuery(
        { ...action.initialState, query },
        action.error({ error })
      )
    ).toEqual({ error, query });
  });

  test("should handle query", (): void => {
    expect(
      reducer.inlineQuery(action.initialState, action.query({ query }))
    ).toEqual({ query });
  });

  test("should handle result", (): void => {
    expect(
      reducer.inlineQuery(
        { ...action.initialState, query },
        action.result({ result })
      )
    ).toEqual({ query, result });
  });
});
