---
inject: true
to: types/iAction.d.ts
after: Action\<string\> \{
---
  <%= h.changeCase.camel(name)%>?: IState<%= h.changeCase.pascal(name)%>;