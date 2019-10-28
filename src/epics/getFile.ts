import { ofType, StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { IActionGetFile } from "../../types/iActionGetFile";
import { IDependencies } from "../../types/iDependencies";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import * as actions from "../actions";
import * as texts from "../configs/texts";

const getFile: (
  action$: Observable<IActionGetFile>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => Observable<IActionGetFile> = (
  action$: Observable<IActionGetFile>,
  _state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
): Observable<IActionGetFile> => {
  const { botToken, requestsObservable } = dependencies;

  const actionObservable: (
    action: IActionGetFile
  ) => Observable<IActionGetFile> = (
    action: IActionGetFile
  ): Observable<IActionGetFile> => {
    if (botToken === undefined) {
      return of(
        actions.getFile.error({
          error: new Error(texts.epicDependencyBotTokenUndefined)
        })
      );
    }
    if (requestsObservable === undefined) {
      return of(
        actions.getFile.error({
          error: new Error(texts.epicDependencyRequestsObservableUndefined)
        })
      );
    }
    if (action.getFile.query === undefined) {
      return of(
        actions.getFile.error({
          error: new Error(texts.actionGetFileQueryUndefined)
        })
      );
    }

    return requestsObservable(
      {
        host: "api.telegram.org",
        method: "POST",
        path: `/bot${botToken}/getFile`
      },
      action.getFile.query
    ).pipe(
      map(
        (response: IResponse): IActionGetFile => {
          if (response.ok) {
            return actions.getFile.result({
              // TODO: check it
              result: response.result as boolean
            });
          }

          return actions.getFile.error({
            error: response
          });
        }
      ),
      catchError((error: any) =>
        of(
          actions.getFile.error({
            error
          })
        )
      )
    );
  };

  return action$.pipe(
    ofType(actions.getFile.GET_FILE_QUERY),
    switchMap(actionObservable)
  );
};

export { getFile };