import { IStateGetChatAdministratorsQuery } from "../../types/iStateGetChatAdministratorsQuery";
import * as action from "../actions/getChatAdministrators";

import * as reducer from "./getChatAdministrators";

describe("getChatAdministrators reducer", (): void => {
  const error: Error = new Error("");
  const query: IStateGetChatAdministratorsQuery = {
    // TODO: fill it
  };
  // TODO: check it
  const result: boolean = true;

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
