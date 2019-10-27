import { IStateSendVideoNoteQuery } from "../../types/iStateSendVideoNoteQuery";

import * as action from "./sendVideoNote";

describe("sendVideoNote actions", (): void => {
  const error: Error = new Error("");
  const query: IStateSendVideoNoteQuery = {
    // TODO: fill it
  };
  // TODO: check it
  const result: boolean = true;

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
