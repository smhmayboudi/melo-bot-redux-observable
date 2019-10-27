import { IStateGetUpdatesQuery } from "../../types/iStateGetUpdatesQuery";
import { IUpdate } from "../../types/telegramBot/updates/iUpdate";
import * as action from "../actions/getUpdates";

import * as reducer from "./getUpdates";

describe("getUpdates reducer", (): void => {
  const error: Error = new Error("");
  const query: IStateGetUpdatesQuery = {};
  const result: IUpdate[] = [{ update_id: 0 }];

  test("should handle initialState", (): void => {
    expect(
      reducer.getUpdates(undefined, {
        getUpdates: {},
        type: ""
      })
    ).toEqual(action.initialState);
  });

  test("should handle error", (): void => {
    expect(
      reducer.getUpdates(
        { ...action.initialState, query },
        action.error({ error })
      )
    ).toEqual({ error, query });
  });

  test("should handle query", (): void => {
    expect(
      reducer.getUpdates(action.initialState, action.query({ query }))
    ).toEqual({ query });
  });

  test("should handle result", (): void => {
    expect(
      reducer.getUpdates(
        { ...action.initialState, query },
        action.result({ result })
      )
    ).toEqual({ query, result });
  });
});
