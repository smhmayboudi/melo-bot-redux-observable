---
inject: true
to: src/configs/store.ts
before: configureStore
---
import { IState<%= h.changeCase.pascal(name)%> } from "../../types/iState<%= h.changeCase.pascal(name)%>";