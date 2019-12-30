import debug from "debug";
import { Enforcer, newEnforcer } from "casbin";
import * as path from "path";
import { StateObservable } from "redux-observable";
import { Observable } from "rxjs";
import { fromPromise } from "rxjs/internal/observable/fromPromise";
import { IDependencies } from "../../types/iDependencies";

import { IAction } from "../../types/iAction";
import { IState } from "../../types/iState";
import { id } from "../utils/user";

const authorization: (
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies,
  action: IAction,
  index: number
) => Observable<boolean> = (
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies,
  action: IAction,
  _index: number
): Observable<boolean> =>
  fromPromise(
    newEnforcer(
      path.resolve(__dirname, "../../authorization.conf"),
      path.resolve(__dirname, "../../authorization.csv")
    )
      .then((enforcer: Enforcer) => {
        if (state$ === undefined) {
          const { locales } = dependencies;
          throw new Error(locales.find("state$Undefined"));
        }
        return enforcer.enforce(id(state$.value.message.query), action.type);
      })
      .catch((error: Error) => {
        const appDebug: debug.IDebugger = debug("app:utils:authorization");
        appDebug("ERROR", error);
        return false;
      })
  );

export { authorization };
