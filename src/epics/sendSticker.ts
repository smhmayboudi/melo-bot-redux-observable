import { ofType, StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { IActionSendSticker } from "../../types/iActionSendSticker";
import { IDependencies } from "../../types/iDependencies";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import { IMessage } from "../../types/telegramBot/types/iMessage";
import * as actions from "../actions";
import * as texts from "../configs/texts";

const sendSticker: (
  action$: Observable<IActionSendSticker>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => Observable<IActionSendSticker> = (
  action$: Observable<IActionSendSticker>,
  _state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
): Observable<IActionSendSticker> => {
  const { botToken, requestsObservable } = dependencies;

  const actionObservable: (
    action: IActionSendSticker
  ) => Observable<IActionSendSticker> = (
    action: IActionSendSticker
  ): Observable<IActionSendSticker> => {
    if (botToken === undefined) {
      return of(
        actions.sendSticker.error({
          error: new Error(texts.epicDependencyBotTokenUndefined)
        })
      );
    }
    if (requestsObservable === undefined) {
      return of(
        actions.sendSticker.error({
          error: new Error(texts.epicDependencyRequestsObservableUndefined)
        })
      );
    }
    if (action.sendSticker.query === undefined) {
      return of(
        actions.sendSticker.error({
          error: new Error(texts.actionSendStickerQueryUndefined)
        })
      );
    }

    return requestsObservable(
      {
        host: "api.telegram.org",
        method: "POST",
        path: `/bot${botToken}/sendSticker`
      },
      action.sendSticker.query
    ).pipe(
      map(
        (response: IResponse): IActionSendSticker => {
          if (response.ok) {
            return actions.sendSticker.result({
              result: response.result as IMessage
            });
          }

          return actions.sendSticker.error({
            error: response
          });
        }
      ),
      catchError((error: any) =>
        of(
          actions.sendSticker.error({
            error
          })
        )
      )
    );
  };

  return action$.pipe(
    ofType(actions.sendSticker.SEND_STICKER_QUERY),
    switchMap(actionObservable)
  );
};

export { sendSticker };
