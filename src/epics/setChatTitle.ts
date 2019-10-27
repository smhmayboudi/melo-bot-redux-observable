import { ofType, StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { IActionSetChatTitle } from "../../types/iActionSetChatTitle";
import { IDependencies } from "../../types/iDependencies";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import * as actions from "../actions";
import * as texts from "../configs/texts";

const setChatTitle: (
  action$: Observable<IActionSetChatTitle>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => Observable<IActionSetChatTitle> = (
  action$: Observable<IActionSetChatTitle>,
  _state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
): Observable<IActionSetChatTitle> => {
  const { botToken, requestsObservable } = dependencies;

  const actionObservable: (
    action: IActionSetChatTitle
  ) => Observable<IActionSetChatTitle> = (
    action: IActionSetChatTitle
  ): Observable<IActionSetChatTitle> => {
    if (botToken === undefined) {
      return of(
        actions.setChatTitle.error({
          error: new Error(texts.epicDependencyBotTokenUndefined)
        })
      );
    }
    if (requestsObservable === undefined) {
      return of(
        actions.setChatTitle.error({
          error: new Error(texts.epicDependencyRequestsObservableUndefined)
        })
      );
    }
    if (action.setChatTitle.query === undefined) {
      return of(
        actions.setChatTitle.error({
          error: new Error(texts.actionSetChatTitleQueryUndefined)
        })
      );
    }

    return requestsObservable(
      {
        host: "api.telegram.org",
        method: "POST",
        path: `/bot${botToken}/setChatTitle`
      },
      action.setChatTitle.query
    ).pipe(
      map(
        (response: IResponse): IActionSetChatTitle => {
          if (response.ok) {
            return actions.setChatTitle.result({
              // TODO: check it
              result: response.result as boolean
            });
          }

          return actions.setChatTitle.error({
            error: response
          });
        }
      ),
      catchError((error: any) =>
        of(
          actions.setChatTitle.error({
            error
          })
        )
      )
    );
  };

  return action$.pipe(
    ofType(actions.setChatTitle.SET_CHAT_TITLE_QUERY),
    switchMap(actionObservable)
  );
};

export { setChatTitle };
