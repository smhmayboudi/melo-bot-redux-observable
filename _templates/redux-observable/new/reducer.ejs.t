---
to: src/reducers/<%= h.changeCase.camel(name)%>.ts
unless_exists: true
---
import { IAction<%= h.changeCase.pascal(name)%> } from "../../types/iAction<%= h.changeCase.pascal(name)%>";
import { IState<%= h.changeCase.pascal(name)%> } from "../../types/iState<%= h.changeCase.pascal(name)%>";
import * as actions from "../actions";

const <%= h.changeCase.camel(name)%>: (
  state: IState<%= h.changeCase.pascal(name)%> | undefined,
  action: IAction<%= h.changeCase.pascal(name)%>
) => IState<%= h.changeCase.pascal(name)%> = (
  state: IState<%= h.changeCase.pascal(name)%> | undefined = actions.<%= h.changeCase.camel(name)%>
    .initialState,
  action: IAction<%= h.changeCase.pascal(name)%>
): IState<%= h.changeCase.pascal(name)%> => {
  switch (action.type) {
    case actions.<%= h.changeCase.camel(name)%>.<%= h.changeCase.snake(name).toUpperCase()%>_ERROR:
      return { error: action.<%= h.changeCase.camel(name)%>.error, query: state.query };
    case actions.<%= h.changeCase.camel(name)%>.<%= h.changeCase.snake(name).toUpperCase()%>_QUERY:
      return { query: action.<%= h.changeCase.camel(name)%>.query };
    case actions.<%= h.changeCase.camel(name)%>.<%= h.changeCase.snake(name).toUpperCase()%>_RESULT:
      return { query: state.query, result: action.<%= h.changeCase.camel(name)%>.result };
    default:
      return state;
  }
};

export { <%= h.changeCase.camel(name)%> };
