import { IStateSendVoiceQuery } from "../../types/iStateSendVoiceQuery";
import { IMessage } from "../../types/telegramBot/types/iMessage";
import * as action from "../actions/sendVoice";

import * as reducer from "./sendVoice";

describe("sendVoice reducer", (): void => {
  const error: Error = new Error("");
  const query: IStateSendVoiceQuery = {
    chat_id: 0,
    voice: ""
  };
  const result: IMessage = {
    chat: {
      id: 0,
      type: "private"
    },
    date: 0,
    message_id: 0
  };

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
