import * as fs from "fs";
import * as path from "path";

import { IStateSetChatPhotoQuery } from "../../types/iStateSetChatPhotoQuery";
import * as action from "../actions/setChatPhoto";

import * as reducer from "./setChatPhoto";

describe("setChatPhoto reducer", (): void => {
  const error: Error = new Error("");
  const query: IStateSetChatPhotoQuery = {
    chat_id: "",
    photo: fs.createReadStream(
      path.resolve(__dirname, "../../asset", "small.jpg")
    )
  };
  const result = true;

  test("should handle initialState", (): void => {
    expect(
      reducer.setChatPhoto(undefined, {
        setChatPhoto: {},
        type: ""
      })
    ).toEqual(action.initialState);
  });

  test("should handle error", (): void => {
    expect(
      reducer.setChatPhoto(
        { ...action.initialState, query },
        action.error({ error })
      )
    ).toEqual({ error, query });
  });

  test("should handle query", (): void => {
    expect(
      reducer.setChatPhoto(action.initialState, action.query({ query }))
    ).toEqual({ query });
  });

  test("should handle result", (): void => {
    expect(
      reducer.setChatPhoto(
        { ...action.initialState, query },
        action.result({ result })
      )
    ).toEqual({ query, result });
  });
});
