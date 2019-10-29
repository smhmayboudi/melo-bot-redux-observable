import { IStatePinChatMessageQuery } from "../../types/iStatePinChatMessageQuery";

import * as action from "./pinChatMessage";

describe("pinChatMessage actions", (): void => {
  const error: Error = new Error("");
  const query: IStatePinChatMessageQuery = {
    chat_id: 0,
    message_id: 0
  };
  const result = true;

  test("should handle error", (): void => {
    expect(action.error({ error })).toEqual({
      pinChatMessage: { error },
      type: action.PIN_CHAT_MESSAGE_ERROR
    });
  });

  test("should handle query", (): void => {
    expect(action.query({ query })).toEqual({
      pinChatMessage: { query },
      type: action.PIN_CHAT_MESSAGE_QUERY
    });
  });

  test("should handle result", (): void => {
    expect(action.result({ result })).toEqual({
      pinChatMessage: { result },
      type: action.PIN_CHAT_MESSAGE_RESULT
    });
  });
});
