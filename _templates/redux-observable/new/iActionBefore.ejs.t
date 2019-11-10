---
inject: true
to: types/iAction.d.ts
before: interface
---
import { IState<%= h.changeCase.pascal(name)%> } from "./iState<%= h.changeCase.pascal(name)%>";