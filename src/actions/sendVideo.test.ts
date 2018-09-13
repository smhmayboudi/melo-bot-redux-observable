import { IStateSendVideoQuery } from "../../types/iStateSendVideoQuery";
import { IMessage } from "../../types/telegramBot/types/iMessage";
import * as action from "./sendVideo";

describe("sendVideo actions", (): void => {

  const error: Error = new Error("");
  const query: IStateSendVideoQuery = {
    chat_id: 0,
    video: "",
  };
  const result: IMessage = {
    chat: {
      id: 0,
      type: "private",
    },
    date: 0,
    message_id: 0,
  };

  test("should handle error", (): void => {
    expect(action.error({ error }))
      .toEqual({
        sendVideo: { error },
        type: action.SEND_VIDEO_ERROR,
      });
  });

  test("should handle query", (): void => {
    expect(action.query({ query }))
      .toEqual({
        sendVideo: { query },
        type: action.SEND_VIDEO_QUERY,
      });
  });

  test("should handle result", (): void => {
    expect(action.result({ result }))
      .toEqual({
        sendVideo: { result },
        type: action.SEND_VIDEO_RESULT,
      });
  });

});
