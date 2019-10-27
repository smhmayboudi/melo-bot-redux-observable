---
to: types/iState<%= h.changeCase.pascal(name)%>.d.ts
unless_exists: true
---
import { IState<%= h.changeCase.pascal(name)%>Query } from "./iState<%= h.changeCase.pascal(name)%>Query";

export interface IState<%= h.changeCase.pascal(name)%> {
  error?: any;
  query?: IState<%= h.changeCase.pascal(name)%>Query;
  // TODO: check it
  result?: boolean;
}
