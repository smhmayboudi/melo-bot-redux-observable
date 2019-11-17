import { ofType, StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { IActionGetGameHighScores } from "../../types/iActionGetGameHighScores";
import { IDependencies } from "../../types/iDependencies";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import { IGameHighScore } from "../../types/telegramBot/games/iGameHighScore";
import * as actions from "../actions";
import * as texts from "../configs/texts";

const getGameHighScores: (
  action$: Observable<IActionGetGameHighScores>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => Observable<IActionGetGameHighScores> = (
  action$: Observable<IActionGetGameHighScores>,
  _state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
): Observable<IActionGetGameHighScores> => {
  const { botToken, requestsObservable } = dependencies;

  const actionObservable: (
    action: IActionGetGameHighScores
  ) => Observable<IActionGetGameHighScores> = (
    action: IActionGetGameHighScores
  ): Observable<IActionGetGameHighScores> => {
    if (botToken === undefined) {
      return of(
        actions.getGameHighScores.error({
          error: new Error(texts.epicDependencyBotTokenUndefined)
        })
      );
    }
    if (requestsObservable === undefined) {
      return of(
        actions.getGameHighScores.error({
          error: new Error(texts.epicDependencyRequestsObservableUndefined)
        })
      );
    }
    if (action.getGameHighScores.query === undefined) {
      return of(
        actions.getGameHighScores.error({
          error: new Error(texts.actionGetGameHighScoresQueryUndefined)
        })
      );
    }

    return requestsObservable<IResponse>(
      {
        host: "api.telegram.org",
        method: "POST",
        path: `/bot${botToken}/getGameHighScores`
      },
      action.getGameHighScores.query
    ).pipe(
      map(
        (response: IResponse): IActionGetGameHighScores => {
          if (response.ok) {
            return actions.getGameHighScores.result({
              result: response.result as IGameHighScore[]
            });
          }

          return actions.getGameHighScores.error({
            error: response
          });
        }
      ),
      catchError((error: any) =>
        of(
          actions.getGameHighScores.error({
            error
          })
        )
      )
    );
  };

  return action$.pipe(
    ofType(actions.getGameHighScores.GET_GAME_HIGH_SCORES_QUERY),
    switchMap(actionObservable)
  );
};

export { getGameHighScores };
