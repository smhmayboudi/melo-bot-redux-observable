import { IStateSendVoiceQuery } from "../../types/iStateSendVoiceQuery";
import { IMessage } from "../../types/telegramBot/types/iMessage";

import * as action from "./sendVoice";

describe("sendVoice actions", (): void => {
  const error: Error = new Error("");
  const query: IStateSendVoiceQuery = {
    chat_id: 0,
    voice: ""
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
