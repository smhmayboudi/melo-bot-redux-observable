import { ofType, StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { IActionAddStickerToSet } from "../../types/iActionAddStickerToSet";
import { IDependencies } from "../../types/iDependencies";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import * as actions from "../actions";
import * as texts from "../configs/texts";
import { transformAddStickerToSetQuery } from "../utils/formData";

const addStickerToSet: (
  action$: Observable<IActionAddStickerToSet>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => Observable<IActionAddStickerToSet> = (
  action$: Observable<IActionAddStickerToSet>,
  _state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
): Observable<IActionAddStickerToSet> => {
  const { botToken, requestsUploadObservable } = dependencies;

  const actionObservable: (
    action: IActionAddStickerToSet
  ) => Observable<IActionAddStickerToSet> = (
    action: IActionAddStickerToSet
  ): Observable<IActionAddStickerToSet> => {
    if (botToken === undefined) {
      return of(
        actions.addStickerToSet.error({
          error: new Error(texts.epicDependencyBotTokenUndefined)
        })
      );
    }
    if (requestsUploadObservable === undefined) {
      return of(
        actions.addStickerToSet.error({
          error: new Error(
            texts.epicDependencyRequestsUploadObservableUndefined
          )
        })
      );
    }
    if (action.addStickerToSet.query === undefined) {
      return of(
        actions.addStickerToSet.error({
          error: new Error(texts.actionAddStickerToSetQueryUndefined)
        })
      );
    }

    return requestsUploadObservable(
      {
        host: "api.telegram.org",
        method: "POST",
        path: `/bot${botToken}/addStickerToSet`
      },
      transformAddStickerToSetQuery(action.addStickerToSet.query)
    ).pipe(
      map(
        (response: IResponse): IActionAddStickerToSet => {
          if (response.ok) {
            return actions.addStickerToSet.result({
              result: response.result as boolean
            });
          }

          return actions.addStickerToSet.error({
            error: response
          });
        }
      ),
      catchError((error: any) =>
        of(
          actions.addStickerToSet.error({
            error
          })
        )
      )
    );
  };

  return action$.pipe(
    ofType(actions.addStickerToSet.ADD_STICKER_TO_SET_QUERY),
    switchMap(actionObservable)
  );
};

export { addStickerToSet };
