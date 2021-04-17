import { IStateCreateNewStickerSetQuery } from "../../types/iStateCreateNewStickerSetQuery";
import * as action from "../actions/createNewStickerSet";

import * as reducer from "./createNewStickerSet";

describe("createNewStickerSet reducer", (): void => {
  const error: Error = new Error("");
  const query: IStateCreateNewStickerSetQuery = {
    emojis: "",
    name: "",
    png_sticker: "",
    title: "",
    user_id: 0
  };
  const result = true;

  test("should handle initialState", (): void => {
    expect(
      reducer.createNewStickerSet(undefined, {
        createNewStickerSet: {},
        type: ""
      })
    ).toEqual(action.initialState);
  });

  test("should handle error", (): void => {
    expect(
      reducer.createNewStickerSet(
        { ...action.initialState, query },
        action.error({ error })
      )
    ).toEqual({ error, query });
  });

  test("should handle query", (): void => {
    expect(
      reducer.createNewStickerSet(action.initialState, action.query({ query }))
    ).toEqual({ query });
  });

  test("should handle result", (): void => {
    expect(
      reducer.createNewStickerSet(
        { ...action.initialState, query },
        action.result({ result })
      )
    ).toEqual({ query, result });
  });
});
