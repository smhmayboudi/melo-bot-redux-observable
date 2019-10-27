---
inject: true
to: src/reducers/index.ts
before: index
---
import { IState<%= h.changeCase.pascal(name)%> } from "../../types/iState<%= h.changeCase.pascal(name)%>";
import { <%= h.changeCase.camel(name)%> } from "./<%= h.changeCase.camel(name)%>";