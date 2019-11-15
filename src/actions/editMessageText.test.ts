import { IStateEditMessageTextQuery } from "../../types/iStateEditMessageTextQuery";
import { IMessage } from "../../types/telegramBot/types/iMessage";

import * as action from "./editMessageText";

describe("editMessageText actions", (): void => {
  const error: Error = new Error("");
  const query: IStateEditMessageTextQuery = {
    text: ""
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
      editMessageText: { error },
      type: action.EDIT_MESSAGE_TEXT_ERROR
    });
  });

  test("should handle query", (): void => {
    expect(action.query({ query })).toEqual({
      editMessageText: { query },
      type: action.EDIT_MESSAGE_TEXT_QUERY
    });
  });

  test("should handle result", (): void => {
    expect(action.result({ result })).toEqual({
      editMessageText: { result },
      type: action.EDIT_MESSAGE_TEXT_RESULT
    });
  });
});
