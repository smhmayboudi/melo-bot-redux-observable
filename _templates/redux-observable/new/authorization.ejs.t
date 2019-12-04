---
inject: true
to: authorization.csv
after: 52953379
---
p, admin, <%= h.changeCase.snake(name).toUpperCase()%>_ERROR
p, admin, <%= h.changeCase.snake(name).toUpperCase()%>_QUERY
p, admin, <%= h.changeCase.snake(name).toUpperCase()%>_RESULT