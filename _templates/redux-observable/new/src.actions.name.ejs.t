---
to: src/actions/<%= h.changeCase.camel(name)%>.ts
unless_exists: true
---
import { IAction<%= h.changeCase.pascal(name)%> } from "../../types/iAction<%= h.changeCase.pascal(name)%>";
import { IState<%= h.changeCase.pascal(name)%> } from "../../types/iState<%= h.changeCase.pascal(name)%>";

const initialState: IState<%= h.changeCase.pascal(name)%> = {};

const <%= h.changeCase.snake(name).toUpperCase()%>_ERROR = "<%= h.changeCase.snake(name).toUpperCase()%>_ERROR";
const <%= h.changeCase.snake(name).toUpperCase()%>_QUERY = "<%= h.changeCase.snake(name).toUpperCase()%>_QUERY";
const <%= h.changeCase.snake(name).toUpperCase()%>_RESULT = "<%= h.changeCase.snake(name).toUpperCase()%>_RESULT";

const error: (
  <%= h.changeCase.camel(name)%>: IState<%= h.changeCase.pascal(name)%>
) => IAction<%= h.changeCase.pascal(name)%> = (
  <%= h.changeCase.camel(name)%>: IState<%= h.changeCase.pascal(name)%>
): IAction<%= h.changeCase.pascal(name)%> => ({
  <%= h.changeCase.camel(name)%>: { error: <%= h.changeCase.camel(name)%>.error },
  type: <%= h.changeCase.snake(name).toUpperCase()%>_ERROR
});
const query: (
  <%= h.changeCase.camel(name)%>: IState<%= h.changeCase.pascal(name)%>
) => IAction<%= h.changeCase.pascal(name)%> = (
  <%= h.changeCase.camel(name)%>: IState<%= h.changeCase.pascal(name)%>
): IAction<%= h.changeCase.pascal(name)%> => ({
  <%= h.changeCase.camel(name)%>: { query: <%= h.changeCase.camel(name)%>.query },
  type: <%= h.changeCase.snake(name).toUpperCase()%>_QUERY
});
const result: (
  <%= h.changeCase.camel(name)%>: IState<%= h.changeCase.pascal(name)%>
) => IAction<%= h.changeCase.pascal(name)%> = (
  <%= h.changeCase.camel(name)%>: IState<%= h.changeCase.pascal(name)%>
): IAction<%= h.changeCase.pascal(name)%> => ({
  <%= h.changeCase.camel(name)%>: { result: <%= h.changeCase.camel(name)%>.result },
  type: <%= h.changeCase.snake(name).toUpperCase()%>_RESULT
});

export {
  initialState,
  <%= h.changeCase.snake(name).toUpperCase()%>_ERROR,
  <%= h.changeCase.snake(name).toUpperCase()%>_QUERY,
  <%= h.changeCase.snake(name).toUpperCase()%>_RESULT,
  error,
  query,
  result
};
