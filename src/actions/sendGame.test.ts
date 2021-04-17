import { IStateSendGameQuery } from "../../types/iStateSendGameQuery";
import { IMessage } from "../../types/telegramBot/types/iMessage";

import * as action from "./sendGame";

describe("sendGame actions", (): void => {
  const error: Error = new Error("");
  const query: IStateSendGameQuery = {
    chat_id: 0,
    game_short_name: ""
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
      sendGame: { error },
      type: action.SEND_GAME_ERROR
    });
  });

  test("should handle query", (): void => {
    expect(action.query({ query })).toEqual({
      sendGame: { query },
      type: action.SEND_GAME_QUERY
    });
  });

  test("should handle result", (): void => {
    expect(action.result({ result })).toEqual({
      sendGame: { result },
      type: action.SEND_GAME_RESULT
    });
  });
});
