import { IStateSendVideoNoteQuery } from "../../types/iStateSendVideoNoteQuery";
import * as action from "../actions/sendVideoNote";

import * as reducer from "./sendVideoNote";
import { IMessage } from "../../types/telegramBot/types/iMessage";

describe("sendVideoNote reducer", (): void => {
  const error: Error = new Error("");
  const query: IStateSendVideoNoteQuery = {
    chat_id: 0,
    video_note: ""
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
      reducer.sendVideoNote(undefined, {
        sendVideoNote: {},
        type: ""
      })
    ).toEqual(action.initialState);
  });

  test("should handle error", (): void => {
    expect(
      reducer.sendVideoNote(
        { ...action.initialState, query },
        action.error({ error })
      )
    ).toEqual({ error, query });
  });

  test("should handle query", (): void => {
    expect(
      reducer.sendVideoNote(action.initialState, action.query({ query }))
    ).toEqual({ query });
  });

  test("should handle result", (): void => {
    expect(
      reducer.sendVideoNote(
        { ...action.initialState, query },
        action.result({ result })
      )
    ).toEqual({ query, result });
  });
});
