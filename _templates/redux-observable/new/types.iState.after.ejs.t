---
inject: true
to: types/iState.d.ts
after: interface
---
  <%= h.changeCase.camel(name)%>: IState<%= h.changeCase.pascal(name)%>;