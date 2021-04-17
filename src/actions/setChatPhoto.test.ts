import * as fs from "fs";
import * as path from "path";

import { IStateSetChatPhotoQuery } from "../../types/iStateSetChatPhotoQuery";

import * as action from "./setChatPhoto";

describe("setChatPhoto actions", (): void => {
  const error: Error = new Error("");
  const query: IStateSetChatPhotoQuery = {
    chat_id: "",
    photo: fs.createReadStream(
      path.resolve(__dirname, "../../asset", "small.jpg")
    )
  };
  const result = true;

  test("should handle error", (): void => {
    expect(action.error({ error })).toEqual({
      setChatPhoto: { error },
      type: action.SET_CHAT_PHOTO_ERROR
    });
  });

  test("should handle query", (): void => {
    expect(action.query({ query })).toEqual({
      setChatPhoto: { query },
      type: action.SET_CHAT_PHOTO_QUERY
    });
  });

  test("should handle result", (): void => {
    expect(action.result({ result })).toEqual({
      setChatPhoto: { result },
      type: action.SET_CHAT_PHOTO_RESULT
    });
  });
});
