import { IStateSetChatTitleQuery } from "../../types/iStateSetChatTitleQuery";
import * as action from "../actions/setChatTitle";

import * as reducer from "./setChatTitle";

describe("setChatTitle reducer", (): void => {
  const error: Error = new Error("");
  const query: IStateSetChatTitleQuery = {
    chat_id: 0,
    title: ""
  };
  const result: boolean = true;

  test("should handle initialState", (): void => {
    expect(
      reducer.setChatTitle(undefined, {
        setChatTitle: {},
        type: ""
      })
    ).toEqual(action.initialState);
  });

  test("should handle error", (): void => {
    expect(
      reducer.setChatTitle(
        { ...action.initialState, query },
        action.error({ error })
      )
    ).toEqual({ error, query });
  });

  test("should handle query", (): void => {
    expect(
      reducer.setChatTitle(action.initialState, action.query({ query }))
    ).toEqual({ query });
  });

  test("should handle result", (): void => {
    expect(
      reducer.setChatTitle(
        { ...action.initialState, query },
        action.result({ result })
      )
    ).toEqual({ query, result });
  });
});
