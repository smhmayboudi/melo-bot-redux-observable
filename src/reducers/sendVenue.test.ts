import { IStateSendVenueQuery } from "../../types/iStateSendVenueQuery";
import * as action from "../actions/sendVenue";

import * as reducer from "./sendVenue";

describe("sendVenue reducer", (): void => {
  const error: Error = new Error("");
  const query: IStateSendVenueQuery = {
    // TODO: fill it
  };
  // TODO: check it
  const result: boolean = true;

  test("should handle initialState", (): void => {
    expect(
      reducer.sendVenue(undefined, {
        sendVenue: {},
        type: ""
      })
    ).toEqual(action.initialState);
  });

  test("should handle error", (): void => {
    expect(
      reducer.sendVenue(
        { ...action.initialState, query },
        action.error({ error })
      )
    ).toEqual({ error, query });
  });

  test("should handle query", (): void => {
    expect(
      reducer.sendVenue(action.initialState, action.query({ query }))
    ).toEqual({ query });
  });

  test("should handle result", (): void => {
    expect(
      reducer.sendVenue(
        { ...action.initialState, query },
        action.result({ result })
      )
    ).toEqual({ query, result });
  });
});
