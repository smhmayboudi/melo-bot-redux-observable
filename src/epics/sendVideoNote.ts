import { ofType, StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { IActionSendVideoNote } from "../../types/iActionSendVideoNote";
import { IDependencies } from "../../types/iDependencies";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import { IMessage } from "../../types/telegramBot/types/iMessage";
import * as actions from "../actions";
import * as texts from "../configs/texts";

const sendVideoNote: (
  action$: Observable<IActionSendVideoNote>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => Observable<IActionSendVideoNote> = (
  action$: Observable<IActionSendVideoNote>,
  _state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
): Observable<IActionSendVideoNote> => {
  const { botToken, requestsObservable } = dependencies;

  const actionObservable: (
    action: IActionSendVideoNote
  ) => Observable<IActionSendVideoNote> = (
    action: IActionSendVideoNote
  ): Observable<IActionSendVideoNote> => {
    if (botToken === undefined) {
      return of(
        actions.sendVideoNote.error({
          error: new Error(texts.epicDependencyBotTokenUndefined)
        })
      );
    }
    if (requestsObservable === undefined) {
      return of(
        actions.sendVideoNote.error({
          error: new Error(texts.epicDependencyRequestsObservableUndefined)
        })
      );
    }
    if (action.sendVideoNote.query === undefined) {
      return of(
        actions.sendVideoNote.error({
          error: new Error(texts.actionSendVideoNoteQueryUndefined)
        })
      );
    }

    return requestsObservable(
      {
        host: "api.telegram.org",
        method: "POST",
        path: `/bot${botToken}/sendVideoNote`
      },
      action.sendVideoNote.query
    ).pipe(
      map(
        (response: IResponse): IActionSendVideoNote => {
          if (response.ok) {
            return actions.sendVideoNote.result({
              result: response.result as IMessage
            });
          }

          return actions.sendVideoNote.error({
            error: response
          });
        }
      ),
      catchError((error: any) =>
        of(
          actions.sendVideoNote.error({
            error
          })
        )
      )
    );
  };

  return action$.pipe(
    ofType(actions.sendVideoNote.SEND_VIDEO_NOTE_QUERY),
    switchMap(actionObservable)
  );
};

export { sendVideoNote };
