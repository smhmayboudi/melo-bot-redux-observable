---
to: src/actions/<%= h.changeCase.camel(name)%>.test.ts
unless_exists: true
---
import { IState<%= h.changeCase.pascal(name)%>Query } from "../../types/iState<%= h.changeCase.pascal(name)%>Query";

import * as action from "./<%= h.changeCase.camel(name)%>";

describe("<%= h.changeCase.camel(name)%> actions", (): void => {
  const error: Error = new Error("");
  const query: IState<%= h.changeCase.pascal(name)%>Query = {
    // TODO: fill it
  };
  // TODO: check it
  const result = true;

  test("should handle error", (): void => {
    expect(action.error({ error })).toEqual({
      <%= h.changeCase.camel(name)%>: { error },
      type: action.<%= h.changeCase.snake(name).toUpperCase()%>_ERROR
    });
  });

  test("should handle query", (): void => {
    expect(action.query({ query })).toEqual({
      <%= h.changeCase.camel(name)%>: { query },
      type: action.<%= h.changeCase.snake(name).toUpperCase()%>_QUERY
    });
  });

  test("should handle result", (): void => {
    expect(action.result({ result })).toEqual({
      <%= h.changeCase.camel(name)%>: { result },
      type: action.<%= h.changeCase.snake(name).toUpperCase()%>_RESULT
    });
  });
});
