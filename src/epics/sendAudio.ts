import { ofType, StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { IActionSendAudio } from "../../types/iActionSendAudio";
import { IDependencies } from "../../types/iDependencies";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import { IMessage } from "../../types/telegramBot/types/iMessage";
import * as actions from "../actions";
import { filterAsync } from "../libs/filterAsync";
import { transformSendAudioQuery } from "../utils/formData";

const sendAudio: (
  action$: Observable<IActionSendAudio>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => Observable<IActionSendAudio> = (
  action$: Observable<IActionSendAudio>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
): Observable<IActionSendAudio> => {
  const {
    authorization,
    botToken,
    locales,
    requestsUploadObservable
  } = dependencies;

  const actionObservable: (
    action: IActionSendAudio
  ) => Observable<IActionSendAudio> = (
    action: IActionSendAudio
  ): Observable<IActionSendAudio> => {
    if (action.sendAudio.query === undefined) {
      return of(
        actions.sendAudio.error({
          error: new Error(locales.find("actionSendAudioQueryUndefined"))
        })
      );
    }

    return requestsUploadObservable<IResponse>(
      {
        host: "api.telegram.org",
        path: `/bot${botToken}/sendAudio`
      },
      transformSendAudioQuery(action.sendAudio.query)
    ).pipe(
      map(
        (response: IResponse): IActionSendAudio => {
          if (response.ok) {
            return actions.sendAudio.result({
              result: response.result as IMessage
            });
          }

          return actions.sendAudio.error({
            error: response
          });
        }
      ),
      catchError((error: any) =>
        of(
          actions.sendAudio.error({
            error
          })
        )
      )
    );
  };

  return action$.pipe(
    ofType(actions.sendAudio.SEND_AUDIO_QUERY),
    filterAsync((action: IActionSendAudio, index: number) =>
      authorization(state$, dependencies, action, index)
    ),
    switchMap(actionObservable)
  );
};

export { sendAudio };
