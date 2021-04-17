import { IStateShortenListQuery } from "../../types/iStateShortenListQuery";
import { IStateShortenListResult } from "../../types/iStateShortenListResult";

import * as action from "./shortenList";

describe("shortenList actions", (): void => {
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

  test("should handle error", (): void => {
    expect(action.error({ error })).toEqual({
      shortenList: { error },
      type: action.SHORTEN_LIST_ERROR
    });
  });

  test("should handle query", (): void => {
    expect(action.query({ query })).toEqual({
      shortenList: { query },
      type: action.SHORTEN_LIST_QUERY
    });
  });

  test("should handle result", (): void => {
    expect(action.result({ result })).toEqual({
      shortenList: { result },
      type: action.SHORTEN_LIST_RESULT
    });
  });
});
