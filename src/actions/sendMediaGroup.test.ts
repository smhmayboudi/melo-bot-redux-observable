import { IStateSendMediaGroupQuery } from "../../types/iStateSendMediaGroupQuery";

import * as action from "./sendMediaGroup";

describe("sendMediaGroup actions", (): void => {
  const error: Error = new Error("");
  const query: IStateSendMediaGroupQuery = {
    // TODO: fill it
  };
  // TODO: check it
  const result: boolean = true;

  test("should handle error", (): void => {
    expect(action.error({ error })).toEqual({
      sendMediaGroup: { error },
      type: action.SEND_MEDIA_GROUP_ERROR
    });
  });

  test("should handle query", (): void => {
    expect(action.query({ query })).toEqual({
      sendMediaGroup: { query },
      type: action.SEND_MEDIA_GROUP_QUERY
    });
  });

  test("should handle result", (): void => {
    expect(action.result({ result })).toEqual({
      sendMediaGroup: { result },
      type: action.SEND_MEDIA_GROUP_RESULT
    });
  });
});
