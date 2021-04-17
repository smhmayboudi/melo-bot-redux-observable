import { IStateStopPollQuery } from "../../types/iStateStopPollQuery";
import * as action from "../actions/stopPoll";

import * as reducer from "./stopPoll";

describe("stopPoll reducer", (): void => {
  const error: Error = new Error("");
  const query: IStateStopPollQuery = {
    chat_id: 0,
    message_id: 0
  };
  const result = true;

  test("should handle initialState", (): void => {
    expect(
      reducer.stopPoll(undefined, {
        stopPoll: {},
        type: ""
      })
    ).toEqual(action.initialState);
  });

  test("should handle error", (): void => {
    expect(
      reducer.stopPoll(
        { ...action.initialState, query },
        action.error({ error })
      )
    ).toEqual({ error, query });
  });

  test("should handle query", (): void => {
    expect(
      reducer.stopPoll(action.initialState, action.query({ query }))
    ).toEqual({ query });
  });

  test("should handle result", (): void => {
    expect(
      reducer.stopPoll(
        { ...action.initialState, query },
        action.result({ result })
      )
    ).toEqual({ query, result });
  });
});
