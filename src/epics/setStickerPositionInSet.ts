import { ofType, StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { IActionSetStickerPositionInSet } from "../../types/iActionSetStickerPositionInSet";
import { IDependencies } from "../../types/iDependencies";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import * as actions from "../actions";
import * as texts from "../configs/texts";

const setStickerPositionInSet: (
  action$: Observable<IActionSetStickerPositionInSet>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => Observable<IActionSetStickerPositionInSet> = (
  action$: Observable<IActionSetStickerPositionInSet>,
  _state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
): Observable<IActionSetStickerPositionInSet> => {
  const { botToken, requestsObservable } = dependencies;

  const actionObservable: (
    action: IActionSetStickerPositionInSet
  ) => Observable<IActionSetStickerPositionInSet> = (
    action: IActionSetStickerPositionInSet
  ): Observable<IActionSetStickerPositionInSet> => {
    if (botToken === undefined) {
      return of(
        actions.setStickerPositionInSet.error({
          error: new Error(texts.epicDependencyBotTokenUndefined)
        })
      );
    }
    if (requestsObservable === undefined) {
      return of(
        actions.setStickerPositionInSet.error({
          error: new Error(texts.epicDependencyRequestsObservableUndefined)
        })
      );
    }
    if (action.setStickerPositionInSet.query === undefined) {
      return of(
        actions.setStickerPositionInSet.error({
          error: new Error(texts.actionSetStickerPositionInSetQueryUndefined)
        })
      );
    }

    return requestsObservable(
      {
        host: "api.telegram.org",
        method: "POST",
        path: `/bot${botToken}/setStickerPositionInSet`
      },
      action.setStickerPositionInSet.query
    ).pipe(
      map(
        (response: IResponse): IActionSetStickerPositionInSet => {
          if (response.ok) {
            return actions.setStickerPositionInSet.result({
              result: response.result as boolean
            });
          }

          return actions.setStickerPositionInSet.error({
            error: response
          });
        }
      ),
      catchError((error: any) =>
        of(
          actions.setStickerPositionInSet.error({
            error
          })
        )
      )
    );
  };

  return action$.pipe(
    ofType(actions.setStickerPositionInSet.SET_STICKER_POSITION_IN_SET_QUERY),
    switchMap(actionObservable)
  );
};

export { setStickerPositionInSet };
