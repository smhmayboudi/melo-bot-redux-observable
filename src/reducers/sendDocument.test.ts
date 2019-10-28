import { IStateSendDocumentQuery } from "../../types/iStateSendDocumentQuery";
import * as action from "../actions/sendDocument";

import * as reducer from "./sendDocument";
import { IMessage } from "../../types/telegramBot/types/iMessage";

describe("sendDocument reducer", (): void => {
  const error: Error = new Error("");
  const query: IStateSendDocumentQuery = {
    chat_id: 0,
    document: ""
  };
  const result: IMessage = {
    chat: {
      id: 0,
      type: "private"
    },
    date: 0,
    message_id: 0
  };

  test("should handle initialState", (): void => {
    expect(
      reducer.sendDocument(undefined, {
        sendDocument: {},
        type: ""
      })
    ).toEqual(action.initialState);
  });

  test("should handle error", (): void => {
    expect(
      reducer.sendDocument(
        { ...action.initialState, query },
        action.error({ error })
      )
    ).toEqual({ error, query });
  });

  test("should handle query", (): void => {
    expect(
      reducer.sendDocument(action.initialState, action.query({ query }))
    ).toEqual({ query });
  });

  test("should handle result", (): void => {
    expect(
      reducer.sendDocument(
        { ...action.initialState, query },
        action.result({ result })
      )
    ).toEqual({ query, result });
  });
});
