import { IStateUnbanChatMemberQuery } from "../../types/iStateUnbanChatMemberQuery";

import * as action from "./unbanChatMember";

describe("unbanChatMember actions", (): void => {
  const error: Error = new Error("");
  const query: IStateUnbanChatMemberQuery = {
    // TODO: fill it
  };
  // TODO: check it
  const result: boolean = true;

  test("should handle error", (): void => {
    expect(action.error({ error })).toEqual({
      type: action.UNBAN_CHAT_MEMBER_ERROR,
      unbanChatMember: { error }
    });
  });

  test("should handle query", (): void => {
    expect(action.query({ query })).toEqual({
      type: action.UNBAN_CHAT_MEMBER_QUERY,
      unbanChatMember: { query }
    });
  });

  test("should handle result", (): void => {
    expect(action.result({ result })).toEqual({
      type: action.UNBAN_CHAT_MEMBER_RESULT,
      unbanChatMember: { result }
    });
  });
});
