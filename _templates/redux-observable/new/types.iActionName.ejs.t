---
to: types/iAction<%= h.changeCase.pascal(name)%>.d.ts
unless_exists: true
---
import { IAction } from "./iAction";
import { IState<%= h.changeCase.pascal(name)%> } from "./iState<%= h.changeCase.pascal(name)%>";

export interface IAction<%= h.changeCase.pascal(name)%> extends IAction {
  <%= h.changeCase.camel(name)%>: IState<%= h.changeCase.pascal(name)%>;
}
