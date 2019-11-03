---
inject: true
to: src/reducers/index.ts
after: combineReducers\(\{
---
  <%= h.changeCase.camel(name)%>,