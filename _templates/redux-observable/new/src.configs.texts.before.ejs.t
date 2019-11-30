---
inject: true
to: src/configs/texts.ts
before: export
---
const action<%= h.changeCase.pascal(name)%>QueryUndefined = "action<%= h.changeCase.pascal(name)%>Query undefined.";