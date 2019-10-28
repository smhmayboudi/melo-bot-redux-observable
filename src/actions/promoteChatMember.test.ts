import { IStatePromoteChatMemberQuery } from "../../types/iStatePromoteChatMemberQuery";

import * as action from "./promoteChatMember";

describe("promoteChatMember actions", (): void => {
  const error: Error = new Error("");
  const query: IStatePromoteChatMemberQuery = {
    // TODO: fill it
  };
  // TODO: check it
  const result: boolean = true;

  test("should handle error", (): void => {
    expect(action.error({ error })).toEqual({
      promoteChatMember: { error },
      type: action.PROMOTE_CHAT_MEMBER_ERROR
    });
  });

  test("should handle query", (): void => {
    expect(action.query({ query })).toEqual({
      promoteChatMember: { query },
      type: action.PROMOTE_CHAT_MEMBER_QUERY
    });
  });

  test("should handle result", (): void => {
    expect(action.result({ result })).toEqual({
      promoteChatMember: { result },
      type: action.PROMOTE_CHAT_MEMBER_RESULT
    });
  });
});