---
inject: true
to: src/configs/store.ts
after: IState
---
    <%= h.changeCase.camel(name)%>: actions.<%= h.changeCase.camel(name)%>.initialState,