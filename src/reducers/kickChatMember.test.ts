import { IStateKickChatMemberQuery } from "../../types/iStateKickChatMemberQuery";
import * as action from "../actions/kickChatMember";

import * as reducer from "./kickChatMember";

describe("kickChatMember reducer", (): void => {
  const error: Error = new Error("");
  const query: IStateKickChatMemberQuery = {
    chat_id: 0,
    user_id: 0
  };
  const result = true;

  test("should handle initialState", (): void => {
    expect(
      reducer.kickChatMember(undefined, {
        kickChatMember: {},
        type: ""
      })
    ).toEqual(action.initialState);
  });

  test("should handle error", (): void => {
    expect(
      reducer.kickChatMember(
        { ...action.initialState, query },
        action.error({ error })
      )
    ).toEqual({ error, query });
  });

  test("should handle query", (): void => {
    expect(
      reducer.kickChatMember(action.initialState, action.query({ query }))
    ).toEqual({ query });
  });

  test("should handle result", (): void => {
    expect(
      reducer.kickChatMember(
        { ...action.initialState, query },
        action.result({ result })
      )
    ).toEqual({ query, result });
  });
});
