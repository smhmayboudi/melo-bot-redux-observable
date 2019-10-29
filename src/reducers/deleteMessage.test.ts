import { IStateDeleteMessageQuery } from "../../types/iStateDeleteMessageQuery";
import * as action from "../actions/deleteMessage";

import * as reducer from "./deleteMessage";

describe("deleteMessage reducer", (): void => {
  const error: Error = new Error("");
  const query: IStateDeleteMessageQuery = {
    chat_id: 0,
    message_id: 0
  };
  const result = true;

  test("should handle initialState", (): void => {
    expect(
      reducer.deleteMessage(undefined, {
        deleteMessage: {},
        type: ""
      })
    ).toEqual(action.initialState);
  });

  test("should handle error", (): void => {
    expect(
      reducer.deleteMessage(
        { ...action.initialState, query },
        action.error({ error })
      )
    ).toEqual({ error, query });
  });

  test("should handle query", (): void => {
    expect(
      reducer.deleteMessage(action.initialState, action.query({ query }))
    ).toEqual({ query });
  });

  test("should handle result", (): void => {
    expect(
      reducer.deleteMessage(
        { ...action.initialState, query },
        action.result({ result })
      )
    ).toEqual({ query, result });
  });
});
