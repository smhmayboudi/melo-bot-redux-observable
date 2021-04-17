import { IStateRestrictChatMemberQuery } from "../../types/iStateRestrictChatMemberQuery";
import * as action from "../actions/restrictChatMember";

import * as reducer from "./restrictChatMember";

describe("restrictChatMember reducer", (): void => {
  const error: Error = new Error("");
  const query: IStateRestrictChatMemberQuery = {
    chat_id: 0,
    permissions: {},
    user_id: 0
  };
  const result = true;

  test("should handle initialState", (): void => {
    expect(
      reducer.restrictChatMember(undefined, {
        restrictChatMember: {},
        type: ""
      })
    ).toEqual(action.initialState);
  });

  test("should handle error", (): void => {
    expect(
      reducer.restrictChatMember(
        { ...action.initialState, query },
        action.error({ error })
      )
    ).toEqual({ error, query });
  });

  test("should handle query", (): void => {
    expect(
      reducer.restrictChatMember(action.initialState, action.query({ query }))
    ).toEqual({ query });
  });

  test("should handle result", (): void => {
    expect(
      reducer.restrictChatMember(
        { ...action.initialState, query },
        action.result({ result })
      )
    ).toEqual({ query, result });
  });
});
