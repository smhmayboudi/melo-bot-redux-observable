import { IStateSetChatDescriptionQuery } from "../../types/iStateSetChatDescriptionQuery";
import * as action from "../actions/setChatDescription";

import * as reducer from "./setChatDescription";

describe("setChatDescription reducer", (): void => {
  const error: Error = new Error("");
  const query: IStateSetChatDescriptionQuery = {
    chat_id: 0
  };
  const result: boolean = true;

  test("should handle initialState", (): void => {
    expect(
      reducer.setChatDescription(undefined, {
        setChatDescription: {},
        type: ""
      })
    ).toEqual(action.initialState);
  });

  test("should handle error", (): void => {
    expect(
      reducer.setChatDescription(
        { ...action.initialState, query },
        action.error({ error })
      )
    ).toEqual({ error, query });
  });

  test("should handle query", (): void => {
    expect(
      reducer.setChatDescription(action.initialState, action.query({ query }))
    ).toEqual({ query });
  });

  test("should handle result", (): void => {
    expect(
      reducer.setChatDescription(
        { ...action.initialState, query },
        action.result({ result })
      )
    ).toEqual({ query, result });
  });
});
