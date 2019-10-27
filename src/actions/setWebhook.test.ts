import { IStateSetWebhookQuery } from "../../types/iStateSetWebhookQuery";

import * as action from "./setWebhook";

describe("setWebhook actions", (): void => {
  const error: Error = new Error("");
  const query: IStateSetWebhookQuery = {
    url: ""
  };
  const result: boolean = true;

  test("should handle error", (): void => {
    expect(action.error({ error })).toEqual({
      setWebhook: { error },
      type: action.SET_WEBHOOK_ERROR
    });
  });

  test("should handle query", (): void => {
    expect(action.query({ query })).toEqual({
      setWebhook: { query },
      type: action.SET_WEBHOOK_QUERY
    });
  });

  test("should handle result", (): void => {
    expect(action.result({ result })).toEqual({
      setWebhook: { result },
      type: action.SET_WEBHOOK_RESULT
    });
  });
});
