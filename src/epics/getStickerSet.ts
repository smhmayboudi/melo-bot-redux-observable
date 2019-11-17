import { ofType, StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { IActionGetStickerSet } from "../../types/iActionGetStickerSet";
import { IDependencies } from "../../types/iDependencies";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import { IStickerSet } from "../../types/telegramBot/stickers/iStickerSet";
import * as actions from "../actions";
import * as texts from "../configs/texts";

const getStickerSet: (
  action$: Observable<IActionGetStickerSet>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => Observable<IActionGetStickerSet> = (
  action$: Observable<IActionGetStickerSet>,
  _state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
): Observable<IActionGetStickerSet> => {
  const { botToken, requestsObservable } = dependencies;

  const actionObservable: (
    action: IActionGetStickerSet
  ) => Observable<IActionGetStickerSet> = (
    action: IActionGetStickerSet
  ): Observable<IActionGetStickerSet> => {
    if (botToken === undefined) {
      return of(
        actions.getStickerSet.error({
          error: new Error(texts.epicDependencyBotTokenUndefined)
        })
      );
    }
    if (requestsObservable === undefined) {
      return of(
        actions.getStickerSet.error({
          error: new Error(texts.epicDependencyRequestsObservableUndefined)
        })
      );
    }
    if (action.getStickerSet.query === undefined) {
      return of(
        actions.getStickerSet.error({
          error: new Error(texts.actionGetStickerSetQueryUndefined)
        })
      );
    }

    return requestsObservable<IResponse>(
      {
        host: "api.telegram.org",
        method: "POST",
        path: `/bot${botToken}/getStickerSet`
      },
      action.getStickerSet.query
    ).pipe(
      map(
        (response: IResponse): IActionGetStickerSet => {
          if (response.ok) {
            return actions.getStickerSet.result({
              result: response.result as IStickerSet
            });
          }

          return actions.getStickerSet.error({
            error: response
          });
        }
      ),
      catchError((error: any) =>
        of(
          actions.getStickerSet.error({
            error
          })
        )
      )
    );
  };

  return action$.pipe(
    ofType(actions.getStickerSet.GET_STICKER_SET_QUERY),
    switchMap(actionObservable)
  );
};

export { getStickerSet };
