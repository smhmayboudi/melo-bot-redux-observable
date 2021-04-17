import { IStateSetChatDescriptionQuery } from "../../types/iStateSetChatDescriptionQuery";

import * as action from "./setChatDescription";

describe("setChatDescription actions", (): void => {
  const error: Error = new Error("");
  const query: IStateSetChatDescriptionQuery = {
    chat_id: 0
  };
  const result = true;

  test("should handle error", (): void => {
    expect(action.error({ error })).toEqual({
      setChatDescription: { error },
      type: action.SET_CHAT_DESCRIPTION_ERROR
    });
  });

  test("should handle query", (): void => {
    expect(action.query({ query })).toEqual({
      setChatDescription: { query },
      type: action.SET_CHAT_DESCRIPTION_QUERY
    });
  });

  test("should handle result", (): void => {
    expect(action.result({ result })).toEqual({
      setChatDescription: { result },
      type: action.SET_CHAT_DESCRIPTION_RESULT
    });
  });
});
