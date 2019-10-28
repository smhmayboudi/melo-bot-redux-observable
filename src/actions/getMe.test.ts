import { IStateGetMeQuery } from "../../types/iStateGetMeQuery";
import { IUser } from "../../types/telegramBot/types/iUser";

import * as action from "./getMe";

describe("getMe actions", (): void => {
  const error: Error = new Error("");
  const query: IStateGetMeQuery = {
    chat_id: 0,
    text: ""
  };
  const result: IUser = {
    first_name: "",
    id: 0,
    is_bot: false
  };

  test("should handle error", (): void => {
    expect(action.error({ error })).toEqual({
      getMe: { error },
      type: action.GET_ME_ERROR
    });
  });

  test("should handle query", (): void => {
    expect(action.query({ query })).toEqual({
      getMe: { query },
      type: action.GET_ME_QUERY
    });
  });

  test("should handle result", (): void => {
    expect(action.result({ result })).toEqual({
      getMe: { result },
      type: action.GET_ME_RESULT
    });
  });
});
