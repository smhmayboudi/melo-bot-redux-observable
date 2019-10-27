import { IStateSendPollQuery } from "../../types/iStateSendPollQuery";

import * as action from "./sendPoll";

describe("sendPoll actions", (): void => {
  const error: Error = new Error("");
  const query: IStateSendPollQuery = {
    // TODO: fill it
  };
  // TODO: check it
  const result: boolean = true;

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
