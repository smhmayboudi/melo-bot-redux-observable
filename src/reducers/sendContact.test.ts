import { IStateSendContactQuery } from "../../types/iStateSendContactQuery";
import { IMessage } from "../../types/telegramBot/types/iMessage";
import * as action from "../actions/sendContact";

import * as reducer from "./sendContact";

describe("sendContact reducer", (): void => {
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

  test("should handle initialState", (): void => {
    expect(
      reducer.sendContact(undefined, {
        sendContact: {},
        type: ""
      })
    ).toEqual(action.initialState);
  });

  test("should handle error", (): void => {
    expect(
      reducer.sendContact(
        { ...action.initialState, query },
        action.error({ error })
      )
    ).toEqual({ error, query });
  });

  test("should handle query", (): void => {
    expect(
      reducer.sendContact(action.initialState, action.query({ query }))
    ).toEqual({ query });
  });

  test("should handle result", (): void => {
    expect(
      reducer.sendContact(
        { ...action.initialState, query },
        action.result({ result })
      )
    ).toEqual({ query, result });
  });
});
