import { ofType, StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { IActionDeleteChatPhoto } from "../../types/iActionDeleteChatPhoto";
import { IDependencies } from "../../types/iDependencies";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import * as actions from "../actions";
import { filterAsync } from "../libs/filterAsync";

const deleteChatPhoto: (
  action$: Observable<IActionDeleteChatPhoto>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => Observable<IActionDeleteChatPhoto> = (
  action$: Observable<IActionDeleteChatPhoto>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
): Observable<IActionDeleteChatPhoto> => {
  const { authorization, botToken, locales, requestsObservable } = dependencies;

  const actionObservable: (
    action: IActionDeleteChatPhoto
  ) => Observable<IActionDeleteChatPhoto> = (
    action: IActionDeleteChatPhoto
  ): Observable<IActionDeleteChatPhoto> => {
    if (action.deleteChatPhoto.query === undefined) {
      return of(
        actions.deleteChatPhoto.error({
          error: new Error(locales.find("actionDeleteChatPhotoQueryUndefined"))
        })
      );
    }

    return requestsObservable<IResponse>(
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
    filterAsync((action: IActionDeleteChatPhoto, index: number) =>
      authorization(state$, dependencies, action, index)
    ),
    switchMap(actionObservable)
  );
};

export { deleteChatPhoto };
