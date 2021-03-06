import { IStateEditMessageLiveLocationQuery } from "../../types/iStateEditMessageLiveLocationQuery";
import * as action from "../actions/editMessageLiveLocation";

import * as reducer from "./editMessageLiveLocation";

describe("editMessageLiveLocation reducer", (): void => {
  const error: Error = new Error("");
  const query: IStateEditMessageLiveLocationQuery = {
    latitude: 0,
    longitude: 0
  };
  const result = true;

  test("should handle initialState", (): void => {
    expect(
      reducer.editMessageLiveLocation(undefined, {
        editMessageLiveLocation: {},
        type: ""
      })
    ).toEqual(action.initialState);
  });

  test("should handle error", (): void => {
    expect(
      reducer.editMessageLiveLocation(
        { ...action.initialState, query },
        action.error({ error })
      )
    ).toEqual({ error, query });
  });

  test("should handle query", (): void => {
    expect(
      reducer.editMessageLiveLocation(
        action.initialState,
        action.query({ query })
      )
    ).toEqual({ query });
  });

  test("should handle result", (): void => {
    expect(
      reducer.editMessageLiveLocation(
        { ...action.initialState, query },
        action.result({ result })
      )
    ).toEqual({ query, result });
  });
});
