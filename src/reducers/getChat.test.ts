import { IStateGetChatQuery } from "../../types/iStateGetChatQuery";
import { IChat } from "../../types/telegramBot/types/iChat";
import * as action from "../actions/getChat";

import * as reducer from "./getChat";

describe("getChat reducer", (): void => {
  const error: Error = new Error("");
  const query: IStateGetChatQuery = {
    chat_id: 0
  };
  const result: IChat = {
    id: 0,
    type: ""
  };

  test("should handle initialState", (): void => {
    expect(
      reducer.getChat(undefined, {
        getChat: {},
        type: ""
      })
    ).toEqual(action.initialState);
  });

  test("should handle error", (): void => {
    expect(
      reducer.getChat(
        { ...action.initialState, query },
        action.error({ error })
      )
    ).toEqual({ error, query });
  });

  test("should handle query", (): void => {
    expect(
      reducer.getChat(action.initialState, action.query({ query }))
    ).toEqual({ query });
  });

  test("should handle result", (): void => {
    expect(
      reducer.getChat(
        { ...action.initialState, query },
        action.result({ result })
      )
    ).toEqual({ query, result });
  });
});
