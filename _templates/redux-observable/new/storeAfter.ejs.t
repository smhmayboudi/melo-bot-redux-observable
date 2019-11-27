---
inject: true
to: src/utils/store.ts
after: IState
---
    <%= h.changeCase.camel(name)%>: actions.<%= h.changeCase.camel(name)%>.initialState,