import { IStateGetChatMembersCountQuery } from "../../types/iStateGetChatMembersCountQuery";

import * as action from "./getChatMembersCount";

describe("getChatMembersCount actions", (): void => {
  const error: Error = new Error("");
  const query: IStateGetChatMembersCountQuery = {
    chat_id: 0
  };
  const result = 0;

  test("should handle error", (): void => {
    expect(action.error({ error })).toEqual({
      getChatMembersCount: { error },
      type: action.GET_CHAT_MEMBERS_COUNT_ERROR
    });
  });

  test("should handle query", (): void => {
    expect(action.query({ query })).toEqual({
      getChatMembersCount: { query },
      type: action.GET_CHAT_MEMBERS_COUNT_QUERY
    });
  });

  test("should handle result", (): void => {
    expect(action.result({ result })).toEqual({
      getChatMembersCount: { result },
      type: action.GET_CHAT_MEMBERS_COUNT_RESULT
    });
  });
});
