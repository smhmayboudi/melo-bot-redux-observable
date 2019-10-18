import { ofType, StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { catchError, filter, map, switchMap } from "rxjs/operators";

import { IActionLiterate } from "../../types/iActionLiterate";
import { IDependencies } from "../../types/iDependencies";
import { IState } from "../../types/iState";
import { IStateLiterate } from "../../types/iStateLiterate";
import * as actions from "../actions";
import * as texts from "../config/texts";

const literate: (
  action$: Observable<IActionLiterate>,
  _state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => Observable<IActionLiterate> = (
  action$: Observable<IActionLiterate>,
  _state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
): Observable<IActionLiterate> => {
  const { requestObservable } = dependencies;

  const actionObservable: (
    action: IActionLiterate
  ) => Observable<IActionLiterate> = (
    action: IActionLiterate
  ): Observable<IActionLiterate> => {
    if (requestObservable === undefined) {
      return of(
        actions.literate.error({
          error: new Error(texts.epicDependencyRequestObservableUndefined)
        })
      );
    }
    if (action.literate.query === undefined) {
      return of(
        actions.literate.error({
          error: new Error(texts.actionLiterateQueryUndefined)
        })
      );
    }

    return requestObservable({
      host: "195.201.122.194",
      path: `/litrate/${action.literate.query}`,
      port: "1231"
    }).pipe(
      map(
        (result: IStateLiterate): IActionLiterate =>
          actions.literate.result(result)
      ),
      catchError((error: any) =>
        of(
          actions.literate.error({
            error
          })
        )
      )
    );
  };

  return action$.pipe(
    ofType(actions.literate.LITERATE_QUERY),
    filter((action: IActionLiterate): boolean => action.literate.query !== ""),
    switchMap(actionObservable)
  );
};

export { literate };
