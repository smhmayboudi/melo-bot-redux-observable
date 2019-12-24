import { ofType, StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { IActionEditMessageText } from "../../types/iActionEditMessageText";
import { IDependencies } from "../../types/iDependencies";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import { IMessage } from "../../types/telegramBot/types/iMessage";
import * as actions from "../actions";
import { filterAsync } from "../libs/filterAsync";

const editMessageText: (
  action$: Observable<IActionEditMessageText>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => Observable<IActionEditMessageText> = (
  action$: Observable<IActionEditMessageText>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
): Observable<IActionEditMessageText> => {
  const { authorization, botToken, locales, requestsObservable } = dependencies;

  const actionObservable: (
    action: IActionEditMessageText
  ) => Observable<IActionEditMessageText> = (
    action: IActionEditMessageText
  ): Observable<IActionEditMessageText> => {
    if (action.editMessageText.query === undefined) {
      return of(
        actions.editMessageText.error({
          error: new Error(locales.find("actionEditMessageTextQueryUndefined"))
        })
      );
    }

    return requestsObservable<IResponse>(
      {
        host: "api.telegram.org",
        method: "POST",
        path: `/bot${botToken}/editMessageText`
      },
      action.editMessageText.query
    ).pipe(
      map(
        (response: IResponse): IActionEditMessageText => {
          if (response.ok) {
            return actions.editMessageText.result({
              result: response.result as boolean | IMessage
            });
          }

          return actions.editMessageText.error({
            error: response
          });
        }
      ),
      catchError((error: any) =>
        of(
          actions.editMessageText.error({
            error
          })
        )
      )
    );
  };

  return action$.pipe(
    ofType(actions.editMessageText.EDIT_MESSAGE_TEXT_QUERY),
    filterAsync((action: IActionEditMessageText, index: number) =>
      authorization(action, state$, index)
    ),
    switchMap(actionObservable)
  );
};

export { editMessageText };
