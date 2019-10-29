import { IStateLeaveChatQuery } from "../../types/iStateLeaveChatQuery";
import * as action from "../actions/leaveChat";

import * as reducer from "./leaveChat";

describe("leaveChat reducer", (): void => {
  const error: Error = new Error("");
  const query: IStateLeaveChatQuery = {
    chat_id: 0
  };
  const result = true;

  test("should handle initialState", (): void => {
    expect(
      reducer.leaveChat(undefined, {
        leaveChat: {},
        type: ""
      })
    ).toEqual(action.initialState);
  });

  test("should handle error", (): void => {
    expect(
      reducer.leaveChat(
        { ...action.initialState, query },
        action.error({ error })
      )
    ).toEqual({ error, query });
  });

  test("should handle query", (): void => {
    expect(
      reducer.leaveChat(action.initialState, action.query({ query }))
    ).toEqual({ query });
  });

  test("should handle result", (): void => {
    expect(
      reducer.leaveChat(
        { ...action.initialState, query },
        action.result({ result })
      )
    ).toEqual({ query, result });
  });
});
