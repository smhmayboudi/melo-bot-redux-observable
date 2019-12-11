import { ofType, StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { IActionSendPhoto } from "../../types/iActionSendPhoto";
import { IDependencies } from "../../types/iDependencies";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import { IMessage } from "../../types/telegramBot/types/iMessage";
import * as actions from "../actions";
import { transformSendPhotoQuery } from "../utils/formData";

const sendPhoto: (
  action$: Observable<IActionSendPhoto>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => Observable<IActionSendPhoto> = (
  action$: Observable<IActionSendPhoto>,
  _state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
): Observable<IActionSendPhoto> => {
  const { botToken, locales, requestsUploadObservable } = dependencies;

  const actionObservable: (
    action: IActionSendPhoto
  ) => Observable<IActionSendPhoto> = (
    action: IActionSendPhoto
  ): Observable<IActionSendPhoto> => {
    if (action.sendPhoto.query === undefined) {
      return of(
        actions.sendPhoto.error({
          error: new Error(locales.find("actionSendPhotoQueryUndefined"))
        })
      );
    }

    return requestsUploadObservable<IResponse>(
      {
        host: "api.telegram.org",
        method: "POST",
        path: `/bot${botToken}/sendPhoto`
      },
      transformSendPhotoQuery(action.sendPhoto.query)
    ).pipe(
      map(
        (response: IResponse): IActionSendPhoto => {
          if (response.ok) {
            return actions.sendPhoto.result({
              result: response.result as IMessage
            });
          }

          return actions.sendPhoto.error({
            error: response
          });
        }
      ),
      catchError((error: any) =>
        of(
          actions.sendPhoto.error({
            error
          })
        )
      )
    );
  };

  return action$.pipe(
    ofType(actions.sendPhoto.SEND_PHOTO_QUERY),
    switchMap(actionObservable)
  );
};

export { sendPhoto };
