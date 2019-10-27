import { ofType, StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { IActionSendVoice } from "../../types/iActionSendVoice";
import { IDependencies } from "../../types/iDependencies";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import * as actions from "../actions";
import * as texts from "../configs/texts";

const sendVoice: (
  action$: Observable<IActionSendVoice>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => Observable<IActionSendVoice> = (
  action$: Observable<IActionSendVoice>,
  _state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
): Observable<IActionSendVoice> => {
  const { botToken, requestsObservable } = dependencies;

  const actionObservable: (
    action: IActionSendVoice
  ) => Observable<IActionSendVoice> = (
    action: IActionSendVoice
  ): Observable<IActionSendVoice> => {
    if (botToken === undefined) {
      return of(
        actions.sendVoice.error({
          error: new Error(texts.epicDependencyBotTokenUndefined)
        })
      );
    }
    if (requestsObservable === undefined) {
      return of(
        actions.sendVoice.error({
          error: new Error(texts.epicDependencyRequestsObservableUndefined)
        })
      );
    }
    if (action.sendVoice.query === undefined) {
      return of(
        actions.sendVoice.error({
          error: new Error(texts.actionSendVoiceQueryUndefined)
        })
      );
    }

    return requestsObservable(
      {
        host: "api.telegram.org",
        method: "POST",
        path: `/bot${botToken}/sendVoice`
      },
      action.sendVoice.query
    ).pipe(
      map(
        (response: IResponse): IActionSendVoice => {
          if (response.ok) {
            return actions.sendVoice.result({
              // TODO: check it
              result: response.result as boolean
            });
          }

          return actions.sendVoice.error({
            error: response
          });
        }
      ),
      catchError((error: any) =>
        of(
          actions.sendVoice.error({
            error
          })
        )
      )
    );
  };

  return action$.pipe(
    ofType(actions.sendVoice.SEND_VOICE_QUERY),
    switchMap(actionObservable)
  );
};

export { sendVoice };
