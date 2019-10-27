import { IStateGetUpdatesQuery } from "../../types/iStateGetUpdatesQuery";
import { IUpdate } from "../../types/telegramBot/updates/iUpdate";

import * as action from "./getUpdates";

describe("getUpdates actions", (): void => {
  const error: Error = new Error("");
  const query: IStateGetUpdatesQuery = {};
  const result: IUpdate[] = [{ update_id: 0 }];

  test("should handle error", (): void => {
    expect(action.error({ error })).toEqual({
      getUpdates: { error },
      type: action.GET_UPDATES_ERROR
    });
  });

  test("should handle query", (): void => {
    expect(action.query({ query })).toEqual({
      getUpdates: { query },
      type: action.GET_UPDATES_QUERY
    });
  });

  test("should handle result", (): void => {
    expect(action.result({ result })).toEqual({
      getUpdates: { result },
      type: action.GET_UPDATES_RESULT
    });
  });
});
