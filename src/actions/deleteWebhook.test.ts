import { IStateDeleteWebhookQuery } from "../../types/iStateDeleteWebhookQuery";

import * as action from "./deleteWebhook";

describe("deleteWebhook actions", (): void => {
  const error: Error = new Error("");
  const query: IStateDeleteWebhookQuery = {
    // TODO: fill it
  };
  // TODO: check it
  const result: boolean = true;

  test("should handle error", (): void => {
    expect(action.error({ error })).toEqual({
      deleteWebhook: { error },
      type: action.DELETE_WEBHOOK_ERROR
    });
  });

  test("should handle query", (): void => {
    expect(action.query({ query })).toEqual({
      deleteWebhook: { query },
      type: action.DELETE_WEBHOOK_QUERY
    });
  });

  test("should handle result", (): void => {
    expect(action.result({ result })).toEqual({
      deleteWebhook: { result },
      type: action.DELETE_WEBHOOK_RESULT
    });
  });
});
