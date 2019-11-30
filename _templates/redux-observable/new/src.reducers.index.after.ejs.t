---
inject: true
to: src/reducers/index.ts
after: combineReducers\<IState\>\(\{
---
  <%= h.changeCase.camel(name)%>,