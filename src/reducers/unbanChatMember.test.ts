import { IStateUnbanChatMemberQuery } from "../../types/iStateUnbanChatMemberQuery";
import * as action from "../actions/unbanChatMember";

import * as reducer from "./unbanChatMember";

describe("unbanChatMember reducer", (): void => {
  const error: Error = new Error("");
  const query: IStateUnbanChatMemberQuery = {
    // TODO: fill it
  };
  // TODO: check it
  const result: boolean = true;

  test("should handle initialState", (): void => {
    expect(
      reducer.unbanChatMember(undefined, {
        type: "",
        unbanChatMember: {}
      })
    ).toEqual(action.initialState);
  });

  test("should handle error", (): void => {
    expect(
      reducer.unbanChatMember(
        { ...action.initialState, query },
        action.error({ error })
      )
    ).toEqual({ error, query });
  });

  test("should handle query", (): void => {
    expect(
      reducer.unbanChatMember(action.initialState, action.query({ query }))
    ).toEqual({ query });
  });

  test("should handle result", (): void => {
    expect(
      reducer.unbanChatMember(
        { ...action.initialState, query },
        action.result({ result })
      )
    ).toEqual({ query, result });
  });
});
