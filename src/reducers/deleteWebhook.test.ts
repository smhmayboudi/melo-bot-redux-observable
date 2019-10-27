import { IStateDeleteWebhookQuery } from "../../types/iStateDeleteWebhookQuery";
import * as action from "../actions/deleteWebhook";

import * as reducer from "./deleteWebhook";

describe("deleteWebhook reducer", (): void => {
  const error: Error = new Error("");
  const query: IStateDeleteWebhookQuery = {};
  const result: boolean = true;

  test("should handle initialState", (): void => {
    expect(
      reducer.deleteWebhook(undefined, {
        deleteWebhook: {},
        type: ""
      })
    ).toEqual(action.initialState);
  });

  test("should handle error", (): void => {
    expect(
      reducer.deleteWebhook(
        { ...action.initialState, query },
        action.error({ error })
      )
    ).toEqual({ error, query });
  });

  test("should handle query", (): void => {
    expect(
      reducer.deleteWebhook(action.initialState, action.query({ query }))
    ).toEqual({ query });
  });

  test("should handle result", (): void => {
    expect(
      reducer.deleteWebhook(
        { ...action.initialState, query },
        action.result({ result })
      )
    ).toEqual({ query, result });
  });
});
