import { ofType, StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { IActionDeleteChatStickerSet } from "../../types/iActionDeleteChatStickerSet";
import { IDependencies } from "../../types/iDependencies";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import * as actions from "../actions";
import * as texts from "../configs/texts";

const deleteChatStickerSet: (
  action$: Observable<IActionDeleteChatStickerSet>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => Observable<IActionDeleteChatStickerSet> = (
  action$: Observable<IActionDeleteChatStickerSet>,
  _state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
): Observable<IActionDeleteChatStickerSet> => {
  const { botToken, requestsObservable } = dependencies;

  const actionObservable: (
    action: IActionDeleteChatStickerSet
  ) => Observable<IActionDeleteChatStickerSet> = (
    action: IActionDeleteChatStickerSet
  ): Observable<IActionDeleteChatStickerSet> => {
    if (botToken === undefined) {
      return of(
        actions.deleteChatStickerSet.error({
          error: new Error(texts.epicDependencyBotTokenUndefined)
        })
      );
    }
    if (requestsObservable === undefined) {
      return of(
        actions.deleteChatStickerSet.error({
          error: new Error(texts.epicDependencyRequestsObservableUndefined)
        })
      );
    }
    if (action.deleteChatStickerSet.query === undefined) {
      return of(
        actions.deleteChatStickerSet.error({
          error: new Error(texts.actionDeleteChatStickerSetQueryUndefined)
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
    switchMap(actionObservable)
  );
};

export { deleteChatStickerSet };
