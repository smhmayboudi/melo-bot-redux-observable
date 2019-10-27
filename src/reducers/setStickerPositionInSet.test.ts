import { IStateSetStickerPositionInSetQuery } from "../../types/iStateSetStickerPositionInSetQuery";
import * as action from "../actions/setStickerPositionInSet";

import * as reducer from "./setStickerPositionInSet";

describe("setStickerPositionInSet reducer", (): void => {
  const error: Error = new Error("");
  const query: IStateSetStickerPositionInSetQuery = {
    position: 0,
    sticker: ""
  };
  const result: boolean = true;

  test("should handle initialState", (): void => {
    expect(
      reducer.setStickerPositionInSet(undefined, {
        setStickerPositionInSet: {},
        type: ""
      })
    ).toEqual(action.initialState);
  });

  test("should handle error", (): void => {
    expect(
      reducer.setStickerPositionInSet(
        { ...action.initialState, query },
        action.error({ error })
      )
    ).toEqual({ error, query });
  });

  test("should handle query", (): void => {
    expect(
      reducer.setStickerPositionInSet(
        action.initialState,
        action.query({ query })
      )
    ).toEqual({ query });
  });

  test("should handle result", (): void => {
    expect(
      reducer.setStickerPositionInSet(
        { ...action.initialState, query },
        action.result({ result })
      )
    ).toEqual({ query, result });
  });
});
