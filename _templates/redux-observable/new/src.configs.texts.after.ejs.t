---
inject: true
to: src/configs/texts.ts
after: export
---
  action<%= h.changeCase.pascal(name)%>QueryUndefined,