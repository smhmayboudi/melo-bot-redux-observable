import { ofType, StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { IActionAnswerPreCheckoutQuery } from "../../types/iActionAnswerPreCheckoutQuery";
import { IDependencies } from "../../types/iDependencies";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import * as actions from "../actions";
import { filterAsync } from "../libs/filterAsync";

const answerPreCheckoutQuery: (
  action$: Observable<IActionAnswerPreCheckoutQuery>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => Observable<IActionAnswerPreCheckoutQuery> = (
  action$: Observable<IActionAnswerPreCheckoutQuery>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
): Observable<IActionAnswerPreCheckoutQuery> => {
  const { authorization, botToken, locales, requestsObservable } = dependencies;

  const actionObservable: (
    action: IActionAnswerPreCheckoutQuery
  ) => Observable<IActionAnswerPreCheckoutQuery> = (
    action: IActionAnswerPreCheckoutQuery
  ): Observable<IActionAnswerPreCheckoutQuery> => {
    if (action.answerPreCheckoutQuery.query === undefined) {
      return of(
        actions.answerPreCheckoutQuery.error({
          error: new Error(
            locales.find("actionAnswerPreCheckoutQueryQueryUndefined")
          )
        })
      );
    }

    return requestsObservable<IResponse>(
      {
        host: "api.telegram.org",
        method: "POST",
        path: `/bot${botToken}/answerPreCheckoutQuery`
      },
      action.answerPreCheckoutQuery.query
    ).pipe(
      map(
        (response: IResponse): IActionAnswerPreCheckoutQuery => {
          if (response.ok) {
            return actions.answerPreCheckoutQuery.result({
              result: response.result as boolean
            });
          }

          return actions.answerPreCheckoutQuery.error({
            error: response
          });
        }
      ),
      catchError((error: any) =>
        of(
          actions.answerPreCheckoutQuery.error({
            error
          })
        )
      )
    );
  };

  return action$.pipe(
    ofType(actions.answerPreCheckoutQuery.ANSWER_PRE_CHECKOUT_QUERY_QUERY),
    filterAsync((action: IActionAnswerPreCheckoutQuery, index: number) =>
      authorization(state$, dependencies, action, index)
    ),
    switchMap(actionObservable)
  );
};

export { answerPreCheckoutQuery };
