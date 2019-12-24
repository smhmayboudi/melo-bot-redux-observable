import { ofType, StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { IActionSetChatDescription } from "../../types/iActionSetChatDescription";
import { IDependencies } from "../../types/iDependencies";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import * as actions from "../actions";
import { filterAsync } from "../libs/filterAsync";

const setChatDescription: (
  action$: Observable<IActionSetChatDescription>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => Observable<IActionSetChatDescription> = (
  action$: Observable<IActionSetChatDescription>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
): Observable<IActionSetChatDescription> => {
  const { authorization, botToken, locales, requestsObservable } = dependencies;

  const actionObservable: (
    action: IActionSetChatDescription
  ) => Observable<IActionSetChatDescription> = (
    action: IActionSetChatDescription
  ): Observable<IActionSetChatDescription> => {
    if (action.setChatDescription.query === undefined) {
      return of(
        actions.setChatDescription.error({
          error: new Error(
            locales.find("actionSetChatDescriptionQueryUndefined")
          )
        })
      );
    }

    return requestsObservable<IResponse>(
      {
        host: "api.telegram.org",
        method: "POST",
        path: `/bot${botToken}/setChatDescription`
      },
      action.setChatDescription.query
    ).pipe(
      map(
        (response: IResponse): IActionSetChatDescription => {
          if (response.ok) {
            return actions.setChatDescription.result({
              result: response.result as boolean
            });
          }

          return actions.setChatDescription.error({
            error: response
          });
        }
      ),
      catchError((error: any) =>
        of(
          actions.setChatDescription.error({
            error
          })
        )
      )
    );
  };

  return action$.pipe(
    ofType(actions.setChatDescription.SET_CHAT_DESCRIPTION_QUERY),
    filterAsync((action: IActionSetChatDescription, index: number) =>
      authorization(action, state$, index)
    ),
    switchMap(actionObservable)
  );
};

export { setChatDescription };
