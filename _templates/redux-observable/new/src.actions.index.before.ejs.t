---
inject: true
to: src/actions/index.ts
before: export \{
---
import * as <%= h.changeCase.camel(name)%> from "./<%= h.changeCase.camel(name)%>";