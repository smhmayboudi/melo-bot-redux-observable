import { IStateUnpinChatMessageQuery } from "../../types/iStateUnpinChatMessageQuery";

import * as action from "./unpinChatMessage";

describe("unpinChatMessage actions", (): void => {
  const error: Error = new Error("");
  const query: IStateUnpinChatMessageQuery = {
    // TODO: fill it
  };
  // TODO: check it
  const result: boolean = true;

  test("should handle error", (): void => {
    expect(action.error({ error })).toEqual({
      type: action.UNPIN_CHAT_MESSAGE_ERROR,
      unpinChatMessage: { error }
    });
  });

  test("should handle query", (): void => {
    expect(action.query({ query })).toEqual({
      type: action.UNPIN_CHAT_MESSAGE_QUERY,
      unpinChatMessage: { query }
    });
  });

  test("should handle result", (): void => {
    expect(action.result({ result })).toEqual({
      type: action.UNPIN_CHAT_MESSAGE_RESULT,
      unpinChatMessage: { result }
    });
  });
});
