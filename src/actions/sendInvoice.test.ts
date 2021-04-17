import { IStateSendInvoiceQuery } from "../../types/iStateSendInvoiceQuery";
import { IMessage } from "../../types/telegramBot/types/iMessage";

import * as action from "./sendInvoice";

describe("sendInvoice actions", (): void => {
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
      type: ""
    },
    date: 0,
    message_id: 0
  };

  test("should handle error", (): void => {
    expect(action.error({ error })).toEqual({
      sendInvoice: { error },
      type: action.SEND_INVOICE_ERROR
    });
  });

  test("should handle query", (): void => {
    expect(action.query({ query })).toEqual({
      sendInvoice: { query },
      type: action.SEND_INVOICE_QUERY
    });
  });

  test("should handle result", (): void => {
    expect(action.result({ result })).toEqual({
      sendInvoice: { result },
      type: action.SEND_INVOICE_RESULT
    });
  });
});
