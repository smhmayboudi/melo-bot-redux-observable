import { ofType, StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { IActionUploadStickerFile } from "../../types/iActionUploadStickerFile";
import { IDependencies } from "../../types/iDependencies";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import { IFile } from "../../types/telegramBot/types/iFile";
import * as actions from "../actions";
import * as texts from "../configs/texts";

const uploadStickerFile: (
  action$: Observable<IActionUploadStickerFile>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => Observable<IActionUploadStickerFile> = (
  action$: Observable<IActionUploadStickerFile>,
  _state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
): Observable<IActionUploadStickerFile> => {
  const { botToken, requestsObservable } = dependencies;

  const actionObservable: (
    action: IActionUploadStickerFile
  ) => Observable<IActionUploadStickerFile> = (
    action: IActionUploadStickerFile
  ): Observable<IActionUploadStickerFile> => {
    if (botToken === undefined) {
      return of(
        actions.uploadStickerFile.error({
          error: new Error(texts.epicDependencyBotTokenUndefined)
        })
      );
    }
    if (requestsObservable === undefined) {
      return of(
        actions.uploadStickerFile.error({
          error: new Error(texts.epicDependencyRequestsObservableUndefined)
        })
      );
    }
    if (action.uploadStickerFile.query === undefined) {
      return of(
        actions.uploadStickerFile.error({
          error: new Error(texts.actionUploadStickerFileQueryUndefined)
        })
      );
    }

    return requestsObservable(
      {
        host: "api.telegram.org",
        method: "POST",
        path: `/bot${botToken}/uploadStickerFile`
      },
      action.uploadStickerFile.query
    ).pipe(
      map(
        (response: IResponse): IActionUploadStickerFile => {
          if (response.ok) {
            return actions.uploadStickerFile.result({
              result: response.result as IFile
            });
          }

          return actions.uploadStickerFile.error({
            error: response
          });
        }
      ),
      catchError((error: any) =>
        of(
          actions.uploadStickerFile.error({
            error
          })
        )
      )
    );
  };

  return action$.pipe(
    ofType(actions.uploadStickerFile.UPLOAD_STICKER_FILE_QUERY),
    switchMap(actionObservable)
  );
};

export { uploadStickerFile };
