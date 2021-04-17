import { IStateEditMessageCaptionQuery } from "../../types/iStateEditMessageCaptionQuery";
import { IMessage } from "../../types/telegramBot/types/iMessage";
import * as action from "../actions/editMessageCaption";

import * as reducer from "./editMessageCaption";

describe("editMessageCaption reducer", (): void => {
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

  test("should handle initialState", (): void => {
    expect(
      reducer.editMessageCaption(undefined, {
        editMessageCaption: {},
        type: ""
      })
    ).toEqual(action.initialState);
  });

  test("should handle error", (): void => {
    expect(
      reducer.editMessageCaption(
        { ...action.initialState, query },
        action.error({ error })
      )
    ).toEqual({ error, query });
  });

  test("should handle query", (): void => {
    expect(
      reducer.editMessageCaption(action.initialState, action.query({ query }))
    ).toEqual({ query });
  });

  test("should handle result", (): void => {
    expect(
      reducer.editMessageCaption(
        { ...action.initialState, query },
        action.result({ result })
      )
    ).toEqual({ query, result });
  });
});
