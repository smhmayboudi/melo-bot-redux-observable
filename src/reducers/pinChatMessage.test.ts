import { IStatePinChatMessageQuery } from "../../types/iStatePinChatMessageQuery";
import * as action from "../actions/pinChatMessage";

import * as reducer from "./pinChatMessage";

describe("pinChatMessage reducer", (): void => {
  const error: Error = new Error("");
  const query: IStatePinChatMessageQuery = {
    chat_id: 0,
    message_id: 0
  };
  const result = true;

  test("should handle initialState", (): void => {
    expect(
      reducer.pinChatMessage(undefined, {
        pinChatMessage: {},
        type: ""
      })
    ).toEqual(action.initialState);
  });

  test("should handle error", (): void => {
    expect(
      reducer.pinChatMessage(
        { ...action.initialState, query },
        action.error({ error })
      )
    ).toEqual({ error, query });
  });

  test("should handle query", (): void => {
    expect(
      reducer.pinChatMessage(action.initialState, action.query({ query }))
    ).toEqual({ query });
  });

  test("should handle result", (): void => {
    expect(
      reducer.pinChatMessage(
        { ...action.initialState, query },
        action.result({ result })
      )
    ).toEqual({ query, result });
  });
});
