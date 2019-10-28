import { IStateSendPhotoQuery } from "../../types/iStateSendPhotoQuery";
import { IMessage } from "../../types/telegramBot/types/iMessage";

import * as action from "./sendPhoto";

describe("sendPhoto actions", (): void => {
  const error: Error = new Error("");
  const query: IStateSendPhotoQuery = {
    chat_id: 0,
    photo: ""
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
      sendPhoto: { error },
      type: action.SEND_PHOTO_ERROR
    });
  });

  test("should handle query", (): void => {
    expect(action.query({ query })).toEqual({
      sendPhoto: { query },
      type: action.SEND_PHOTO_QUERY
    });
  });

  test("should handle result", (): void => {
    expect(action.result({ result })).toEqual({
      sendPhoto: { result },
      type: action.SEND_PHOTO_RESULT
    });
  });
});
