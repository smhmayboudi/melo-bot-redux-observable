import { IStateSetChatTitleQuery } from "../../types/iStateSetChatTitleQuery";

import * as action from "./setChatTitle";

describe("setChatTitle actions", (): void => {
  const error: Error = new Error("");
  const query: IStateSetChatTitleQuery = {
    // TODO: fill it
  };
  // TODO: check it
  const result: boolean = true;

  test("should handle error", (): void => {
    expect(action.error({ error })).toEqual({
      setChatTitle: { error },
      type: action.SET_CHAT_TITLE_ERROR
    });
  });

  test("should handle query", (): void => {
    expect(action.query({ query })).toEqual({
      setChatTitle: { query },
      type: action.SET_CHAT_TITLE_QUERY
    });
  });

  test("should handle result", (): void => {
    expect(action.result({ result })).toEqual({
      setChatTitle: { result },
      type: action.SET_CHAT_TITLE_RESULT
    });
  });
});
