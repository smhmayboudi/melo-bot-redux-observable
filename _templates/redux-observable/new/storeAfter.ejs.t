---
inject: true
to: src/configs/store.ts
after: DeepPartial\<
---
    <%= h.changeCase.camel(name)%>: actions.<%= h.changeCase.camel(name)%>.initialState,