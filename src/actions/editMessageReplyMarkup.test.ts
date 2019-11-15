import { IStateEditMessageReplyMarkupQuery } from "../../types/iStateEditMessageReplyMarkupQuery";
import { IMessage } from "../../types/telegramBot/types/iMessage";

import * as action from "./editMessageReplyMarkup";

describe("editMessageReplyMarkup actions", (): void => {
  const error: Error = new Error("");
  const query: IStateEditMessageReplyMarkupQuery = {};
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
      editMessageReplyMarkup: { error },
      type: action.EDIT_MESSAGE_REPLY_MARKUP_ERROR
    });
  });

  test("should handle query", (): void => {
    expect(action.query({ query })).toEqual({
      editMessageReplyMarkup: { query },
      type: action.EDIT_MESSAGE_REPLY_MARKUP_QUERY
    });
  });

  test("should handle result", (): void => {
    expect(action.result({ result })).toEqual({
      editMessageReplyMarkup: { result },
      type: action.EDIT_MESSAGE_REPLY_MARKUP_RESULT
    });
  });
});
