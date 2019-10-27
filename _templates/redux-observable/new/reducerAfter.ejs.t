---
inject: true
to: src/reducers/index.ts
after: Reducer\<\{
---
  <%= h.changeCase.camel(name)%>: IState<%= h.changeCase.pascal(name)%>;