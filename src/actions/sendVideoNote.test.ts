import { IStateSendVideoNoteQuery } from "../../types/iStateSendVideoNoteQuery";
import { IMessage } from "../../types/telegramBot/types/iMessage";

import * as action from "./sendVideoNote";

describe("sendVideoNote actions", (): void => {
  const error: Error = new Error("");
  const query: IStateSendVideoNoteQuery = {
    chat_id: 0,
    video_note: ""
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
      sendVideoNote: { error },
      type: action.SEND_VIDEO_NOTE_ERROR
    });
  });

  test("should handle query", (): void => {
    expect(action.query({ query })).toEqual({
      sendVideoNote: { query },
      type: action.SEND_VIDEO_NOTE_QUERY
    });
  });

  test("should handle result", (): void => {
    expect(action.result({ result })).toEqual({
      sendVideoNote: { result },
      type: action.SEND_VIDEO_NOTE_RESULT
    });
  });
});
