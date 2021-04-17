import { IStateGetWebhookInfoQuery } from "../../types/iStateGetWebhookInfoQuery";
import { IWebhookInfo } from "../../types/telegramBot/updates/iWebhookInfo";
import * as action from "../actions/getWebhookInfo";

import * as reducer from "./getWebhookInfo";

describe("getWebhookInfo reducer", (): void => {
  const error: Error = new Error("");
  const query: IStateGetWebhookInfoQuery = {};
  const result: IWebhookInfo = {
    has_custom_certificate: true,
    pending_update_count: 0,
    url: ""
  };

  test("should handle initialState", (): void => {
    expect(
      reducer.getWebhookInfo(undefined, {
        getWebhookInfo: {},
        type: ""
      })
    ).toEqual(action.initialState);
  });

  test("should handle error", (): void => {
    expect(
      reducer.getWebhookInfo(
        { ...action.initialState, query },
        action.error({ error })
      )
    ).toEqual({ error, query });
  });

  test("should handle query", (): void => {
    expect(
      reducer.getWebhookInfo(action.initialState, action.query({ query }))
    ).toEqual({ query });
  });

  test("should handle result", (): void => {
    expect(
      reducer.getWebhookInfo(
        { ...action.initialState, query },
        action.result({ result })
      )
    ).toEqual({ query, result });
  });
});
