import { IStateGetWebhookInfoQuery } from "../../types/iStateGetWebhookInfoQuery";
import { IWebhookInfo } from "../../types/telegramBot/updates/iWebhookInfo";

import * as action from "./getWebhookInfo";

describe("getWebhookInfo actions", (): void => {
  const error: Error = new Error("");
  const query: IStateGetWebhookInfoQuery = {};
  const result: IWebhookInfo = {
    has_custom_certificate: true,
    pending_update_count: 0,
    url: ""
  };

  test("should handle error", (): void => {
    expect(action.error({ error })).toEqual({
      getWebhookInfo: { error },
      type: action.GET_WEBHOOK_INFO_ERROR
    });
  });

  test("should handle query", (): void => {
    expect(action.query({ query })).toEqual({
      getWebhookInfo: { query },
      type: action.GET_WEBHOOK_INFO_QUERY
    });
  });

  test("should handle result", (): void => {
    expect(action.result({ result })).toEqual({
      getWebhookInfo: { result },
      type: action.GET_WEBHOOK_INFO_RESULT
    });
  });
});
