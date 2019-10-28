import { IStateGetChatAdministratorsQuery } from "../../types/iStateGetChatAdministratorsQuery";
import { IChatMember } from "../../types/telegramBot/types/iChatMember";

import * as action from "./getChatAdministrators";

describe("getChatAdministrators actions", (): void => {
  const error: Error = new Error("");
  const query: IStateGetChatAdministratorsQuery = {
    chat_id: 0
  };
  const result: IChatMember[] = [
    {
      status: "",
      user: {
        first_name: "",
        id: 0,
        is_bot: false
      }
    }
  ];

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
