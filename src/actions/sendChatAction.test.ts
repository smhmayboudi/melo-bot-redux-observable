import { IStateSendChatActionQuery } from "../../types/iStateSendChatActionQuery";

import * as action from "./sendChatAction";

describe("sendChatAction actions", (): void => {
  const error: Error = new Error("");
  const query: IStateSendChatActionQuery = {
    action: "",
    chat_id: 0
  };
  const result: boolean = true;

  test("should handle error", (): void => {
    expect(action.error({ error })).toEqual({
      sendChatAction: { error },
      type: action.SEND_CHAT_ACTION_ERROR
    });
  });

  test("should handle query", (): void => {
    expect(action.query({ query })).toEqual({
      sendChatAction: { query },
      type: action.SEND_CHAT_ACTION_QUERY
    });
  });

  test("should handle result", (): void => {
    expect(action.result({ result })).toEqual({
      sendChatAction: { result },
      type: action.SEND_CHAT_ACTION_RESULT
    });
  });
});
