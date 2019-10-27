import { ofType, StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { IActionEditMessageReplyMarkup } from "../../types/iActionEditMessageReplyMarkup";
import { IDependencies } from "../../types/iDependencies";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import { IMessage } from "../../types/telegramBot/types/iMessage";
import * as actions from "../actions";
import * as texts from "../configs/texts";

const editMessageReplyMarkup: (
  action$: Observable<IActionEditMessageReplyMarkup>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => Observable<IActionEditMessageReplyMarkup> = (
  action$: Observable<IActionEditMessageReplyMarkup>,
  _state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
): Observable<IActionEditMessageReplyMarkup> => {
  const { botToken, requestsObservable } = dependencies;

  const actionObservable: (
    action: IActionEditMessageReplyMarkup
  ) => Observable<IActionEditMessageReplyMarkup> = (
    action: IActionEditMessageReplyMarkup
  ): Observable<IActionEditMessageReplyMarkup> => {
    if (botToken === undefined) {
      return of(
        actions.editMessageReplyMarkup.error({
          error: new Error(texts.epicDependencyBotTokenUndefined)
        })
      );
    }
    if (requestsObservable === undefined) {
      return of(
        actions.editMessageReplyMarkup.error({
          error: new Error(texts.epicDependencyRequestsObservableUndefined)
        })
      );
    }
    if (action.editMessageReplyMarkup.query === undefined) {
      return of(
        actions.editMessageReplyMarkup.error({
          error: new Error(texts.actionEditMessageReplyMarkupQueryUndefined)
        })
      );
    }

    return requestsObservable(
      {
        host: "api.telegram.org",
        method: "POST",
        path: `/bot${botToken}/editMessageReplyMarkup`
      },
      action.editMessageReplyMarkup.query
    ).pipe(
      map(
        (response: IResponse): IActionEditMessageReplyMarkup => {
          if (response.ok) {
            return actions.editMessageReplyMarkup.result({
              result: response.result as IMessage
            });
          }

          return actions.editMessageReplyMarkup.error({
            error: response
          });
        }
      ),
      catchError((error: any) =>
        of(
          actions.editMessageReplyMarkup.error({
            error
          })
        )
      )
    );
  };

  return action$.pipe(
    ofType(actions.editMessageReplyMarkup.EDIT_MESSAGE_REPLY_MARKUP_QUERY),
    switchMap(actionObservable)
  );
};

export { editMessageReplyMarkup };
