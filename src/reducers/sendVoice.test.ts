import { IStateSendVoiceQuery } from "../../types/iStateSendVoiceQuery";
import * as action from "../actions/sendVoice";

import * as reducer from "./sendVoice";

describe("sendVoice reducer", (): void => {
  const error: Error = new Error("");
  const query: IStateSendVoiceQuery = {
    // TODO: fill it
  };
  // TODO: check it
  const result: boolean = true;

  test("should handle initialState", (): void => {
    expect(
      reducer.sendVoice(undefined, {
        sendVoice: {},
        type: ""
      })
    ).toEqual(action.initialState);
  });

  test("should handle error", (): void => {
    expect(
      reducer.sendVoice(
        { ...action.initialState, query },
        action.error({ error })
      )
    ).toEqual({ error, query });
  });

  test("should handle query", (): void => {
    expect(
      reducer.sendVoice(action.initialState, action.query({ query }))
    ).toEqual({ query });
  });

  test("should handle result", (): void => {
    expect(
      reducer.sendVoice(
        { ...action.initialState, query },
        action.result({ result })
      )
    ).toEqual({ query, result });
  });
});
