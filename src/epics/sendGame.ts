import { ofType, StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { IActionSendGame } from "../../types/iActionSendGame";
import { IDependencies } from "../../types/iDependencies";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import { IMessage } from "../../types/telegramBot/types/iMessage";
import * as actions from "../actions";
import * as texts from "../configs/texts";

const sendGame: (
  action$: Observable<IActionSendGame>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => Observable<IActionSendGame> = (
  action$: Observable<IActionSendGame>,
  _state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
): Observable<IActionSendGame> => {
  const { botToken, requestsObservable } = dependencies;

  const actionObservable: (
    action: IActionSendGame
  ) => Observable<IActionSendGame> = (
    action: IActionSendGame
  ): Observable<IActionSendGame> => {
    if (botToken === undefined) {
      return of(
        actions.sendGame.error({
          error: new Error(texts.epicDependencyBotTokenUndefined)
        })
      );
    }
    if (requestsObservable === undefined) {
      return of(
        actions.sendGame.error({
          error: new Error(texts.epicDependencyRequestsObservableUndefined)
        })
      );
    }
    if (action.sendGame.query === undefined) {
      return of(
        actions.sendGame.error({
          error: new Error(texts.actionSendGameQueryUndefined)
        })
      );
    }

    return requestsObservable(
      {
        host: "api.telegram.org",
        method: "POST",
        path: `/bot${botToken}/sendGame`
      },
      action.sendGame.query
    ).pipe(
      map(
        (response: IResponse): IActionSendGame => {
          if (response.ok) {
            return actions.sendGame.result({
              result: response.result as IMessage
            });
          }

          return actions.sendGame.error({
            error: response
          });
        }
      ),
      catchError((error: any) =>
        of(
          actions.sendGame.error({
            error
          })
        )
      )
    );
  };

  return action$.pipe(
    ofType(actions.sendGame.SEND_GAME_QUERY),
    switchMap(actionObservable)
  );
};

export { sendGame };
