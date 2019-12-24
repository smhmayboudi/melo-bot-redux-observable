import { ofType, StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { IActionCreateNewStickerSet } from "../../types/iActionCreateNewStickerSet";
import { IDependencies } from "../../types/iDependencies";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import * as actions from "../actions";
import { filterAsync } from "../libs/filterAsync";
import { transformCreateNewStickerSetQuery } from "../utils/formData";

const createNewStickerSet: (
  action$: Observable<IActionCreateNewStickerSet>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => Observable<IActionCreateNewStickerSet> = (
  action$: Observable<IActionCreateNewStickerSet>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
): Observable<IActionCreateNewStickerSet> => {
  const {
    authorization,
    botToken,
    locales,
    requestsUploadObservable
  } = dependencies;

  const actionObservable: (
    action: IActionCreateNewStickerSet
  ) => Observable<IActionCreateNewStickerSet> = (
    action: IActionCreateNewStickerSet
  ): Observable<IActionCreateNewStickerSet> => {
    if (action.createNewStickerSet.query === undefined) {
      return of(
        actions.createNewStickerSet.error({
          error: new Error(
            locales.find("actionCreateNewStickerSetQueryUndefined")
          )
        })
      );
    }

    return requestsUploadObservable<IResponse>(
      {
        host: "api.telegram.org",
        method: "POST",
        path: `/bot${botToken}/createNewStickerSet`
      },
      transformCreateNewStickerSetQuery(action.createNewStickerSet.query)
    ).pipe(
      map(
        (response: IResponse): IActionCreateNewStickerSet => {
          if (response.ok) {
            return actions.createNewStickerSet.result({
              result: response.result as boolean
            });
          }

          return actions.createNewStickerSet.error({
            error: response
          });
        }
      ),
      catchError((error: any) =>
        of(
          actions.createNewStickerSet.error({
            error
          })
        )
      )
    );
  };

  return action$.pipe(
    ofType(actions.createNewStickerSet.CREATE_NEW_STICKER_SET_QUERY),
    filterAsync((action: IActionCreateNewStickerSet, index: number) =>
      authorization(action, state$, index)
    ),
    switchMap(actionObservable)
  );
};

export { createNewStickerSet };
