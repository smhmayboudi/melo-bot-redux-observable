import { IStateSetWebhookQuery } from "../../types/iStateSetWebhookQuery";
import * as action from "../actions/setWebhook";

import * as reducer from "./setWebhook";

describe("setWebhook reducer", (): void => {
  const error: Error = new Error("");
  const query: IStateSetWebhookQuery = {
    url: ""
  };
  const result: boolean = true;

  test("should handle initialState", (): void => {
    expect(
      reducer.setWebhook(undefined, {
        setWebhook: {},
        type: ""
      })
    ).toEqual(action.initialState);
  });

  test("should handle error", (): void => {
    expect(
      reducer.setWebhook(
        { ...action.initialState, query },
        action.error({ error })
      )
    ).toEqual({ error, query });
  });

  test("should handle query", (): void => {
    expect(
      reducer.setWebhook(action.initialState, action.query({ query }))
    ).toEqual({ query });
  });

  test("should handle result", (): void => {
    expect(
      reducer.setWebhook(
        { ...action.initialState, query },
        action.result({ result })
      )
    ).toEqual({ query, result });
  });
});
