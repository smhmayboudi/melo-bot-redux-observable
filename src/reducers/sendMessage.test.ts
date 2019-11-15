import { IStateSendMessageQuery } from "../../types/iStateSendMessageQuery";
import { IMessage } from "../../types/telegramBot/types/iMessage";
import * as action from "../actions/sendMessage";

import * as reducer from "./sendMessage";

describe("sendMessage reducer", (): void => {
  const error: Error = new Error("");
  const query: IStateSendMessageQuery = {
    chat_id: 0,
    text: ""
  };
  const result: IMessage = {
    chat: {
      id: 0,
      type: ""
    },
    date: 0,
    message_id: 0
  };

  test("should handle initialState", (): void => {
    expect(
      reducer.sendMessage(undefined, { sendMessage: {}, type: "" })
    ).toEqual(action.initialState);
  });

  test("should handle error", (): void => {
    expect(
      reducer.sendMessage(
        { ...action.initialState, query },
        action.error({ error })
      )
    ).toEqual({ error, query });
  });

  test("should handle query", (): void => {
    expect(
      reducer.sendMessage(action.initialState, action.query({ query }))
    ).toEqual({ query });
  });

  test("should handle result", (): void => {
    expect(
      reducer.sendMessage(
        { ...action.initialState, query },
        action.result({ result })
      )
    ).toEqual({ query, result });
  });
});
