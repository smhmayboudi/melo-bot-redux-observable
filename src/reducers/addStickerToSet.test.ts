import { IStateAddStickerToSetQuery } from "../../types/iStateAddStickerToSetQuery";
import * as action from "../actions/addStickerToSet";

import * as reducer from "./addStickerToSet";

describe("addStickerToSet reducer", (): void => {
  const error: Error = new Error("");
  const query: IStateAddStickerToSetQuery = {
    emojis: "",
    name: "",
    png_sticker: "",
    user_id: 0
  };
  const result: boolean = true;

  test("should handle initialState", (): void => {
    expect(
      reducer.addStickerToSet(undefined, {
        addStickerToSet: {},
        type: ""
      })
    ).toEqual(action.initialState);
  });

  test("should handle error", (): void => {
    expect(
      reducer.addStickerToSet(
        { ...action.initialState, query },
        action.error({ error })
      )
    ).toEqual({ error, query });
  });

  test("should handle query", (): void => {
    expect(
      reducer.addStickerToSet(action.initialState, action.query({ query }))
    ).toEqual({ query });
  });

  test("should handle result", (): void => {
    expect(
      reducer.addStickerToSet(
        { ...action.initialState, query },
        action.result({ result })
      )
    ).toEqual({ query, result });
  });
});
