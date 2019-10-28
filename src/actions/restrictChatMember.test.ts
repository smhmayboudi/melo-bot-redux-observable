import { IStateRestrictChatMemberQuery } from "../../types/iStateRestrictChatMemberQuery";

import * as action from "./restrictChatMember";

describe("restrictChatMember actions", (): void => {
  const error: Error = new Error("");
  const query: IStateRestrictChatMemberQuery = {
    chat_id: 0,
    permissions: {},
    user_id: 0
  };
  const result: boolean = true;

  test("should handle error", (): void => {
    expect(action.error({ error })).toEqual({
      restrictChatMember: { error },
      type: action.RESTRICT_CHAT_MEMBER_ERROR
    });
  });

  test("should handle query", (): void => {
    expect(action.query({ query })).toEqual({
      restrictChatMember: { query },
      type: action.RESTRICT_CHAT_MEMBER_QUERY
    });
  });

  test("should handle result", (): void => {
    expect(action.result({ result })).toEqual({
      restrictChatMember: { result },
      type: action.RESTRICT_CHAT_MEMBER_RESULT
    });
  });
});
