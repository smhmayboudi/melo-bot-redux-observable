import { ofType, StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { IActionSetChatStickerSet } from "../../types/iActionSetChatStickerSet";
import { IDependencies } from "../../types/iDependencies";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import * as actions from "../actions";
import { filterAsync } from "../libs/filterAsync";

const setChatStickerSet: (
  action$: Observable<IActionSetChatStickerSet>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => Observable<IActionSetChatStickerSet> = (
  action$: Observable<IActionSetChatStickerSet>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
): Observable<IActionSetChatStickerSet> => {
  const { authorization, botToken, locales, requestsObservable } = dependencies;

  const actionObservable: (
    action: IActionSetChatStickerSet
  ) => Observable<IActionSetChatStickerSet> = (
    action: IActionSetChatStickerSet
  ): Observable<IActionSetChatStickerSet> => {
    if (action.setChatStickerSet.query === undefined) {
      return of(
        actions.setChatStickerSet.error({
          error: new Error(
            locales.find("actionSetChatStickerSetQueryUndefined")
          )
        })
      );
    }

    return requestsObservable<IResponse>(
      {
        host: "api.telegram.org",
        method: "POST",
        path: `/bot${botToken}/setChatStickerSet`
      },
      action.setChatStickerSet.query
    ).pipe(
      map(
        (response: IResponse): IActionSetChatStickerSet => {
          if (response.ok) {
            return actions.setChatStickerSet.result({
              result: response.result as boolean
            });
          }

          return actions.setChatStickerSet.error({
            error: response
          });
        }
      ),
      catchError((error: any) =>
        of(
          actions.setChatStickerSet.error({
            error
          })
        )
      )
    );
  };

  return action$.pipe(
    ofType(actions.setChatStickerSet.SET_CHAT_STICKER_SET_QUERY),
    filterAsync((action: IActionSetChatStickerSet, index: number) =>
      authorization(action, state$, index)
    ),
    switchMap(actionObservable)
  );
};

export { setChatStickerSet };
