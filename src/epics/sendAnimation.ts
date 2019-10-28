import { ofType, StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { IActionSendAnimation } from "../../types/iActionSendAnimation";
import { IDependencies } from "../../types/iDependencies";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import * as actions from "../actions";
import * as texts from "../configs/texts";

const sendAnimation: (
  action$: Observable<IActionSendAnimation>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => Observable<IActionSendAnimation> = (
  action$: Observable<IActionSendAnimation>,
  _state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
): Observable<IActionSendAnimation> => {
  const { botToken, requestsObservable } = dependencies;

  const actionObservable: (
    action: IActionSendAnimation
  ) => Observable<IActionSendAnimation> = (
    action: IActionSendAnimation
  ): Observable<IActionSendAnimation> => {
    if (botToken === undefined) {
      return of(
        actions.sendAnimation.error({
          error: new Error(texts.epicDependencyBotTokenUndefined)
        })
      );
    }
    if (requestsObservable === undefined) {
      return of(
        actions.sendAnimation.error({
          error: new Error(texts.epicDependencyRequestsObservableUndefined)
        })
      );
    }
    if (action.sendAnimation.query === undefined) {
      return of(
        actions.sendAnimation.error({
          error: new Error(texts.actionSendAnimationQueryUndefined)
        })
      );
    }

    return requestsObservable(
      {
        host: "api.telegram.org",
        method: "POST",
        path: `/bot${botToken}/sendAnimation`
      },
      action.sendAnimation.query
    ).pipe(
      map(
        (response: IResponse): IActionSendAnimation => {
          if (response.ok) {
            return actions.sendAnimation.result({
              // TODO: check it
              result: response.result as boolean
            });
          }

          return actions.sendAnimation.error({
            error: response
          });
        }
      ),
      catchError((error: any) =>
        of(
          actions.sendAnimation.error({
            error
          })
        )
      )
    );
  };

  return action$.pipe(
    ofType(actions.sendAnimation.SEND_ANIMATION_QUERY),
    switchMap(actionObservable)
  );
};

export { sendAnimation };