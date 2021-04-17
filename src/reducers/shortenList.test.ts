import { IStateShortenListQuery } from "../../types/iStateShortenListQuery";
import { IStateShortenListResult } from "../../types/iStateShortenListResult";
import * as action from "../actions/shortenList";

import * as reducer from "./shortenList";

describe("shortenList reducer", (): void => {
  const error: Error = new Error("");
  const query: IStateShortenListQuery = {};
  const result: IStateShortenListResult[] = [
    {
      alphabet: "",
      count: 0,
      date: null,
      id: 0,
      longLink: "",
      longBase64: null,
      shortLink: ""
    }
  ];

  test("should handle initialState", (): void => {
    expect(
      reducer.shortenList(undefined, {
        shortenList: {},
        type: ""
      })
    ).toEqual(action.initialState);
  });

  test("should handle error", (): void => {
    expect(
      reducer.shortenList(
        { ...action.initialState, query },
        action.error({ error })
      )
    ).toEqual({ error, query });
  });

  test("should handle query", (): void => {
    expect(
      reducer.shortenList(action.initialState, action.query({ query }))
    ).toEqual({ query });
  });

  test("should handle result", (): void => {
    expect(
      reducer.shortenList(
        { ...action.initialState, query },
        action.result({ result })
      )
    ).toEqual({ query, result });
  });
});
