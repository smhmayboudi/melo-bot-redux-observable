import { IStateEditMessageTextQuery } from "../../types/iStateEditMessageTextQuery";
import { IMessage } from "../../types/telegramBot/types/iMessage";
import * as action from "../actions/editMessageText";

import * as reducer from "./editMessageText";

describe("editMessageText reducer", (): void => {
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

  test("should handle initialState", (): void => {
    expect(
      reducer.editMessageText(undefined, {
        editMessageText: {},
        type: ""
      })
    ).toEqual(action.initialState);
  });

  test("should handle error", (): void => {
    expect(
      reducer.editMessageText(
        { ...action.initialState, query },
        action.error({ error })
      )
    ).toEqual({ error, query });
  });

  test("should handle query", (): void => {
    expect(
      reducer.editMessageText(action.initialState, action.query({ query }))
    ).toEqual({ query });
  });

  test("should handle result", (): void => {
    expect(
      reducer.editMessageText(
        { ...action.initialState, query },
        action.result({ result })
      )
    ).toEqual({ query, result });
  });
});
