import { IStateEditMessageMediaQuery } from "../../types/iStateEditMessageMediaQuery";
import { IMessage } from "../../types/telegramBot/types/iMessage";

import * as action from "./editMessageMedia";

describe("editMessageMedia actions", (): void => {
  const error: Error = new Error("");
  const query: IStateEditMessageMediaQuery = {
    media: {
      media: "",
      type: ""
    }
  };
  const result: IMessage = {
    chat: {
      id: 0,
      type: ""
    },
    date: 0,
    message_id: 0
  };

  test("should handle error", (): void => {
    expect(action.error({ error })).toEqual({
      editMessageMedia: { error },
      type: action.EDIT_MESSAGE_MEDIA_ERROR
    });
  });

  test("should handle query", (): void => {
    expect(action.query({ query })).toEqual({
      editMessageMedia: { query },
      type: action.EDIT_MESSAGE_MEDIA_QUERY
    });
  });

  test("should handle result", (): void => {
    expect(action.result({ result })).toEqual({
      editMessageMedia: { result },
      type: action.EDIT_MESSAGE_MEDIA_RESULT
    });
  });
});
