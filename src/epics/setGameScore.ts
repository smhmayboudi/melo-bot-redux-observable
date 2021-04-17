import { ofType, StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { IActionSetGameScore } from "../../types/iActionSetGameScore";
import { IDependencies } from "../../types/iDependencies";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import { IMessage } from "../../types/telegramBot/types/iMessage";
import * as actions from "../actions";
import { filterAsync } from "../libs/filterAsync";

const setGameScore: (
  action$: Observable<IActionSetGameScore>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => Observable<IActionSetGameScore> = (
  action$: Observable<IActionSetGameScore>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
): Observable<IActionSetGameScore> => {
  const { authorization, botToken, locales, requestsObservable } = dependencies;

  const actionObservable: (
    action: IActionSetGameScore
  ) => Observable<IActionSetGameScore> = (
    action: IActionSetGameScore
  ): Observable<IActionSetGameScore> => {
    if (action.setGameScore.query === undefined) {
      return of(
        actions.setGameScore.error({
          error: new Error(locales.find("actionSetGameScoreQueryUndefined"))
        })
      );
    }

    return requestsObservable<IResponse>(
      {
        host: "api.telegram.org",
        method: "POST",
        path: `/bot${botToken}/setGameScore`
      },
      action.setGameScore.query
    ).pipe(
      map(
        (response: IResponse): IActionSetGameScore => {
          if (response.ok) {
            return actions.setGameScore.result({
              result: response.result as IMessage
            });
          }

          return actions.setGameScore.error({
            error: response
          });
        }
      ),
      catchError((error: any) =>
        of(
          actions.setGameScore.error({
            error
          })
        )
      )
    );
  };

  return action$.pipe(
    ofType(actions.setGameScore.SET_GAME_SCORE_QUERY),
    filterAsync((action: IActionSetGameScore, index: number) =>
      authorization(state$, dependencies, action, index)
    ),
    switchMap(actionObservable)
  );
};

export { setGameScore };
