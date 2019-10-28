import { IStateKickChatMemberQuery } from "../../types/iStateKickChatMemberQuery";

import * as action from "./kickChatMember";

describe("kickChatMember actions", (): void => {
  const error: Error = new Error("");
  const query: IStateKickChatMemberQuery = {
    chat_id: 0,
    user_id: 0
  };
  const result: boolean = true;

  test("should handle error", (): void => {
    expect(action.error({ error })).toEqual({
      kickChatMember: { error },
      type: action.KICK_CHAT_MEMBER_ERROR
    });
  });

  test("should handle query", (): void => {
    expect(action.query({ query })).toEqual({
      kickChatMember: { query },
      type: action.KICK_CHAT_MEMBER_QUERY
    });
  });

  test("should handle result", (): void => {
    expect(action.result({ result })).toEqual({
      kickChatMember: { result },
      type: action.KICK_CHAT_MEMBER_RESULT
    });
  });
});
