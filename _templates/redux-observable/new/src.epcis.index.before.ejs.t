---
inject: true
to: src/epics/index.ts
before: index
---
import { <%= h.changeCase.camel(name)%> } from "./<%= h.changeCase.camel(name)%>";