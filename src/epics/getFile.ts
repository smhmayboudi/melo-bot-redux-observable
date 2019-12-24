import { ofType, StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { IActionGetFile } from "../../types/iActionGetFile";
import { IDependencies } from "../../types/iDependencies";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import { IFile } from "../../types/telegramBot/types/iFile";
import * as actions from "../actions";
import { filterAsync } from "../libs/filterAsync";

const getFile: (
  action$: Observable<IActionGetFile>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => Observable<IActionGetFile> = (
  action$: Observable<IActionGetFile>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
): Observable<IActionGetFile> => {
  const { authorization, botToken, locales, requestsObservable } = dependencies;

  const actionObservable: (
    action: IActionGetFile
  ) => Observable<IActionGetFile> = (
    action: IActionGetFile
  ): Observable<IActionGetFile> => {
    if (action.getFile.query === undefined) {
      return of(
        actions.getFile.error({
          error: new Error(locales.find("actionGetFileQueryUndefined"))
        })
      );
    }

    return requestsObservable<IResponse>(
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
              result: response.result as IFile
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
    filterAsync((action: IActionGetFile, index: number) =>
      authorization(action, state$, index)
    ),
    switchMap(actionObservable)
  );
};

export { getFile };
