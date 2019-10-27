import { IStateSendVideoNoteQuery } from "../../types/iStateSendVideoNoteQuery";
import * as action from "../actions/sendVideoNote";

import * as reducer from "./sendVideoNote";

describe("sendVideoNote reducer", (): void => {
  const error: Error = new Error("");
  const query: IStateSendVideoNoteQuery = {
    // TODO: fill it
  };
  // TODO: check it
  const result: boolean = true;

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
