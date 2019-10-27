import { IStateSendPollQuery } from "../../types/iStateSendPollQuery";
import * as action from "../actions/sendPoll";

import * as reducer from "./sendPoll";

describe("sendPoll reducer", (): void => {
  const error: Error = new Error("");
  const query: IStateSendPollQuery = {
    // TODO: fill it
  };
  // TODO: check it
  const result: boolean = true;

  test("should handle initialState", (): void => {
    expect(
      reducer.sendPoll(undefined, {
        sendPoll: {},
        type: ""
      })
    ).toEqual(action.initialState);
  });

  test("should handle error", (): void => {
    expect(
      reducer.sendPoll(
        { ...action.initialState, query },
        action.error({ error })
      )
    ).toEqual({ error, query });
  });

  test("should handle query", (): void => {
    expect(
      reducer.sendPoll(action.initialState, action.query({ query }))
    ).toEqual({ query });
  });

  test("should handle result", (): void => {
    expect(
      reducer.sendPoll(
        { ...action.initialState, query },
        action.result({ result })
      )
    ).toEqual({ query, result });
  });
});
