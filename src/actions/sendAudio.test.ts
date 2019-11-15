import { IStateSendAudioQuery } from "../../types/iStateSendAudioQuery";
import { IMessage } from "../../types/telegramBot/types/iMessage";

import * as action from "./sendAudio";

describe("sendAudio actions", (): void => {
  const error: Error = new Error("");
  const query: IStateSendAudioQuery = {
    audio: "",
    chat_id: 0
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
      sendAudio: { error },
      type: action.SEND_AUDIO_ERROR
    });
  });

  test("should handle query", (): void => {
    expect(action.query({ query })).toEqual({
      sendAudio: { query },
      type: action.SEND_AUDIO_QUERY
    });
  });

  test("should handle result", (): void => {
    expect(action.result({ result })).toEqual({
      sendAudio: { result },
      type: action.SEND_AUDIO_RESULT
    });
  });
});
