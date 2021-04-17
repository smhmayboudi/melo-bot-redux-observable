import { IStateSendDocumentQuery } from "../../types/iStateSendDocumentQuery";
import { IMessage } from "../../types/telegramBot/types/iMessage";

import * as action from "./sendDocument";

describe("sendDocument actions", (): void => {
  const error: Error = new Error("");
  const query: IStateSendDocumentQuery = {
    chat_id: 0,
    document: ""
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
      sendDocument: { error },
      type: action.SEND_DOCUMENT_ERROR
    });
  });

  test("should handle query", (): void => {
    expect(action.query({ query })).toEqual({
      sendDocument: { query },
      type: action.SEND_DOCUMENT_QUERY
    });
  });

  test("should handle result", (): void => {
    expect(action.result({ result })).toEqual({
      sendDocument: { result },
      type: action.SEND_DOCUMENT_RESULT
    });
  });
});
