import { ofType, StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { IActionCreateNewStickerSet } from "../../types/iActionCreateNewStickerSet";
import { IDependencies } from "../../types/iDependencies";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import * as actions from "../actions";
import * as texts from "../configs/texts";

const createNewStickerSet: (
  action$: Observable<IActionCreateNewStickerSet>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => Observable<IActionCreateNewStickerSet> = (
  action$: Observable<IActionCreateNewStickerSet>,
  _state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
): Observable<IActionCreateNewStickerSet> => {
  const { botToken, requestsObservable } = dependencies;

  const actionObservable: (
    action: IActionCreateNewStickerSet
  ) => Observable<IActionCreateNewStickerSet> = (
    action: IActionCreateNewStickerSet
  ): Observable<IActionCreateNewStickerSet> => {
    if (botToken === undefined) {
      return of(
        actions.createNewStickerSet.error({
          error: new Error(texts.epicDependencyBotTokenUndefined)
        })
      );
    }
    if (requestsObservable === undefined) {
      return of(
        actions.createNewStickerSet.error({
          error: new Error(texts.epicDependencyRequestsObservableUndefined)
        })
      );
    }
    if (action.createNewStickerSet.query === undefined) {
      return of(
        actions.createNewStickerSet.error({
          error: new Error(texts.actionCreateNewStickerSetQueryUndefined)
        })
      );
    }

    return requestsObservable(
      {
        host: "api.telegram.org",
        method: "POST",
        path: `/bot${botToken}/createNewStickerSet`
      },
      action.createNewStickerSet.query
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
    switchMap(actionObservable)
  );
};

export { createNewStickerSet };
