import { IStateSendMediaGroupQuery } from "../../types/iStateSendMediaGroupQuery";
import { IMessage } from "../../types/telegramBot/types/iMessage";

import * as action from "./sendMediaGroup";

describe("sendMediaGroup actions", (): void => {
  const error: Error = new Error("");
  const query: IStateSendMediaGroupQuery = {
    chat_id: 0,
    media: [
      {
        media: "",
        type: ""
      }
    ]
  };
  const result: IMessage = {
    chat: {
      id: 0,
      type: "private"
    },
    date: 0,
    message_id: 0
  };

  test("should handle error", (): void => {
    expect(action.error({ error })).toEqual({
      sendMediaGroup: { error },
      type: action.SEND_MEDIA_GROUP_ERROR
    });
  });

  test("should handle query", (): void => {
    expect(action.query({ query })).toEqual({
      sendMediaGroup: { query },
      type: action.SEND_MEDIA_GROUP_QUERY
    });
  });

  test("should handle result", (): void => {
    expect(action.result({ result })).toEqual({
      sendMediaGroup: { result },
      type: action.SEND_MEDIA_GROUP_RESULT
    });
  });
});
