import { Enforcer, newEnforcer } from "casbin";
import * as path from "path";
import { StateObservable } from "redux-observable";
import { Observable } from "rxjs";
import { fromPromise } from "rxjs/internal/observable/fromPromise";

import { IAction } from "../../types/iAction";
import { IState } from "../../types/iState";

const authorization: (
  value: IAction,
  state$: StateObservable<IState> | undefined,
  index: number
) => Observable<boolean> = (
  action: IAction,
  state$: StateObservable<IState> | undefined,
  _index: number
): Observable<boolean> =>
  fromPromise(
    newEnforcer(
      path.resolve(__dirname, "../../authorization.conf"),
      path.resolve(__dirname, "../../authorization.csv")
    ).then((enforcer: Enforcer) =>
      enforcer.enforce(
        state$?.value.message.query?.message?.from?.id,
        action.type
      )
    )
  );

export { authorization };
