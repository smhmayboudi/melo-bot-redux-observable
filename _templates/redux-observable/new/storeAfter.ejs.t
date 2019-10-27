---
inject: true
to: src/configs/store.ts
after: DeepPartial\<\{
---
    <%= h.changeCase.camel(name)%>: IState<%= h.changeCase.pascal(name)%>;