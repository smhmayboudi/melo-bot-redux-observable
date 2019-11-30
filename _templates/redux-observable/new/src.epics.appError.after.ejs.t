---
inject: true
to: src/epics/appError.ts
after: ofType\(
---
      actions.<%= h.changeCase.camel(name)%>.<%= h.changeCase.snake(name).toUpperCase()%>_ERROR,