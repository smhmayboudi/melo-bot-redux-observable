import { IStatePromoteChatMemberQuery } from "../../types/iStatePromoteChatMemberQuery";
import * as action from "../actions/promoteChatMember";

import * as reducer from "./promoteChatMember";

describe("promoteChatMember reducer", (): void => {
  const error: Error = new Error("");
  const query: IStatePromoteChatMemberQuery = {
    chat_id: 0,
    user_id: 0
  };
  const result = true;

  test("should handle initialState", (): void => {
    expect(
      reducer.promoteChatMember(undefined, {
        promoteChatMember: {},
        type: ""
      })
    ).toEqual(action.initialState);
  });

  test("should handle error", (): void => {
    expect(
      reducer.promoteChatMember(
        { ...action.initialState, query },
        action.error({ error })
      )
    ).toEqual({ error, query });
  });

  test("should handle query", (): void => {
    expect(
      reducer.promoteChatMember(action.initialState, action.query({ query }))
    ).toEqual({ query });
  });

  test("should handle result", (): void => {
    expect(
      reducer.promoteChatMember(
        { ...action.initialState, query },
        action.result({ result })
      )
    ).toEqual({ query, result });
  });
});
