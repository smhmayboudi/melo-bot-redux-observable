import { IStateSendPhotoQuery } from "../../types/iStateSendPhotoQuery";

import * as action from "./sendPhoto";

describe("sendPhoto actions", (): void => {
  const error: Error = new Error("");
  const query: IStateSendPhotoQuery = {
    // TODO: fill it
  };
  // TODO: check it
  const result: boolean = true;

  test("should handle error", (): void => {
    expect(action.error({ error })).toEqual({
      sendPhoto: { error },
      type: action.SEND_PHOTO_ERROR
    });
  });

  test("should handle query", (): void => {
    expect(action.query({ query })).toEqual({
      sendPhoto: { query },
      type: action.SEND_PHOTO_QUERY
    });
  });

  test("should handle result", (): void => {
    expect(action.result({ result })).toEqual({
      sendPhoto: { result },
      type: action.SEND_PHOTO_RESULT
    });
  });
});
