import { IStateEditMessageReplyMarkupQuery } from "../../types/iStateEditMessageReplyMarkupQuery";
import { IMessage } from "../../types/telegramBot/types/iMessage";
import * as action from "../actions/editMessageReplyMarkup";

import * as reducer from "./editMessageReplyMarkup";

describe("editMessageReplyMarkup reducer", (): void => {
  const error: Error = new Error("");
  const query: IStateEditMessageReplyMarkupQuery = {};
  const result: IMessage = {
    chat: {
      id: 0,
      type: "private"
    },
    date: 0,
    message_id: 0
  };

  test("should handle initialState", (): void => {
    expect(
      reducer.editMessageReplyMarkup(undefined, {
        editMessageReplyMarkup: {},
        type: ""
      })
    ).toEqual(action.initialState);
  });

  test("should handle error", (): void => {
    expect(
      reducer.editMessageReplyMarkup(
        { ...action.initialState, query },
        action.error({ error })
      )
    ).toEqual({ error, query });
  });

  test("should handle query", (): void => {
    expect(
      reducer.editMessageReplyMarkup(
        action.initialState,
        action.query({ query })
      )
    ).toEqual({ query });
  });

  test("should handle result", (): void => {
    expect(
      reducer.editMessageReplyMarkup(
        { ...action.initialState, query },
        action.result({ result })
      )
    ).toEqual({ query, result });
  });
});
