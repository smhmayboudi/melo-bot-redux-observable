---
inject: true
to: src/reducers/index.ts
before: index
---
import { <%= h.changeCase.camel(name)%> } from "./<%= h.changeCase.camel(name)%>";