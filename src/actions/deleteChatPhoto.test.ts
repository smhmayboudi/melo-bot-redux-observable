import { IStateDeleteChatPhotoQuery } from "../../types/iStateDeleteChatPhotoQuery";

import * as action from "./deleteChatPhoto";

describe("deleteChatPhoto actions", (): void => {
  const error: Error = new Error("");
  const query: IStateDeleteChatPhotoQuery = {
    chat_id: 0
  };
  const result = true;

  test("should handle error", (): void => {
    expect(action.error({ error })).toEqual({
      deleteChatPhoto: { error },
      type: action.DELETE_CHAT_PHOTO_ERROR
    });
  });

  test("should handle query", (): void => {
    expect(action.query({ query })).toEqual({
      deleteChatPhoto: { query },
      type: action.DELETE_CHAT_PHOTO_QUERY
    });
  });

  test("should handle result", (): void => {
    expect(action.result({ result })).toEqual({
      deleteChatPhoto: { result },
      type: action.DELETE_CHAT_PHOTO_RESULT
    });
  });
});
