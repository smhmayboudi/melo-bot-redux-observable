import { IStateSetChatTitleQuery } from "../../types/iStateSetChatTitleQuery";

import * as action from "./setChatTitle";

describe("setChatTitle actions", (): void => {
  const error: Error = new Error("");
  const query: IStateSetChatTitleQuery = {
    chat_id: 0,
    title: ""
  };
  const result = true;

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
