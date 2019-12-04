import { UpsertResult } from "mariadb";

import { IStateShortenResetQuery } from "../../types/iStateShortenResetQuery";
import * as action from "../actions/shortenReset";

import * as reducer from "./shortenReset";

describe("shortenReset reducer", (): void => {
  const error: Error = new Error("");
  const query: IStateShortenResetQuery = {
    id: 0
  };
  const result: UpsertResult = {
    affectedRows: 0,
    insertId: 0,
    warningStatus: 0
  };

  test("should handle initialState", (): void => {
    expect(
      reducer.shortenReset(undefined, {
        shortenReset: {},
        type: ""
      })
    ).toEqual(action.initialState);
  });

  test("should handle error", (): void => {
    expect(
      reducer.shortenReset(
        { ...action.initialState, query },
        action.error({ error })
      )
    ).toEqual({ error, query });
  });

  test("should handle query", (): void => {
    expect(
      reducer.shortenReset(action.initialState, action.query({ query }))
    ).toEqual({ query });
  });

  test("should handle result", (): void => {
    expect(
      reducer.shortenReset(
        { ...action.initialState, query },
        action.result({ result })
      )
    ).toEqual({ query, result });
  });
});
