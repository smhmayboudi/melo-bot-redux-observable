import { ofType, StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { IActionSendVoice } from "../../types/iActionSendVoice";
import { IDependencies } from "../../types/iDependencies";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import { IMessage } from "../../types/telegramBot/types/iMessage";
import * as actions from "../actions";
import { transformSendVoiceQuery } from "../utils/formData";

const sendVoice: (
  action$: Observable<IActionSendVoice>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => Observable<IActionSendVoice> = (
  action$: Observable<IActionSendVoice>,
  _state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
): Observable<IActionSendVoice> => {
  const { botToken, locales, requestsUploadObservable } = dependencies;

  const actionObservable: (
    action: IActionSendVoice
  ) => Observable<IActionSendVoice> = (
    action: IActionSendVoice
  ): Observable<IActionSendVoice> => {
    if (action.sendVoice.query === undefined) {
      return of(
        actions.sendVoice.error({
          error: new Error(locales.find("actionSendVoiceQueryUndefined"))
        })
      );
    }

    return requestsUploadObservable<IResponse>(
      {
        host: "api.telegram.org",
        method: "POST",
        path: `/bot${botToken}/sendVoice`
      },
      transformSendVoiceQuery(action.sendVoice.query)
    ).pipe(
      map(
        (response: IResponse): IActionSendVoice => {
          if (response.ok) {
            return actions.sendVoice.result({
              result: response.result as IMessage
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
