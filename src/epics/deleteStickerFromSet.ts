import { ofType, StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { IActionDeleteStickerFromSet } from "../../types/iActionDeleteStickerFromSet";
import { IDependencies } from "../../types/iDependencies";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import * as actions from "../actions";
import * as texts from "../configs/texts";

const deleteStickerFromSet: (
  action$: Observable<IActionDeleteStickerFromSet>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => Observable<IActionDeleteStickerFromSet> = (
  action$: Observable<IActionDeleteStickerFromSet>,
  _state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
): Observable<IActionDeleteStickerFromSet> => {
  const { botToken, requestsObservable } = dependencies;

  const actionObservable: (
    action: IActionDeleteStickerFromSet
  ) => Observable<IActionDeleteStickerFromSet> = (
    action: IActionDeleteStickerFromSet
  ): Observable<IActionDeleteStickerFromSet> => {
    if (botToken === undefined) {
      return of(
        actions.deleteStickerFromSet.error({
          error: new Error(texts.epicDependencyBotTokenUndefined)
        })
      );
    }
    if (requestsObservable === undefined) {
      return of(
        actions.deleteStickerFromSet.error({
          error: new Error(texts.epicDependencyRequestsObservableUndefined)
        })
      );
    }
    if (action.deleteStickerFromSet.query === undefined) {
      return of(
        actions.deleteStickerFromSet.error({
          error: new Error(texts.actionDeleteStickerFromSetQueryUndefined)
        })
      );
    }

    return requestsObservable<IResponse>(
      {
        host: "api.telegram.org",
        method: "POST",
        path: `/bot${botToken}/deleteStickerFromSet`
      },
      action.deleteStickerFromSet.query
    ).pipe(
      map(
        (response: IResponse): IActionDeleteStickerFromSet => {
          if (response.ok) {
            return actions.deleteStickerFromSet.result({
              result: response.result as boolean
            });
          }

          return actions.deleteStickerFromSet.error({
            error: response
          });
        }
      ),
      catchError((error: any) =>
        of(
          actions.deleteStickerFromSet.error({
            error
          })
        )
      )
    );
  };

  return action$.pipe(
    ofType(actions.deleteStickerFromSet.DELETE_STICKER_FROM_SET_QUERY),
    switchMap(actionObservable)
  );
};

export { deleteStickerFromSet };
