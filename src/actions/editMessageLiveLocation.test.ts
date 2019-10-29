import { IStateEditMessageLiveLocationQuery } from "../../types/iStateEditMessageLiveLocationQuery";

import * as action from "./editMessageLiveLocation";

describe("editMessageLiveLocation actions", (): void => {
  const error: Error = new Error("");
  const query: IStateEditMessageLiveLocationQuery = {
    latitude: 0,
    longitude: 0
  };
  const result = true;

  test("should handle error", (): void => {
    expect(action.error({ error })).toEqual({
      editMessageLiveLocation: { error },
      type: action.EDIT_MESSAGE_LIVE_LOCATION_ERROR
    });
  });

  test("should handle query", (): void => {
    expect(action.query({ query })).toEqual({
      editMessageLiveLocation: { query },
      type: action.EDIT_MESSAGE_LIVE_LOCATION_QUERY
    });
  });

  test("should handle result", (): void => {
    expect(action.result({ result })).toEqual({
      editMessageLiveLocation: { result },
      type: action.EDIT_MESSAGE_LIVE_LOCATION_RESULT
    });
  });
});
