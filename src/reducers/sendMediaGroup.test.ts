import { IStateSendMediaGroupQuery } from "../../types/iStateSendMediaGroupQuery";
import * as action from "../actions/sendMediaGroup";

import * as reducer from "./sendMediaGroup";
import { IMessage } from "../../types/telegramBot/types/iMessage";

describe("sendMediaGroup reducer", (): void => {
  const error: Error = new Error("");
  const query: IStateSendMediaGroupQuery = {
    chat_id: 0,
    media: [{
      media: "",
      type: ""
    }]
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
      reducer.sendMediaGroup(undefined, {
        sendMediaGroup: {},
        type: ""
      })
    ).toEqual(action.initialState);
  });

  test("should handle error", (): void => {
    expect(
      reducer.sendMediaGroup(
        { ...action.initialState, query },
        action.error({ error })
      )
    ).toEqual({ error, query });
  });

  test("should handle query", (): void => {
    expect(
      reducer.sendMediaGroup(action.initialState, action.query({ query }))
    ).toEqual({ query });
  });

  test("should handle result", (): void => {
    expect(
      reducer.sendMediaGroup(
        { ...action.initialState, query },
        action.result({ result })
      )
    ).toEqual({ query, result });
  });
});
