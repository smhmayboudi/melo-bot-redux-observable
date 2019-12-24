import { ofType, StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { IActionDeleteChatStickerSet } from "../../types/iActionDeleteChatStickerSet";
import { IDependencies } from "../../types/iDependencies";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import * as actions from "../actions";
import { filterAsync } from "../libs/filterAsync";

const deleteChatStickerSet: (
  action$: Observable<IActionDeleteChatStickerSet>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => Observable<IActionDeleteChatStickerSet> = (
  action$: Observable<IActionDeleteChatStickerSet>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
): Observable<IActionDeleteChatStickerSet> => {
  const { authorization, botToken, locales, requestsObservable } = dependencies;

  const actionObservable: (
    action: IActionDeleteChatStickerSet
  ) => Observable<IActionDeleteChatStickerSet> = (
    action: IActionDeleteChatStickerSet
  ): Observable<IActionDeleteChatStickerSet> => {
    if (action.deleteChatStickerSet.query === undefined) {
      return of(
        actions.deleteChatStickerSet.error({
          error: new Error(
            locales.find("actionDeleteChatStickerSetQueryUndefined")
          )
        })
      );
    }

    return requestsObservable<IResponse>(
      {
        host: "api.telegram.org",
        method: "POST",
        path: `/bot${botToken}/deleteChatStickerSet`
      },
      action.deleteChatStickerSet.query
    ).pipe(
      map(
        (response: IResponse): IActionDeleteChatStickerSet => {
          if (response.ok) {
            return actions.deleteChatStickerSet.result({
              result: response.result as boolean
            });
          }

          return actions.deleteChatStickerSet.error({
            error: response
          });
        }
      ),
      catchError((error: any) =>
        of(
          actions.deleteChatStickerSet.error({
            error
          })
        )
      )
    );
  };

  return action$.pipe(
    ofType(actions.deleteChatStickerSet.DELETE_CHAT_STICKER_SET_QUERY),
    filterAsync((action: IActionDeleteChatStickerSet, index: number) =>
      authorization(action, state$, index)
    ),
    switchMap(actionObservable)
  );
};

export { deleteChatStickerSet };
