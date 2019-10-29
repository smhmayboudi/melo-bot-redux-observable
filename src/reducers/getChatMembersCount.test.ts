import { IStateGetChatMembersCountQuery } from "../../types/iStateGetChatMembersCountQuery";
import * as action from "../actions/getChatMembersCount";

import * as reducer from "./getChatMembersCount";

describe("getChatMembersCount reducer", (): void => {
  const error: Error = new Error("");
  const query: IStateGetChatMembersCountQuery = {
    chat_id: 0
  };
  const result = 0;

  test("should handle initialState", (): void => {
    expect(
      reducer.getChatMembersCount(undefined, {
        getChatMembersCount: {},
        type: ""
      })
    ).toEqual(action.initialState);
  });

  test("should handle error", (): void => {
    expect(
      reducer.getChatMembersCount(
        { ...action.initialState, query },
        action.error({ error })
      )
    ).toEqual({ error, query });
  });

  test("should handle query", (): void => {
    expect(
      reducer.getChatMembersCount(action.initialState, action.query({ query }))
    ).toEqual({ query });
  });

  test("should handle result", (): void => {
    expect(
      reducer.getChatMembersCount(
        { ...action.initialState, query },
        action.result({ result })
      )
    ).toEqual({ query, result });
  });
});
