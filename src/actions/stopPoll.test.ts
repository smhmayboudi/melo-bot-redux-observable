import { IStateStopPollQuery } from "../../types/iStateStopPollQuery";

import * as action from "./stopPoll";

describe("stopPoll actions", (): void => {
  const error: Error = new Error("");
  const query: IStateStopPollQuery = {
    chat_id: 0,
    message_id: 0
  };
  const result: boolean = true;

  test("should handle error", (): void => {
    expect(action.error({ error })).toEqual({
      stopPoll: { error },
      type: action.STOP_POLL_ERROR
    });
  });

  test("should handle query", (): void => {
    expect(action.query({ query })).toEqual({
      stopPoll: { query },
      type: action.STOP_POLL_QUERY
    });
  });

  test("should handle result", (): void => {
    expect(action.result({ result })).toEqual({
      stopPoll: { result },
      type: action.STOP_POLL_RESULT
    });
  });
});
