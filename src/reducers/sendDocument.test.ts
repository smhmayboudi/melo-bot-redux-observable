import { IStateSendDocumentQuery } from "../../types/iStateSendDocumentQuery";
import * as action from "../actions/sendDocument";

import * as reducer from "./sendDocument";

describe("sendDocument reducer", (): void => {
  const error: Error = new Error("");
  const query: IStateSendDocumentQuery = {
    // TODO: fill it
  };
  // TODO: check it
  const result: boolean = true;

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
