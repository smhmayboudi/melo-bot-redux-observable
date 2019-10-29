import { IStateSetStickerPositionInSetQuery } from "../../types/iStateSetStickerPositionInSetQuery";

import * as action from "./setStickerPositionInSet";

describe("setStickerPositionInSet actions", (): void => {
  const error: Error = new Error("");
  const query: IStateSetStickerPositionInSetQuery = {
    position: 0,
    sticker: ""
  };
  const result = true;

  test("should handle error", (): void => {
    expect(action.error({ error })).toEqual({
      setStickerPositionInSet: { error },
      type: action.SET_STICKER_POSITION_IN_SET_ERROR
    });
  });

  test("should handle query", (): void => {
    expect(action.query({ query })).toEqual({
      setStickerPositionInSet: { query },
      type: action.SET_STICKER_POSITION_IN_SET_QUERY
    });
  });

  test("should handle result", (): void => {
    expect(action.result({ result })).toEqual({
      setStickerPositionInSet: { result },
      type: action.SET_STICKER_POSITION_IN_SET_RESULT
    });
  });
});
