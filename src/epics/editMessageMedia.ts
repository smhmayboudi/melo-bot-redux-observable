import { ofType, StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { IActionEditMessageMedia } from "../../types/iActionEditMessageMedia";
import { IDependencies } from "../../types/iDependencies";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import { IMessage } from "../../types/telegramBot/types/iMessage";
import * as actions from "../actions";
import * as texts from "../configs/texts";

const editMessageMedia: (
  action$: Observable<IActionEditMessageMedia>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => Observable<IActionEditMessageMedia> = (
  action$: Observable<IActionEditMessageMedia>,
  _state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
): Observable<IActionEditMessageMedia> => {
  const { botToken, requestsObservable } = dependencies;

  const actionObservable: (
    action: IActionEditMessageMedia
  ) => Observable<IActionEditMessageMedia> = (
    action: IActionEditMessageMedia
  ): Observable<IActionEditMessageMedia> => {
    if (botToken === undefined) {
      return of(
        actions.editMessageMedia.error({
          error: new Error(texts.epicDependencyBotTokenUndefined)
        })
      );
    }
    if (requestsObservable === undefined) {
      return of(
        actions.editMessageMedia.error({
          error: new Error(texts.epicDependencyRequestsObservableUndefined)
        })
      );
    }
    if (action.editMessageMedia.query === undefined) {
      return of(
        actions.editMessageMedia.error({
          error: new Error(texts.actionEditMessageMediaQueryUndefined)
        })
      );
    }

    return requestsObservable<IResponse>(
      {
        host: "api.telegram.org",
        method: "POST",
        path: `/bot${botToken}/editMessageMedia`
      },
      action.editMessageMedia.query
    ).pipe(
      map(
        (response: IResponse): IActionEditMessageMedia => {
          if (response.ok) {
            return actions.editMessageMedia.result({
              result: response.result as boolean | IMessage
            });
          }

          return actions.editMessageMedia.error({
            error: response
          });
        }
      ),
      catchError((error: any) =>
        of(
          actions.editMessageMedia.error({
            error
          })
        )
      )
    );
  };

  return action$.pipe(
    ofType(actions.editMessageMedia.EDIT_MESSAGE_MEDIA_QUERY),
    switchMap(actionObservable)
  );
};

export { editMessageMedia };
