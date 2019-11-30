---
inject: true
to: src/epics/index.ts
after: combineEpics\(
---
  <%= h.changeCase.camel(name)%>,