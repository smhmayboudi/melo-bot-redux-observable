import { IStateGetChatAdministratorsQuery } from "../../types/iStateGetChatAdministratorsQuery";

import * as action from "./getChatAdministrators";

describe("getChatAdministrators actions", (): void => {
  const error: Error = new Error("");
  const query: IStateGetChatAdministratorsQuery = {
    // TODO: fill it
  };
  // TODO: check it
  const result: boolean = true;

  test("should handle error", (): void => {
    expect(action.error({ error })).toEqual({
      getChatAdministrators: { error },
      type: action.GET_CHAT_ADMINISTRATORS_ERROR
    });
  });

  test("should handle query", (): void => {
    expect(action.query({ query })).toEqual({
      getChatAdministrators: { query },
      type: action.GET_CHAT_ADMINISTRATORS_QUERY
    });
  });

  test("should handle result", (): void => {
    expect(action.result({ result })).toEqual({
      getChatAdministrators: { result },
      type: action.GET_CHAT_ADMINISTRATORS_RESULT
    });
  });
});
