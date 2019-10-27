import { IStateSendContactQuery } from "../../types/iStateSendContactQuery";

import * as action from "./sendContact";

describe("sendContact actions", (): void => {
  const error: Error = new Error("");
  const query: IStateSendContactQuery = {
    // TODO: fill it
  };
  // TODO: check it
  const result: boolean = true;

  test("should handle error", (): void => {
    expect(action.error({ error })).toEqual({
      sendContact: { error },
      type: action.SEND_CONTACT_ERROR
    });
  });

  test("should handle query", (): void => {
    expect(action.query({ query })).toEqual({
      sendContact: { query },
      type: action.SEND_CONTACT_QUERY
    });
  });

  test("should handle result", (): void => {
    expect(action.result({ result })).toEqual({
      sendContact: { result },
      type: action.SEND_CONTACT_RESULT
    });
  });
});
