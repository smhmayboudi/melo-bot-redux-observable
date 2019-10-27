import { IStateSendInvoiceQuery } from "../../types/iStateSendInvoiceQuery";
import { IMessage } from "../../types/telegramBot/types/iMessage";
import * as action from "../actions/sendInvoice";

import * as reducer from "./sendInvoice";

describe("sendInvoice reducer", (): void => {
  const error: Error = new Error("");
  const query: IStateSendInvoiceQuery = {
    chat_id: 0,
    currency: "",
    description: "",
    payload: "",
    prices: [
      {
        amount: 0,
        label: ""
      }
    ],
    provider_token: "",
    start_parameter: "",
    title: ""
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
      reducer.sendInvoice(undefined, {
        sendInvoice: {},
        type: ""
      })
    ).toEqual(action.initialState);
  });

  test("should handle error", (): void => {
    expect(
      reducer.sendInvoice(
        { ...action.initialState, query },
        action.error({ error })
      )
    ).toEqual({ error, query });
  });

  test("should handle query", (): void => {
    expect(
      reducer.sendInvoice(action.initialState, action.query({ query }))
    ).toEqual({ query });
  });

  test("should handle result", (): void => {
    expect(
      reducer.sendInvoice(
        { ...action.initialState, query },
        action.result({ result })
      )
    ).toEqual({ query, result });
  });
});
