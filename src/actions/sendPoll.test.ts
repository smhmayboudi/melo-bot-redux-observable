import { IStateSendPollQuery } from "../../types/iStateSendPollQuery";
import { IMessage } from "../../types/telegramBot/types/iMessage";

import * as action from "./sendPoll";

describe("sendPoll actions", (): void => {
  const error: Error = new Error("");
  const query: IStateSendPollQuery = {
    chat_id: 0,
    options: [""],
    question: ""
  };
  const result: IMessage = {
    chat: {
      id: 0,
      type: "private"
    },
    date: 0,
    message_id: 0
  };

  test("should handle error", (): void => {
    expect(action.error({ error })).toEqual({
      sendPoll: { error },
      type: action.SEND_POLL_ERROR
    });
  });

  test("should handle query", (): void => {
    expect(action.query({ query })).toEqual({
      sendPoll: { query },
      type: action.SEND_POLL_QUERY
    });
  });

  test("should handle result", (): void => {
    expect(action.result({ result })).toEqual({
      sendPoll: { result },
      type: action.SEND_POLL_RESULT
    });
  });
});
