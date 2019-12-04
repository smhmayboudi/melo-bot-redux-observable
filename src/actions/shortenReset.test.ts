import { UpsertResult } from "mariadb";

import { IStateShortenResetQuery } from "../../types/iStateShortenResetQuery";

import * as action from "./shortenReset";

describe("shortenReset actions", (): void => {
  const error: Error = new Error("");
  const query: IStateShortenResetQuery = {
    id: 0
  };
  const result: UpsertResult = {
    affectedRows: 0,
    insertId: 0,
    warningStatus: 0
  };

  test("should handle error", (): void => {
    expect(action.error({ error })).toEqual({
      shortenReset: { error },
      type: action.SHORTEN_RESET_ERROR
    });
  });

  test("should handle query", (): void => {
    expect(action.query({ query })).toEqual({
      shortenReset: { query },
      type: action.SHORTEN_RESET_QUERY
    });
  });

  test("should handle result", (): void => {
    expect(action.result({ result })).toEqual({
      shortenReset: { result },
      type: action.SHORTEN_RESET_RESULT
    });
  });
});
