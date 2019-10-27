import { IStateEditMessageMediaQuery } from "../../types/iStateEditMessageMediaQuery";
import { IMessage } from "../../types/telegramBot/types/iMessage";
import * as action from "../actions/editMessageMedia";

import * as reducer from "./editMessageMedia";

describe("editMessageMedia reducer", (): void => {
  const error: Error = new Error("");
  const query: IStateEditMessageMediaQuery = {
    media: {
      media: "",
      type: ""
    },
    reply_markup: {
      inline_keyboard: [
        [
          {
            login_url: {
              url: ""
            },
            text: ""
          }
        ]
      ]
    }
  };
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
      reducer.editMessageMedia(undefined, {
        editMessageMedia: {},
        type: ""
      })
    ).toEqual(action.initialState);
  });

  test("should handle error", (): void => {
    expect(
      reducer.editMessageMedia(
        { ...action.initialState, query },
        action.error({ error })
      )
    ).toEqual({ error, query });
  });

  test("should handle query", (): void => {
    expect(
      reducer.editMessageMedia(action.initialState, action.query({ query }))
    ).toEqual({ query });
  });

  test("should handle result", (): void => {
    expect(
      reducer.editMessageMedia(
        { ...action.initialState, query },
        action.result({ result })
      )
    ).toEqual({ query, result });
  });
});
