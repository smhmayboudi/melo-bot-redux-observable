import { ofType, StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { IActionEditMessageCaption } from "../../types/iActionEditMessageCaption";
import { IDependencies } from "../../types/iDependencies";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import { IMessage } from "../../types/telegramBot/types/iMessage";
import * as actions from "../actions";
import { filterAsync } from "../libs/filterAsync";

const editMessageCaption: (
  action$: Observable<IActionEditMessageCaption>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => Observable<IActionEditMessageCaption> = (
  action$: Observable<IActionEditMessageCaption>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
): Observable<IActionEditMessageCaption> => {
  const { authorization, botToken, locales, requestsObservable } = dependencies;

  const actionObservable: (
    action: IActionEditMessageCaption
  ) => Observable<IActionEditMessageCaption> = (
    action: IActionEditMessageCaption
  ): Observable<IActionEditMessageCaption> => {
    if (action.editMessageCaption.query === undefined) {
      return of(
        actions.editMessageCaption.error({
          error: new Error(
            locales.find("actionEditMessageCaptionQueryUndefined")
          )
        })
      );
    }

    return requestsObservable<IResponse>(
      {
        host: "api.telegram.org",
        method: "POST",
        path: `/bot${botToken}/editMessageCaption`
      },
      action.editMessageCaption.query
    ).pipe(
      map(
        (response: IResponse): IActionEditMessageCaption => {
          if (response.ok) {
            return actions.editMessageCaption.result({
              result: response.result as boolean | IMessage
            });
          }

          return actions.editMessageCaption.error({
            error: response
          });
        }
      ),
      catchError((error: any) =>
        of(
          actions.editMessageCaption.error({
            error
          })
        )
      )
    );
  };

  return action$.pipe(
    ofType(actions.editMessageCaption.EDIT_MESSAGE_CAPTION_QUERY),
    filterAsync((action: IActionEditMessageCaption, index: number) =>
      authorization(state$, dependencies, action, index)
    ),
    switchMap(actionObservable)
  );
};

export { editMessageCaption };
