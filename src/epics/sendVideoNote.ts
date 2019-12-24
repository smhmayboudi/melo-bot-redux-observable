import { ofType, StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { IActionSendVideoNote } from "../../types/iActionSendVideoNote";
import { IDependencies } from "../../types/iDependencies";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import { IMessage } from "../../types/telegramBot/types/iMessage";
import * as actions from "../actions";
import { filterAsync } from "../libs/filterAsync";
import { transformSendVideoNoteQuery } from "../utils/formData";

const sendVideoNote: (
  action$: Observable<IActionSendVideoNote>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => Observable<IActionSendVideoNote> = (
  action$: Observable<IActionSendVideoNote>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
): Observable<IActionSendVideoNote> => {
  const {
    authorization,
    botToken,
    locales,
    requestsUploadObservable
  } = dependencies;

  const actionObservable: (
    action: IActionSendVideoNote
  ) => Observable<IActionSendVideoNote> = (
    action: IActionSendVideoNote
  ): Observable<IActionSendVideoNote> => {
    if (action.sendVideoNote.query === undefined) {
      return of(
        actions.sendVideoNote.error({
          error: new Error(locales.find("actionSendVideoNoteQueryUndefined"))
        })
      );
    }

    return requestsUploadObservable<IResponse>(
      {
        host: "api.telegram.org",
        method: "POST",
        path: `/bot${botToken}/sendVideoNote`
      },
      transformSendVideoNoteQuery(action.sendVideoNote.query)
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
    filterAsync((action: IActionSendVideoNote, index: number) =>
      authorization(action, state$, index)
    ),
    switchMap(actionObservable)
  );
};

export { sendVideoNote };
