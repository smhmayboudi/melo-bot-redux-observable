import { IStateGetChatAdministratorsQuery } from "../../types/iStateGetChatAdministratorsQuery";
import { IChatMember } from "../../types/telegramBot/types/iChatMember";
import * as action from "../actions/getChatAdministrators";

import * as reducer from "./getChatAdministrators";

describe("getChatAdministrators reducer", (): void => {
  const error: Error = new Error("");
  const query: IStateGetChatAdministratorsQuery = {
    chat_id: 0
  };
  const result: IChatMember[] = [{
    status: "",
    user: {
      first_name: "",
      id: 0,
      is_bot: false
    }
  }];

  test("should handle initialState", (): void => {
    expect(
      reducer.getChatAdministrators(undefined, {
        getChatAdministrators: {},
        type: ""
      })
    ).toEqual(action.initialState);
  });

  test("should handle error", (): void => {
    expect(
      reducer.getChatAdministrators(
        { ...action.initialState, query },
        action.error({ error })
      )
    ).toEqual({ error, query });
  });

  test("should handle query", (): void => {
    expect(
      reducer.getChatAdministrators(
        action.initialState,
        action.query({ query })
      )
    ).toEqual({ query });
  });

  test("should handle result", (): void => {
    expect(
      reducer.getChatAdministrators(
        { ...action.initialState, query },
        action.result({ result })
      )
    ).toEqual({ query, result });
  });
});
