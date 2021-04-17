import { IStateSendChatActionQuery } from "../../types/iStateSendChatActionQuery";
import * as action from "../actions/sendChatAction";

import * as reducer from "./sendChatAction";

describe("sendChatAction reducer", (): void => {
  const error: Error = new Error("");
  const query: IStateSendChatActionQuery = {
    action: "",
    chat_id: 0
  };
  const result = true;

  test("should handle initialState", (): void => {
    expect(
      reducer.sendChatAction(undefined, {
        sendChatAction: {},
        type: ""
      })
    ).toEqual(action.initialState);
  });

  test("should handle error", (): void => {
    expect(
      reducer.sendChatAction(
        { ...action.initialState, query },
        action.error({ error })
      )
    ).toEqual({ error, query });
  });

  test("should handle query", (): void => {
    expect(
      reducer.sendChatAction(action.initialState, action.query({ query }))
    ).toEqual({ query });
  });

  test("should handle result", (): void => {
    expect(
      reducer.sendChatAction(
        { ...action.initialState, query },
        action.result({ result })
      )
    ).toEqual({ query, result });
  });
});
