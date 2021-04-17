---
to: src/reducers/<%= h.changeCase.camel(name)%>.test.ts
unless_exists: true
---
import { IState<%= h.changeCase.pascal(name)%>Query } from "../../types/iState<%= h.changeCase.pascal(name)%>Query";
import * as action from "../actions/<%= h.changeCase.camel(name)%>";

import * as reducer from "./<%= h.changeCase.camel(name)%>";

describe("<%= h.changeCase.camel(name)%> reducer", (): void => {
  const error: Error = new Error("");
  const query: IState<%= h.changeCase.pascal(name)%>Query = {
    // TODO: fill it
  };
  // TODO: check it
  const result = true;

  test("should handle initialState", (): void => {
    expect(
      reducer.<%= h.changeCase.camel(name)%>(undefined, {
        <%= h.changeCase.camel(name)%>: {},
        type: ""
      })
    ).toEqual(action.initialState);
  });

  test("should handle error", (): void => {
    expect(
      reducer.<%= h.changeCase.camel(name)%>(
        { ...action.initialState, query },
        action.error({ error })
      )
    ).toEqual({ error, query });
  });

  test("should handle query", (): void => {
    expect(
      reducer.<%= h.changeCase.camel(name)%>(action.initialState, action.query({ query }))
    ).toEqual({ query });
  });

  test("should handle result", (): void => {
    expect(
      reducer.<%= h.changeCase.camel(name)%>(
        { ...action.initialState, query },
        action.result({ result })
      )
    ).toEqual({ query, result });
  });
});
