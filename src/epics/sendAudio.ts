import FormData from "form-data";
import { ofType, StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { IActionSendAudio } from "../../types/iActionSendAudio";
import { IDependencies } from "../../types/iDependencies";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import { IStateSendAudioQuery } from "../../types/iStateSendAudioQuery";
import { IMessage } from "../../types/telegramBot/types/iMessage";
import * as actions from "../actions";
import * as texts from "../configs/texts";

const sendAudio: (
  action$: Observable<IActionSendAudio>,
  _state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => Observable<IActionSendAudio> = (
  action$: Observable<IActionSendAudio>,
  _state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
): Observable<IActionSendAudio> => {
  const transform: (query: IStateSendAudioQuery) => FormData = (
    query: IStateSendAudioQuery
  ): FormData => {
    const formData: FormData = new FormData();
    formData.append("audio", query.audio);
    if (query.caption !== undefined) {
      formData.append("caption", query.caption);
    }
    formData.append("chat_id", query.chat_id);
    if (query.disable_notification !== undefined) {
      formData.append("disable_notification", `${query.disable_notification}`);
    }
    if (query.duration !== undefined) {
      formData.append("duration", `${query.duration}`);
    }
    if (query.parse_mode !== undefined) {
      formData.append("parse_mode", `${query.parse_mode}`);
    }
    if (query.performer !== undefined) {
      formData.append("performer", `${query.performer}`);
    }
    if (query.reply_markup !== undefined) {
      formData.append("reply_markup", JSON.stringify(query.reply_markup));
    }
    if (query.reply_to_message_id !== undefined) {
      formData.append("reply_to_message_id", query.reply_to_message_id);
    }
    if (query.thumb !== undefined) {
      formData.append("thumb", `${String(query.thumb)}`);
    }
    if (query.title !== undefined) {
      formData.append("title", query.title);
    }

    return formData;
  };

  const { botToken, requestsUploadObservable } = dependencies;

  const actionObservable: (
    action: IActionSendAudio
  ) => Observable<IActionSendAudio> = (
    action: IActionSendAudio
  ): Observable<IActionSendAudio> => {
    if (botToken === undefined) {
      return of(
        actions.sendAudio.error({
          error: new Error(texts.epicDependencyBotTokenUndefined)
        })
      );
    }
    if (requestsUploadObservable === undefined) {
      return of(
        actions.sendAudio.error({
          error: new Error(
            texts.epicDependencyRequestsUploadObservableUndefined
          )
        })
      );
    }
    if (action.sendAudio.query === undefined) {
      return of(
        actions.sendAudio.error({
          error: new Error(texts.actionSendAudioQueryUndefined)
        })
      );
    }

    return requestsUploadObservable(
      {
        host: "api.telegram.org",
        path: `/bot${botToken}/sendAudio`
      },
      transform(action.sendAudio.query)
    ).pipe(
      map(
        (response: IResponse): IActionSendAudio => {
          if (response.ok && response.result !== undefined) {
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
    switchMap(actionObservable)
  );
};

export { sendAudio };
