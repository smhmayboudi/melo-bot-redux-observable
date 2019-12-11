---
inject: true
to: authorization.csv
before: g,
---
p, admin, <%= h.changeCase.snake(name).toUpperCase()%>_ERROR
p, admin, <%= h.changeCase.snake(name).toUpperCase()%>_QUERY
p, admin, <%= h.changeCase.snake(name).toUpperCase()%>_RESULT