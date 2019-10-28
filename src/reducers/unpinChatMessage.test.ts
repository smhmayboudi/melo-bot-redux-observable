import { IStateUnpinChatMessageQuery } from "../../types/iStateUnpinChatMessageQuery";
import * as action from "../actions/unpinChatMessage";

import * as reducer from "./unpinChatMessage";

describe("unpinChatMessage reducer", (): void => {
  const error: Error = new Error("");
  const query: IStateUnpinChatMessageQuery = {
    chat_id: 0
  };
  const result: boolean = true;

  test("should handle initialState", (): void => {
    expect(
      reducer.unpinChatMessage(undefined, {
        type: "",
        unpinChatMessage: {}
      })
    ).toEqual(action.initialState);
  });

  test("should handle error", (): void => {
    expect(
      reducer.unpinChatMessage(
        { ...action.initialState, query },
        action.error({ error })
      )
    ).toEqual({ error, query });
  });

  test("should handle query", (): void => {
    expect(
      reducer.unpinChatMessage(action.initialState, action.query({ query }))
    ).toEqual({ query });
  });

  test("should handle result", (): void => {
    expect(
      reducer.unpinChatMessage(
        { ...action.initialState, query },
        action.result({ result })
      )
    ).toEqual({ query, result });
  });
});
