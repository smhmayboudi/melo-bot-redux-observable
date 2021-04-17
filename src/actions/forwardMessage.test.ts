import { IStateForwardMessageQuery } from "../../types/iStateForwardMessageQuery";
import { IMessage } from "../../types/telegramBot/types/iMessage";

import * as action from "./forwardMessage";

describe("forwardMessage actions", (): void => {
  const error: Error = new Error("");
  const query: IStateForwardMessageQuery = {
    chat_id: 0,
    from_chat_id: 0,
    message_id: 0
  };
  const result: IMessage = {
    chat: {
      id: 0,
      type: ""
    },
    date: 0,
    message_id: 0
  };

  test("should handle error", (): void => {
    expect(action.error({ error })).toEqual({
      forwardMessage: { error },
      type: action.FORWARD_MESSAGE_ERROR
    });
  });

  test("should handle query", (): void => {
    expect(action.query({ query })).toEqual({
      forwardMessage: { query },
      type: action.FORWARD_MESSAGE_QUERY
    });
  });

  test("should handle result", (): void => {
    expect(action.result({ result })).toEqual({
      forwardMessage: { result },
      type: action.FORWARD_MESSAGE_RESULT
    });
  });
});
