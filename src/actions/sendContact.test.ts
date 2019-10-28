import { IStateSendContactQuery } from "../../types/iStateSendContactQuery";
import { IMessage } from "../../types/telegramBot/types/iMessage";

import * as action from "./sendContact";

describe("sendContact actions", (): void => {
  const error: Error = new Error("");
  const query: IStateSendContactQuery = {
    chat_id: 0,
    first_name: "",
    phone_number: ""
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
