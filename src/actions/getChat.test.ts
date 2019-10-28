import { IStateGetChatQuery } from "../../types/iStateGetChatQuery";
import { IChat } from "../../types/telegramBot/types/iChat";

import * as action from "./getChat";

describe("getChat actions", (): void => {
  const error: Error = new Error("");
  const query: IStateGetChatQuery = {
    chat_id: 0
  };
  const result: IChat = {
    id: 0,
    type: ""
  };

  test("should handle error", (): void => {
    expect(action.error({ error })).toEqual({
      getChat: { error },
      type: action.GET_CHAT_ERROR
    });
  });

  test("should handle query", (): void => {
    expect(action.query({ query })).toEqual({
      getChat: { query },
      type: action.GET_CHAT_QUERY
    });
  });

  test("should handle result", (): void => {
    expect(action.result({ result })).toEqual({
      getChat: { result },
      type: action.GET_CHAT_RESULT
    });
  });
});
