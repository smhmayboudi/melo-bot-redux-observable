---
inject: true
to: src/actions/index.ts
after: export \{
---
  <%= h.changeCase.camel(name)%>,