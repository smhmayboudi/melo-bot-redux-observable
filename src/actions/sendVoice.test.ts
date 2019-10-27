import { IStateSendVoiceQuery } from "../../types/iStateSendVoiceQuery";

import * as action from "./sendVoice";

describe("sendVoice actions", (): void => {
  const error: Error = new Error("");
  const query: IStateSendVoiceQuery = {
    // TODO: fill it
  };
  // TODO: check it
  const result: boolean = true;

  test("should handle error", (): void => {
    expect(action.error({ error })).toEqual({
      sendVoice: { error },
      type: action.SEND_VOICE_ERROR
    });
  });

  test("should handle query", (): void => {
    expect(action.query({ query })).toEqual({
      sendVoice: { query },
      type: action.SEND_VOICE_QUERY
    });
  });

  test("should handle result", (): void => {
    expect(action.result({ result })).toEqual({
      sendVoice: { result },
      type: action.SEND_VOICE_RESULT
    });
  });
});
