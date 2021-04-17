import { IStateDeleteMessageQuery } from "../../types/iStateDeleteMessageQuery";

import * as action from "./deleteMessage";

describe("deleteMessage actions", (): void => {
  const error: Error = new Error("");
  const query: IStateDeleteMessageQuery = {
    chat_id: 0,
    message_id: 0
  };
  const result = true;

  test("should handle error", (): void => {
    expect(action.error({ error })).toEqual({
      deleteMessage: { error },
      type: action.DELETE_MESSAGE_ERROR
    });
  });

  test("should handle query", (): void => {
    expect(action.query({ query })).toEqual({
      deleteMessage: { query },
      type: action.DELETE_MESSAGE_QUERY
    });
  });

  test("should handle result", (): void => {
    expect(action.result({ result })).toEqual({
      deleteMessage: { result },
      type: action.DELETE_MESSAGE_RESULT
    });
  });
});
