import { IStateDeleteStickerFromSetQuery } from "../../types/iStateDeleteStickerFromSetQuery";
import * as action from "../actions/deleteStickerFromSet";

import * as reducer from "./deleteStickerFromSet";

describe("deleteStickerFromSet reducer", (): void => {
  const error: Error = new Error("");
  const query: IStateDeleteStickerFromSetQuery = {
    sticker: ""
  };
  const result: boolean = true;

  test("should handle initialState", (): void => {
    expect(
      reducer.deleteStickerFromSet(undefined, {
        deleteStickerFromSet: {},
        type: ""
      })
    ).toEqual(action.initialState);
  });

  test("should handle error", (): void => {
    expect(
      reducer.deleteStickerFromSet(
        { ...action.initialState, query },
        action.error({ error })
      )
    ).toEqual({ error, query });
  });

  test("should handle query", (): void => {
    expect(
      reducer.deleteStickerFromSet(action.initialState, action.query({ query }))
    ).toEqual({ query });
  });

  test("should handle result", (): void => {
    expect(
      reducer.deleteStickerFromSet(
        { ...action.initialState, query },
        action.result({ result })
      )
    ).toEqual({ query, result });
  });
});
