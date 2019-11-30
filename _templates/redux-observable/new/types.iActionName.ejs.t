---
to: types/iAction<%= h.changeCase.pascal(name)%>.d.ts
unless_exists: true
---
import { Action } from "redux";

import { IState<%= h.changeCase.pascal(name)%> } from "./iState<%= h.changeCase.pascal(name)%>";

export interface IAction<%= h.changeCase.pascal(name)%> extends Action<string> {
  <%= h.changeCase.camel(name)%>: IState<%= h.changeCase.pascal(name)%>;
}
