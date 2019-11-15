import { IStateSendMessageQuery } from "../../types/iStateSendMessageQuery";
import { IMessage } from "../../types/telegramBot/types/iMessage";

import * as action from "./sendMessage";

describe("sendMessage actions", (): void => {
  const error: Error = new Error("");
  const query: IStateSendMessageQuery = {
    chat_id: 0,
    text: ""
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
      sendMessage: { error },
      type: action.SEND_MESSAGE_ERROR
    });
  });

  test("should handle query", (): void => {
    expect(action.query({ query })).toEqual({
      sendMessage: { query },
      type: action.SEND_MESSAGE_QUERY
    });
  });

  test("should handle result", (): void => {
    expect(action.result({ result })).toEqual({
      sendMessage: { result },
      type: action.SEND_MESSAGE_RESULT
    });
  });
});
