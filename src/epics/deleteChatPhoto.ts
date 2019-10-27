import { ofType, StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { IActionDeleteChatPhoto } from "../../types/iActionDeleteChatPhoto";
import { IDependencies } from "../../types/iDependencies";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import * as actions from "../actions";
import * as texts from "../configs/texts";

const deleteChatPhoto: (
  action$: Observable<IActionDeleteChatPhoto>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => Observable<IActionDeleteChatPhoto> = (
  action$: Observable<IActionDeleteChatPhoto>,
  _state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
): Observable<IActionDeleteChatPhoto> => {
  const { botToken, requestsObservable } = dependencies;

  const actionObservable: (
    action: IActionDeleteChatPhoto
  ) => Observable<IActionDeleteChatPhoto> = (
    action: IActionDeleteChatPhoto
  ): Observable<IActionDeleteChatPhoto> => {
    if (botToken === undefined) {
      return of(
        actions.deleteChatPhoto.error({
          error: new Error(texts.epicDependencyBotTokenUndefined)
        })
      );
    }
    if (requestsObservable === undefined) {
      return of(
        actions.deleteChatPhoto.error({
          error: new Error(texts.epicDependencyRequestsObservableUndefined)
        })
      );
    }
    if (action.deleteChatPhoto.query === undefined) {
      return of(
        actions.deleteChatPhoto.error({
          error: new Error(texts.actionDeleteChatPhotoQueryUndefined)
        })
      );
    }

    return requestsObservable(
      {
        host: "api.telegram.org",
        method: "POST",
        path: `/bot${botToken}/deleteChatPhoto`
      },
      action.deleteChatPhoto.query
    ).pipe(
      map(
        (response: IResponse): IActionDeleteChatPhoto => {
          if (response.ok) {
            return actions.deleteChatPhoto.result({
              // TODO: check it
              result: response.result as boolean
            });
          }

          return actions.deleteChatPhoto.error({
            error: response
          });
        }
      ),
      catchError((error: any) =>
        of(
          actions.deleteChatPhoto.error({
            error
          })
        )
      )
    );
  };

  return action$.pipe(
    ofType(actions.deleteChatPhoto.DELETE_CHAT_PHOTO_QUERY),
    switchMap(actionObservable)
  );
};

export { deleteChatPhoto };
