import { IStateEditMessageCaptionQuery } from "../../types/iStateEditMessageCaptionQuery";
import { IMessage } from "../../types/telegramBot/types/iMessage";

import * as action from "./editMessageCaption";

describe("editMessageCaption actions", (): void => {
  const error: Error = new Error("");
  const query: IStateEditMessageCaptionQuery = {};
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
      editMessageCaption: { error },
      type: action.EDIT_MESSAGE_CAPTION_ERROR
    });
  });

  test("should handle query", (): void => {
    expect(action.query({ query })).toEqual({
      editMessageCaption: { query },
      type: action.EDIT_MESSAGE_CAPTION_QUERY
    });
  });

  test("should handle result", (): void => {
    expect(action.result({ result })).toEqual({
      editMessageCaption: { result },
      type: action.EDIT_MESSAGE_CAPTION_RESULT
    });
  });
});
