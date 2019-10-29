import { IStateLeaveChatQuery } from "../../types/iStateLeaveChatQuery";

import * as action from "./leaveChat";

describe("leaveChat actions", (): void => {
  const error: Error = new Error("");
  const query: IStateLeaveChatQuery = {
    chat_id: 0
  };
  const result = true;

  test("should handle error", (): void => {
    expect(action.error({ error })).toEqual({
      leaveChat: { error },
      type: action.LEAVE_CHAT_ERROR
    });
  });

  test("should handle query", (): void => {
    expect(action.query({ query })).toEqual({
      leaveChat: { query },
      type: action.LEAVE_CHAT_QUERY
    });
  });

  test("should handle result", (): void => {
    expect(action.result({ result })).toEqual({
      leaveChat: { result },
      type: action.LEAVE_CHAT_RESULT
    });
  });
});
